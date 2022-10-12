const { DataTypes } = require('sequelize');


module.exports = (sequelize) => {
    sequelize.define('admin', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true
        },
        permissions: {
            type: DataTypes.ARRAY(DataTypes.STRING),
            allowNull: false,
        },
    },{
        timestamps:false 
    });
};