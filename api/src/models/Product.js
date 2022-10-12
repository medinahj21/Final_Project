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
            type:DataTypes.NUMBER,
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
        // REVISION -------
        modifiers:{
          type: DataTypes.ARRAY(DataTypes.STRING),
          allowNull: true,
        },
        filter_tags:{
          type: DataTypes.ARRAY(DataTypes.STRING),
          allowNull: true,
        },
        // ------
        is_order: { //Si es por encargo o no, si no es hay stock
          type: DataTypes.BOOLEAN,
          allowNull:false,
        },
        stock:{
          type: DataTypes.NUMBER,
          allowNull: true,
        },
        payment_mode: { //revisar
          type: DataTypes.STRING,
          allowNull: true,
        },
        state: {
          type: DataTypes.STRING,
          allowNull:false,
        },
        payment_deadline: {
          type: DataTypes.DATE,
          allowNull: false,
        }
    },{
        timestamps:false 
    });
};