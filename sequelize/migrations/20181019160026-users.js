'use strict';

module.exports = {
  up: async(queryInterface, DataTypes) => {
    await queryInterface.createTable('users', {
      _id: {
        primaryKey: true,
        type: DataTypes.UUID,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4
      },
      name: DataTypes.STRING,
      email: {
        type: DataTypes.STRING,
        unique: {
          msg: 'The specified email address is already in use.'
        },
        validate: {
          isEmail: true
        }
      },
      role: {
        type: DataTypes.TEXT,
        defaultValue: 'user'
      },
      password: {
        type: DataTypes.TEXT,
        validate: {
          notEmpty: true,
        }
      },
      provider: DataTypes.TEXT,
      salt: DataTypes.TEXT,
      passwordResetToken: DataTypes.TEXT,
      passwordResetTokenExpiresAt: DataTypes.DATE,
      emailVerificationToken: DataTypes.TEXT,
      emailVerificationTokenExpiresAt: DataTypes.DATE,
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
      settings: {
        type: DataTypes.JSONB,
        allowNull: false,
        defaultValue: {}
      }
    });
    await queryInterface.addConstraint('users', ['email'], {
      type: 'unique',
      name: 'users_email_uk'
    });
  },

  down: async queryInterface => {
    await queryInterface.removeConstraint('users', 'users_email_uk');
    await queryInterface.dropTable('users');
  }
};
