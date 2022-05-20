export const base64Encode = (text) => Buffer.from(text).toString('base64');

export const base64Decode = (text) => Buffer.from(text, 'base64').toString();