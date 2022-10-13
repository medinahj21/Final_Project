const { DataTypes } = require('sequelize');


module.exports = (sequelize) => {
    sequelize.define('player', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true,
        },
        personal_info: {
            type: DataTypes.STRING,
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
        debt_value: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notNull: {
                    msg: "not null debt_value "
                },
                notEmpty: {
                    arg: true,
                    msg: "empty strings are not allowed"
                }
            }
        },
        payment_date: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        shirt_number: {
            type: DataTypes.INTEGER,
            allowNull: true,
            validate:{
                min:{
                    args:0,
                    msg:"shirt_number must be greater than or equal to 0"
                }
            }
        }
    }, {
        timestamps: false
    });
};