'use strict';
const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        email: {
            type: DataTypes.STRING,
            unique: {
                args: true,
                msg: 'A user already exists with this email address. Please try to log in.',
                fields: [sequelize.fn('lower', sequelize.col('email'))]
            },
            validate: {
                isEmail: true
            }
        },
        password: { // Hashed and salted password
            type: DataTypes.STRING,
            validate: {
                len: [8, 512] // Password must be between 8 and 512 characters long (inclusively)
            }
        },
        salt: DataTypes.STRING
    }, {
        defaultScope: {
            attributes: {exclude: ['password', 'salt']},
        }
    });
    User.associate = (models) => {
        User.belongsToMany(models.Repository, {
            through: 'UserRepositories',
            foreignKey: 'userId',
            as: 'repositories',
        });
    };
    User.addHook('beforeCreate', async (user, options) => {
        user.salt = await bcrypt.genSalt(13);
        user.password = await bcrypt.hash(user.password, user.salt);
    });
    User.addHook('afterCreate', async (user, options) => {
        // Reload the user to apply the created defaultScope (that excludes password and salt) to the returned object.
        await user.reload();
    });
    User.prototype.isPasswordValid = async (password) => {
        /* Note: Bcrypt incorporates the salt into the hash (as plaintext). That's why the salt isn't used here.
         * The compare function pulls the salt out of the hash, then uses it to hash the password and perform the comparison.
         * Hence, we technically don't need to store the salt again in a separate column, but we do for convenience. */
        return await bcrypt.compare(password, this.password);
    };

    return User;
};
