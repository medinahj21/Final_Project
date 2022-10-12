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
    },
    location:{
        type:DataTypes.STRING,
        allowNull: false,
    },
    description:{
        type:DataTypes.TEXT,
        allowNull: false,
    },
    repetitive:{
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    state:{
      type: DataTypes.ENUM('', '', ''), //COMPLETAR
      allowNull: true,
    },
  },{
      timestamps:false 
  });
};