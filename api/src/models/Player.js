const { DataTypes } = require('sequelize');


module.exports = (sequelize) => {
    sequelize.define('player', {
        id: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true,
        },
        personalInfo: {
            type: DataTypes.JSON,
            allowNull: false,
            validate: {
                notNull: {
                    msg: "not null personal_info "
                },
                notEmpty: {
                    arg: true,
                    msg: "empty strings are not allowed"
                }
            }
        },
        debtValue: {
            type: DataTypes.INTEGER,
            allowNull: true,
            /* validate: {
                notNull: {
                    msg: "not null debt_value "
                },
                notEmpty: {
                    arg: true,
                    msg: "empty strings are not allowed"
                } 
            }*/
        },
        paymentDate: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        shirtNumber: {
            type: DataTypes.INTEGER,
            allowNull: true,
            /* validate:{
                min:{
                    args:0,
                    msg:"shirt_number must be greater than or equal to 0"
                }
            } */
        }
    }, {
        timestamps: false
    });
};