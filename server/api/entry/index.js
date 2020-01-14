'use strict';

import express from 'express';
import * as controller from './entry.controller';
import * as auth from '../../auth/auth.service';

var router = express.Router({mergeParams: true});

router.get('/', auth.isAuthenticated(), controller.index);
router.get('/:entryId', auth.isAuthenticated(), controller.show);
router.post('/', auth.isAuthenticated(), controller.create);
router.patch('/:entryId', auth.isAuthenticated(), controller.patch);
router.delete('/:entryId', auth.isAuthenticated(), controller.destroy);

module.exports = router;
