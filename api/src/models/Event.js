const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "event",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            arg: true,
            msg: "empty strings are not allowed",
          },
          len: {
            args: [3, 50],
            msg: "Name should be among 3 and 50 characters",
          },
        },
      },
      location: {
        type: DataTypes.TEXT, //necesitamos que acepte todos los caracteres necesarios
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      repetitive: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      date: {
        type: DataTypes.ARRAY(DataTypes.STRING),
<<<<<<< HEAD
        defaultValue: DataTypes.NOW,//*va a romper
=======
>>>>>>> c09b4d092ef2e57ff14b9e3eb237a26e2e164e3f
        allowNull: false,
      },
      start: {
        type: DataTypes.TIME,
        allowNull: false,
      },
      end: {
        type: DataTypes.TIME,
        allowNull: false,
      },
      state: {
        type: DataTypes.ENUM("Pending", "Finished", "Postponed", "Canceled"),
        allowNull: true,
      },
    },
    {
      timestamps: false,
    }
  );
};
