'use strict';
const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        email: {
            type: DataTypes.STRING,
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
            get() {
                /* use getters to tell Sequelize to treat those rows as functions instead of variables,
                 * preventing them from showing up on queries like findAll() or findById(1). */
                return () => this.getDataValue('password');
            }
        },
        salt: {
            type: DataTypes.STRING,
            get() {
                /* use getters to tell Sequelize to treat those rows as functions instead of variables,
                 * preventing them from showing up on queries like findAll() or findById(1). */
                return () => this.getDataValue('salt');
            }
        }
    }, {});
    User.associate = function (models) {
        // associations can be defined here
    };
    User.addHook('beforeCreate', async (user, options) => {
        user.salt = await bcrypt.genSalt(13);
        user.password = await bcrypt.hash(user.password, user.salt);
    });
    return User;
};
