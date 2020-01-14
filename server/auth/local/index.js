'use strict';

import express from 'express';
import passport from 'passport';
import {signToken} from '../auth.service';
import {respondWithError} from '../../api/responses';

var router = express.Router();

router.post('/', function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    var error = err || info;
    if(error) return respondWithError(res, error, 401);
    if(!user) return respondWithError(res, {}, 404);
    var token = signToken(user._id, user.role);
    return res.json({ token });
  })(req, res, next);
});

export default router;
