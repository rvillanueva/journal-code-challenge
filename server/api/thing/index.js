'use strict';

import express from 'express';
import * as controller from './thing.controller';
import * as auth from '../../auth/auth.service';

var router = express.Router({mergeParams: true});

router.get('/', auth.isAuthenticated(), controller.index);
router.get('/:thingId', auth.isAuthenticated(), controller.show);
router.post('/', auth.isAuthenticated(), controller.create);
router.patch('/:thingId', auth.isAuthenticated(), controller.patch);
router.delete('/:thingId', auth.isAuthenticated(), controller.destroy);

module.exports = router;
