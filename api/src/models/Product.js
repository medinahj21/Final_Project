const { DataTypes } = require('sequelize');


module.exports = (sequelize) => {
    sequelize.define('product', {
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
        price:{
            type:DataTypes.INTEGER,
            allowNull: false,
        },
        description:{
            type:DataTypes.TEXT,
            allowNull: false,
        },
        image:{
          type: DataTypes.STRING,
          allowNull: true,
        },
        modifiers:{
          type: DataTypes.ARRAY(DataTypes.STRING),
          allowNull: true,
        },
        filter_tags:{
          type: DataTypes.ARRAY(DataTypes.STRING),
          allowNull: true,
        },
        is_order: {
          type: DataTypes.BOOLEAN,
          allowNull:false,
        },
        stock:{
          type: DataTypes.INTEGER,
          allowNull: true,
        },
        state: {
          type: DataTypes.STRING,
          allowNull:false,
        },
        payment_term: {
          type: DataTypes.INTEGER,
          allowNull: false,
        }
    },{
        timestamps:false 
    });
};