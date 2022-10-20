const { DataTypes, STRING } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "player",
    {
      id: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
      },
      personalInfo: {
        type: DataTypes.JSON, //para el bulk
        allowNull: false,
        validate: {
          notNull: {
            msg: "not null personal_info ",
          },
          notEmpty: {
            arg: true,
            msg: "empty strings are not allowed",
          },
        },
      },
      debtValue: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      paymentDate: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      shirtNumber: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      shoppingCart: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: true
      }
    },
    {
      timestamps: false,
    }
  );
};