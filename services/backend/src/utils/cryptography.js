const {createCipheriv, createDecipheriv, createHash} = require('crypto');
const cryptoRandomString = require('crypto-random-string');

/* Encryption method */
const BLOCK_CIPHER = 'aes-256-cbc';

/* Initialization vector length in bytes */
const IV_BYTE_LENGTH = 16;

/* Note: 256 (in algorithm name) is key size.
 * Block size for AES is always 128 */
const KEY_BYTE_LENGTH = 32;

/* Convert secret to match the algorithm's required key length */
const generateKey = (secret) => {
    return createHash('sha256').update(String(secret)).digest('base64').substr(0, KEY_BYTE_LENGTH);
};

const encrypt = (text) => {
    const iv = cryptoRandomString({length: IV_BYTE_LENGTH});
    const key = generateKey(process.env.ENCRYPTION_SECRET);

    const cipher = createCipheriv(BLOCK_CIPHER, key, iv);
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');

    return [encrypted, iv];
};

const decrypt = (text, iv) => {
    const key = generateKey(process.env.ENCRYPTION_SECRET);

    const decipher = createDecipheriv('aes-256-cbc', key, iv);
    let deciphered = decipher.update(text, 'hex', 'utf8');
    deciphered += decipher.final('utf8');

    return deciphered;
};

module.exports = {
    encrypt,
    decrypt,
};
