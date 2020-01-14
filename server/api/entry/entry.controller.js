/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/businesses              ->  index
 * POST    /api/businesses              ->  create
 * GET     /api/accounts/:id          ->  show
 * PUT     /api/accounts/:id          ->  upsert
 * PATCH   /api/accounts/:id          ->  patch
 * DELETE  /api/accounts/:id          ->  destroy
 */

'use strict';

import {Entry} from '../../sqldb';
import {respondWithError, respondWithResult} from '../responses';
import omit from 'object.omit';
import {applyPatch} from '../../utils/patch';

export function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    console.error(err);
    res.status(statusCode).send(err);
  };
}
// Gets a list of Business Entries
export async function index(req, res, next) {
  try {
    const entries = await Entry.findAll({
      where: {
        userId: req.user._id
      }
    });
    return res.status(200).json({ entries });
  } catch(e) {
    return next(e);
  }
}


// Gets a single Business from the DB
export async function show(req, res, next) {
  try {
    const entry = await Entry.findOne({
      where: {
        _id: req.params.entryId,
        userId: req.user._id
      }
    });
    if(!entry) return res.status(403).end();
    return res.status(200).json({ entry });
  } catch(e) {
    return next(e);
  }
}


export async function create(req, res) {
  try {
    const {body} = req;
    const entry = await Entry.create({
      userId: req.user._id,
      ...body
    });
    return respondWithResult(res, {
      entry
    });
  } catch(err) {
    return respondWithError(res, err);
  }
}

export async function patch(req, res) {
  try {
    const updateData = omit(req.body, ['_id', 'userId']);
    const entry = await Entry.findOne({
      where: {
        _id: req.params.entryId,
        userId: req.user._id
      }
    });
    if(!entry) return res.status(403).end();
    applyPatch(entry, updateData);
    await entry.save();
    return respondWithResult(res, {
      entry
    });
  } catch(err) {
    return respondWithError(res, err);
  }
}

export async function destroy(req, res) {
  try {
    const entry = await Entry.findOne({
      where: {
        _id: req.params.entryId,
        userId: req.user._id
      }
    });
    if(!entry) return res.status(403).end();
    await entry.destroy();
    return res.status(200).end();
  } catch(err) {
    return respondWithError(res, err);
  }
}
