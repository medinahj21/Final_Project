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
        date_birth:{
            type:DataTypes.DATE,
            allowNull: true,
        },
        debt_value:{
            type:DataTypes.STRING,
            allowNull: false,
        },
        payment_date:{
            type:DataTypes.DATE,
            allowNull: false,
        }
    },{
        timestamps:false 
    });
};