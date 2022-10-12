const { DataTypes } = require('sequelize');


module.exports = (sequelize) => {
    sequelize.define('player', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true
        },
        personal_info: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        debt_value:{
            type:DataTypes.NUMBER,
            allowNull: false,
        },
        payment_date:{
            type:DataTypes.DATE,
            allowNull: false,
        },
        shirt_number:{
            type: DataTypes.NUMBER,
            allowNull: true
        }
    },{
        timestamps:false 
    });
};