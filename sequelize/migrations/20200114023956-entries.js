'use strict';

module.exports = {
  up: async(queryInterface, DataTypes) => {
    await queryInterface.createTable('entries', {
      _id: {
        primaryKey: true,
        type: DataTypes.UUID,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4
      },
      userId: {
        type: DataTypes.UUID,
        allowNull: false
      },
      title: {
        type: DataTypes.TEXT
      },
      body: {
        type: DataTypes.TEXT,
        allowNull: false,
        defaultValue: ''
      },
      date: {
        type: DataTypes.DATE,
        allowNull: false
      },
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE
    });
  },

  down: async queryInterface => {
    await queryInterface.dropTable('entries');
  }
};
