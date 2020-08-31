const {compose} = require('objection');
const password = require('./plugins/objectionPassword');
const BaseModel = require('./baseModel');
const {encrypt, decrypt} = require('../../utils/');

const mixins = compose(
    password({rounds: 13}),
);

class User extends mixins(BaseModel) {
    static get tableName() {
        return 'users';
    }

    // Whenever a model instance is created it is checked against this schema for validation.
    static get jsonSchema() {
        return {
            type: 'object',
            required: ['email', 'password'],

            properties: {
                email: {type: ['string', null], format: 'email'},
                password: {type: 'string', minLength: 4, maxLength: 512},
                nodeId: {type: ['string', null]},
                accessToken: {type: ['string', null]},
                accessTokenIv: {type: ['string', null]},
                refreshToken: {type: ['string', null]},
                refreshTokenIv: {type: ['string', null]},
                createdAt: {type: 'string', format: 'date-time'},
                updatedAt: {type: 'string', format: 'date-time'},
            }
        };
    }

    static get relationMappings() {
        const Repository = require('./repository');

        return {
            repositories: {
                relation: BaseModel.ManyToManyRelation,
                modelClass: Repository,
                join: {
                    from: 'users.id',
                    to: 'repositories.id',
                    through: {
                        from: 'userRepositories.userId',
                        to: 'userRepositories.repositoryId',
                    },
                }
            }
        };
    }

    async $beforeInsert(...args) {
        if (this.accessToken) {
            [this.accessToken, this.accessTokenIv] = encrypt(this.accessToken);
        }
        if (this.refreshToken) {
            [this.refreshToken, this.refreshTokenIv] = encrypt(this.refreshToken);
        }

        return await super.$beforeInsert(...args);
    }

    async $beforeUpdate(opt, ...args) {
        if (this.accessToken && opt.old.accessToken !== this.accessToken) {
            [this.accessToken, this.accessTokenIv] = encrypt(this.accessToken);
        }
        if (this.refreshToken && opt.old.refreshToken !== this.refreshToken) {
            [this.refreshToken, this.refreshTokenIv] = encrypt(this.refreshToken);
        }

        return await super.$beforeUpdate(opt, ...args);
    }

    decryptTokens() {
        const accessToken = this.accessToken ? decrypt(this.accessToken, this.accessTokenIv) : null;
        const refreshToken = this.refreshToken ? decrypt(this.refreshToken, this.refreshTokenIv) : null;
        return {accessToken, refreshToken};
    }
}

module.exports = User;
