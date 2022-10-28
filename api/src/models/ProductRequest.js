const { DataTypes } = require('sequelize');


module.exports = (sequelize) => {
    sequelize.define('productRequest', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true
        },
        infoProduct: {
            type: DataTypes.JSON,
            allowNull: false
        }
    },
        {
            paranoid: true
        }
    );
};