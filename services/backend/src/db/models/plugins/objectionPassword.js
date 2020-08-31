const bcrypt = require('bcrypt');

const RECOMMENDED_ROUNDS = 12;
const BCRYPT_HASH_REGEX = /^\$2[ayb]\$[0-9]{2}\$[A-Za-z0-9./]{53}$/;

/* Objection js plugin for adding passwords to models. It handles the cryptography for passwords.
 * The implementation is heavily inspired by https://github.com/scoutforpets/objection-password
 * This was created to address security vulnerabilities from the aforementioned library (which is not actively maintained).
 *
 * BlockedTODO: https://github.com/scoutforpets/objection-password/issues/31
 * Remove this file and just use the objection-password plugin if the maintainer addresses this issue. */
const objectionPassword = (options) => {
    // Provide good defaults for the options if possible.
    options = {
        allowEmptyPassword: false,
        passwordField: 'password',
        rounds: RECOMMENDED_ROUNDS,
        ...options
    };

    // Return the mixin.
    // If the plugin doesn't take options, the mixin can be exported directly. The factory function is not needed.
    return (Model) => {
        return class extends Model {
            async $beforeInsert(...args) {
                await this.hashPassword();
                return await super.$beforeInsert(...args);
            }

            async $beforeUpdate(queryOptions, ...args) {
                if (queryOptions.patch && this[options.passwordField] === undefined) {
                    return;
                }

                await this.hashPassword();
                return await super.$beforeUpdate(queryOptions, ...args);
            }

            // Compares a password to a bcrypt hash, returns whether or not the password was verified.
            async verifyPassword(password) {
                return await bcrypt.compare(password, this[options.passwordField]);
            }

            /* Sets the password field to a bcrypt hash of the password.
             * Only does so if the password is not already a bcrypt hash. */
            async hashPassword() {
                const password = this[options.passwordField];

                if (password) {
                    if (this.constructor.isBcryptHash(password)) {
                        throw new Error('bcrypt tried to hash another bcrypt hash');
                    }

                    this[options.passwordField] = await bcrypt.hash(password, options.rounds);
                    return;
                }

                // Throw an error if empty passwords are not allowed.
                if (!options.allowEmptyPassword) {
                    throw new Error('password must not be empty');
                }
            }

            /* Detect rehashing to avoid undesired effects.
             * returns true if the string seems to be a bcrypt hash. */
            static isBcryptHash(str) {
                return BCRYPT_HASH_REGEX.test(str);
            }
        };
    };
};

module.exports = objectionPassword;
