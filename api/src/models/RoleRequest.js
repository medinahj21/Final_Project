const { DataTypes } = require('sequelize');


module.exports = (sequelize) => {
    sequelize.define('roleRequest', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true
        },
        newRole: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },{
        timestamps:false 
    });
};