const { DataTypes } = require('sequelize');


module.exports = (sequelize) => {
    sequelize.define('roleRequest', {
        id: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true
        },
        newRole: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        userInfo:{
            type: DataTypes.JSON,
            allowNull: false
        },
        groupId:{
            type: DataTypes.STRING,
            allowNull: true,
        }
    },{
        timestamps:false 
    });
};