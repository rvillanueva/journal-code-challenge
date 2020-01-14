'use strict';
/*eslint no-process-env:0*/

import path from 'path';
import _ from 'lodash';

/*function requiredProcessEnv(name) {
  if(!process.env[name]) {
    throw new Error('You must set the ' + name + ' environment variable');
  }
  return process.env[name];
}*/

// All configurations will extend these options
// ============================================
var all = {
  domain: process.env.DOMAIN,
  env: process.env.NODE_ENV,
  deployment: process.env.DEPLOYMENT_NAME,
  // Root path of server
  root: path.normalize(`${__dirname}/../../..`),

  // Browser-sync port
  browserSyncPort: process.env.BROWSER_SYNC_PORT || 3000,

  // Server port
  port: process.env.PORT || 9000,

  // Server IP
  ip: process.env.IP || '0.0.0.0',

  // Should we populate the DB with sample data?
  seedDB: false,
  secrets: {
    session: process.env.SESSION_SECRET
  },
  aws: {
    region: process.env.AWS_REGION || 'us-east-1',
    id: process.env.AWS_ACCESS_KEY,
    secret: process.env.AWS_SECRET_ACCESS_KEY,
    bucket: process.env.AWS_STORAGE_BUCKET
  },
  email: {
    address: process.env.SYSTEM_EMAIL_ADDRESS,
    name: process.env.SYSTEM_EMAIL_NAME,
    admin: process.env.ADMIN_EMAIL_ADDRESS
  },
  mixpanel: {
    id: process.env.MIXPANEL_ID
  },
  sentry: {
    frontendDSN: process.env.SENTRY_DSN_FRONTEND,
    backendDSN: process.env.SENTRY_DSN_BACKEND
  },
  adminSettings: {
    notifyOnSignup: process.env.ADMIN_NOTIFY_SIGNUP === 'true' || process.env.ADMIN_NOTIFY_SIGNUP === true
  }
};

// Export the config object based on the NODE_ENV
// ==============================================
module.exports = _.merge(
  all,
  require('./shared'),
  require(`./${process.env.NODE_ENV}-env.js`) || {});
