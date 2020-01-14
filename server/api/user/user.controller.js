'use strict';

import {User, Sequelize} from '../../sqldb';
import config from '../../config/environment';
import jwt from 'jsonwebtoken';
import moment from 'moment';
import emailer from '../../email';
import PasswordResetEmail from '../../email/components/PasswordReset/PasswordResetEmail';
import {sendEmailVerification, handlePostRegistrationExternalServices} from './user.service';
import {applyPatch} from '../../utils/patch';
import {respondWithError} from '../responses';
const Op = Sequelize.Op;

/**
 * Get list of users
 * restriction: 'admin' or part of business
 */
export function index(req, res, next) {
  try {
    var query = {
      attributes: [
        '_id',
        'name',
        'email',
        'role'
      ]
    };
    return User.findAll(query)
      .then(users => res.status(200).json({ users }))
      .catch(next);
  } catch(e) {
    return next(e);
  }
}

/**
 * Creates a new user
 */
export async function create(req, res, next) {
  try {
    const {password, email, name} = req.body;
    if(!email || typeof email !== 'string') {
      return respondWithError(res, {message: 'Please provide an email address.'}, 400);
    }
    let user = await User.findOne({
      where: {
        email: {
          [Sequelize.Op.iLike]: email
        }
      }
    });
    const userExistsAndIsVerified = user && user.get('role') !== 'unverified';
    if(userExistsAndIsVerified) return respondWithError(res, {message: 'User with email already exists.'}, 403);
    if(!user) {
      user = User.build({
        provider: 'local',
        role: 'unverified'
      });
    }
    user.set('password', password);
    user.set('email', email);
    user.set('name', name);
    user = await user.save();
    await sendEmailVerification(user.get('_id'));
    const token = jwt.sign({ _id: user._id }, config.secrets.session, {
      expiresIn: 60 * 60 * 5
    });
    await handlePostRegistrationExternalServices(user);
    return res.json({ token });
  } catch(e) {
    if(e.name === 'SequelizeValidationError') {
      const {message} = e.errors[0];
      return respondWithError(res, {message}, 400);
    }
    return next(e);
  }
}

/**
 * Deletes a user
 * restriction: 'admin'
 */
export async function destroy(req, res, next) {
  try {
    const {userId} = req.params;
    const user = await User.findOne({ where: { _id: userId } });
    if(!user) {
      return res.status(404).end();
    }
    await user.destroy();
    return res.status(204).end();
  } catch(e) {
    return next(e);
  }
}

/**
 * Change a users password
 */
export async function changePassword(req, res, next) {
  try {
    let userId = req.user._id;
    const user = await User.findOne({ where: { _id: userId }});
    var oldPass = String(req.body.oldPassword);
    var newPass = String(req.body.newPassword);
    if(user.authenticate(oldPass)) {
      user.password = newPass;
      await user.save();
      return res.status(204).end();
    } else {
      return res.status(403).end();
    }
  } catch(e) {
    return next(e);
  }
}


/**
 * Change a users password
 */
export async function updateMyProfile(req, res, next) {
  try {
    const user = await User.scope('withSecrets').findOne({
      where: {
        _id: req.user._id
      }
    });
    if(!user) return res.status(401).end();
    const patch = req.body;
    applyPatch(user, patch, { allowedKeys: ['name'] });
    await user.save();
    return res.status(200).json({
      user: {
        _id: user.get('_id'),
        name: user.get('name'),
        role: user.get('role')
      }
    });
  } catch(e) {
    return next(e);
  }
}

export async function requestPasswordReset(req, res, next) {
  try {
    const {email} = req.query;
    const user = await User.findOne({
      where: {
        email: {
          [Op.iLike]: email
        }
      },
      attributes: ['_id', 'email', 'passwordResetToken', 'passwordResetTokenExpiresAt']
    });
    if(!user) return res.status(200).end(); // Do not reveal there is no user.
    user.generatePasswordResetToken();
    await user.save();
    const token = user.get('passwordResetToken');
    await emailer.send(PasswordResetEmail, {user: user.toJSON(), token});
    return res.status(200).end();
  } catch(e) {
    return next(e);
  }
}

export async function resetPassword(req, res, next) {
  try {
    const {userId, token: passwordResetToken} = req.query;
    if(!passwordResetToken) return res.status(400).end();
    const {newPassword} = req.body;
    const user = await User.findOne({
      where: { _id: userId, passwordResetToken },
      attributes: ['_id', 'passwordResetTokenExpiresAt']
    });
    if(!user) return res.status(401).end();
    const resetTokenIsExpired = !user.get('passwordResetTokenExpiresAt') || moment(user.get('passwordResetTokenExpiresAt')).isBefore(moment());
    if(resetTokenIsExpired) return res.status(401).end();
    user.set('password', newPassword);
    user.set('passwordResetToken', null);
    user.set('passwordResetTokenExpiresAt', null);
    await user.save();
    return res.status(200).end();
  } catch(e) {
    return next(e);
  }
}

export async function verifyResetToken(req, res, next) {
  try {
    const {userId, token: passwordResetToken} = req.query;
    if(!passwordResetToken) return res.status(400).end();
    const user = await User.findOne({
      where: { _id: userId, passwordResetToken },
      attributes: ['passwordResetTokenExpiresAt']
    });
    if(!user) return res.status(401).end();
    const resetTokenIsExpired = !user.get('passwordResetTokenExpiresAt') || moment(user.get('passwordResetTokenExpiresAt')).isBefore(moment());
    if(resetTokenIsExpired) return res.status(401).end();
    return res.status(200).end();
  } catch(e) {
    return next(e);
  }
}

export async function changeRole(req, res, next) {
  try {
    const {userId} = req.params;
    var newRole = String(req.body.role);
    if(config.userRoles.indexOf(newRole) === -1) {
      return res.status(403).send(`Cannot set unknown role ${newRole}.`);
    }
    const user = await User.findOne({where: { _id: userId }});
    if(!user) return res.status(404).end();
    user.set('role', newRole);
    await user.save();
    return res.status(200).json({ user });
  } catch(e) {
    return next(e);
  }
}


/**
 * Get my info
 */
export async function me(req, res, next) {
  try {
    var userId = req.user._id;
    const user = await User.findOne({
      where: {
        _id: userId
      },
      attributes: [
        '_id',
        'name',
        'email',
        'role',
        'provider'
      ]
    });
    if(!user) return res.status(401).end();
    return res.json({ user });
  } catch(e) {
    return next(e);
  }
}

/**
 * Authentication callback
 */
export function authCallback(req, res) {
  res.redirect('/');
}
