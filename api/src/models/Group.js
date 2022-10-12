const { DataTypes } = require('sequelize');


module.exports = (sequelize) => {
    sequelize.define('group', {
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
        schedule:{
            type:DataTypes.STRING,
            allowNull: false,
        },
        description:{
            type:DataTypes.DATE,
            allowNull: false,
        },
        image:{
          type: DataTypes.STRING,
          allowNull: true,
        },
        inscription_cost:{
          type: DataTypes.NUMBER,
          allowNull: false,
        },
        contact:{
          type: DataTypes.STRING,
          allowNull: true,
        },
        whatsapp: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        acept_newPlayers: {
          type: DataTypes.BOOLEAN,
          allowNull:false,
        }
    },{
        timestamps:false 
    });
};