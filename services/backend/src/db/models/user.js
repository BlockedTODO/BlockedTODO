import {compose} from 'objection';
import password from 'objection-password';
import BaseModel from './baseModel.js';
import {encrypt, decrypt} from '../../utils/index.js';

const mixins = compose(
    password({rounds: 13}),
);

export default class User extends mixins(BaseModel) {
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
