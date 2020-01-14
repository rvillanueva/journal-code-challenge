'use strict';

export default function(sequelize, DataTypes) {
  const Entry = sequelize.define('entry', {
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
    }
  });

  return Entry;
}
