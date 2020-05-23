const normalizeUrl = require('normalize-url');

const urlNormalizer = (url) => {
    const options = {
        defaultProtocol: 'http:',
        normalizeProtocol: true,
        removeDirectoryIndex: false,
        removeTrailingSlash: true,
        sortQueryParameters: true,
        stripHash: true,
        stripWWW: true,
    };

    // Note: this function is very generous with what it considers to be a valid url, and will rarely fail
    // For instance, the string 'github' will normalize to 'http://github'
    return normalizeUrl(url, options);
};

module.exports = urlNormalizer;
