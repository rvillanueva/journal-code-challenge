/**
 * Sequelize initialization module
 */

'use strict';

import config from '../config/environment';
import Sequelize from 'sequelize';

// Fixes bug where decimal is parsed as string
Sequelize.postgres.DECIMAL.parse = value => parseFloat(value);

export {Sequelize};
export const sequelize = new Sequelize(config.sequelize.uri, config.sequelize);

export const User = sequelize.import('../api/user/user.model');
export const Entry = sequelize.import('../api/entry/entry.model');
export const Session = sequelize.import('./session/session.model');

Entry.belongsTo(User);
