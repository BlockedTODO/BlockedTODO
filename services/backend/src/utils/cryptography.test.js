const {encrypt, decrypt} = require('./cryptography');

describe('encrypt', () => {
    it('encrypts a string', () => {
        const text = 'hello world';
        const [encryptedText, _iv] = encrypt(text);

        expect(encryptedText).not.toEqual(text);
    });

    it('returns the initialization vector', () => {
        const text = 'hello world';
        const [_encryptedText, iv] = encrypt(text);

        expect(iv).not.toBeNull();
        expect(iv.length).toEqual(16);
    });

    it('encrypts an empty string', () => {
        const text = '';
        const [encryptedText, _iv] = encrypt(text);

        expect(encryptedText).not.toEqual(text);
    });

    it('encrypts a long string (>256 characters)', () => {
        const text = `
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis pharetra eros ut mollis sodales.
            Suspendisse tempor nisl id ex consequat, non pharetra felis elementum. Nam vel porta augue.
            Aliquam erat volutpat. Maecenas a nisi ac turpis eleifend aliquam. Pellentesque lacus quam,
            luctus non lacus nec, blandit laoreet augue. Vivamus molestie odio a venenatis maximus.
            Sed imperdiet, enim vitae imperdiet fermentum, felis sapien mollis justo, nec sodales metus sem sed urna.
            Donec odio tortor, pharetra at scelerisque ac, luctus nec quam.
            Cras quis sem scelerisque ipsum ultrices fermentum ac at mi. Mauris sollicitudin sagittis leo a ultrices.
            Proin non venenatis purus. Integer gravida bibendum dolor vel ultricies.
        `;

        const [encryptedText, _iv] = encrypt(text);
        expect(encryptedText).not.toEqual(text);
    });
});

describe('decrypt', () => {
    it('decrypts an encrypted string', () => {
        const text = 'hello world';
        const [encryptedText, iv] = encrypt(text);
        const decryptedText = decrypt(encryptedText, iv);

        expect(decryptedText).toEqual(text);
    });

    it('does not decrypt text if the wrong initialization vector is provided', () => {
        const text = 'hello world';
        const [encryptedText, _iv] = encrypt(text);

        expect(() => {
            decrypt(encryptedText, 'nottheiv_16chars');
        }).toThrow();
    });

    it('decrypts an encrypted empty string', () => {
        const text = '';
        const [encryptedText, iv] = encrypt(text);
        const decryptedText = decrypt(encryptedText, iv);

        expect(decryptedText).toEqual(text);
    });

    it('decrypts an encrypted long string (>256 characters)', () => {
        const text = `
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis pharetra eros ut mollis sodales.
            Suspendisse tempor nisl id ex consequat, non pharetra felis elementum. Nam vel porta augue.
            Aliquam erat volutpat. Maecenas a nisi ac turpis eleifend aliquam. Pellentesque lacus quam,
            luctus non lacus nec, blandit laoreet augue. Vivamus molestie odio a venenatis maximus.
            Sed imperdiet, enim vitae imperdiet fermentum, felis sapien mollis justo, nec sodales metus sem sed urna.
            Donec odio tortor, pharetra at scelerisque ac, luctus nec quam.
            Cras quis sem scelerisque ipsum ultrices fermentum ac at mi. Mauris sollicitudin sagittis leo a ultrices.
            Proin non venenatis purus. Integer gravida bibendum dolor vel ultricies.
        `;

        const [encryptedText, iv] = encrypt(text);
        const decryptedText = decrypt(encryptedText, iv);

        expect(decryptedText).toEqual(text);
    });
});
