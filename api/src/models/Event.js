const { DataTypes } = require('sequelize');


module.exports = (sequelize) => {
  sequelize.define('event', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isAlpha: {
          arg: true,
          msg: "name can only contain letters"
        },
        notEmpty: {
          arg: true,
          msg: "empty strings are not allowed"
        },
        len: {
          args: [3, 30],
          msg: "Name should be among 3 and 30 characters"
        }
      }
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    repetitive: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    state: {
      type: DataTypes.ENUM('Pending', 'Finished', 'Postponed', 'Canceled'),
      allowNull: true,
    },
  }, {
    timestamps: false
  });
};