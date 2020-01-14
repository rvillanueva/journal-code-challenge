// Test endpoints only available in development environment

'use strict';

import {Router} from 'express';
import * as controller from './dev.controller';

var router = new Router();

router.get('/error', controller.testErrorHandling);

module.exports = router;
