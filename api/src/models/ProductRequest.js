const { DataTypes } = require('sequelize');


module.exports = (sequelize) => {
    sequelize.define('productRequest', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true
        },
        date_request: {
            type: DataTypes.DATE,
            allowNull: false,
        },
    },{
        timestamps:false 
    });
};