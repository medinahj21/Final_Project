const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("filterTags", {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
};
