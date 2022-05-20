import {
    base64Encode,
    base64Decode
} from './base64.js';

const multilineText = `
-----BEGIN FAKE PRIVATE KEY-----
rCBkedbNfTAFij8M0RVRAXz++xTqHBLh
gMtrQ+WEgjTKevYCdm5q3XToLkkLv5L2
QsW+sJyoNeU7eT6X/scRZz+/6rCJ4p0=
-----END FAKE PRIVATE KEY-----
`;

describe('base64Encode', () => {
    it('encodes a string, returning a different value', () => {
        expect(base64Encode('hello world')).not.toEqual('hello world');
    });

    it('returns an empty string when encoding an empty string', () => {
        expect(base64Encode('')).toEqual('');
    });

    it('encodes a multiline string into a single-line string', () => {
        expect(base64Encode(multilineText)).toEqual(expect.not.stringContaining('\n'));
    });
});

describe('base64Decode', () => {
    it('decodes a string back to its original value', () => {
        const text = 'hello world';
        const encodedText = base64Encode(text);
        const decodedText = base64Decode(encodedText);
        expect(decodedText).toEqual(text);
    });

    it('decodes a string with special characters', () => {
        const text = 'ff%abc-0#{}/\\';
        const encodedText = base64Encode(text);
        const decodedText = base64Decode(encodedText);
        expect(decodedText).toEqual(text);
    });

    it('returns an empty string when decoding an empty string', () => {
        expect(base64Decode('')).toEqual('');
    });

    it('encodes a multiline string', () => {
        const encodedText = base64Encode(multilineText);
        const decodedText = base64Decode(encodedText);
        expect(decodedText).toEqual(multilineText);
    });
});
