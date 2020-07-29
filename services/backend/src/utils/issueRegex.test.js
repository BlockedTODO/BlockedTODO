const issueRegex = require('./issueRegex');
const {DEFAULT_CONFIG} = require('utils/');

describe('Prefix regex', () => {
    it('matches a basic comment (sanity test)', () => {
        const code = '// BlockedTODO: https://github.com/BlockedTODO/BlockedTODO/issues/57';
        const results = Array.from(code.matchAll(issueRegex(DEFAULT_CONFIG)));

        expect(results.length).toBe(1);
        expect(results[0].groups.prefix).toEqual('BlockedTODO:');
    });

    it('matches the prefix, case insensitive', () => {
        const code = '// blockedtodo: https://github.com/BlockedTODO/BlockedTODO/issues/57';
        const results = Array.from(code.matchAll(issueRegex(DEFAULT_CONFIG)));

        expect(results.length).toBe(1);
        expect(results[0].groups.prefix).toEqual('blockedtodo:');
    });

    it('does not match if prefix is missing', () => {
        const code = '// https://github.com/BlockedTODO/BlockedTODO/issues/57';
        const results = Array.from(code.matchAll(issueRegex(DEFAULT_CONFIG)));

        expect(results.length).toBe(0);
    });

    it('matches several prefixes in one comment', () => {
        const code = '/* BlockedTODO: github.com\nBlockedTODO: github.com */';
        const results = Array.from(code.matchAll(issueRegex(DEFAULT_CONFIG)));

        expect(results.length).toBe(2);
        expect(results[0].groups.prefix).toEqual('BlockedTODO:');
        expect(results[1].groups.prefix).toEqual('BlockedTODO:');
    });

    it('uses user-defined comment prefixes', () => {
        const config = {comment_prefixes: ['OMG:', 'HelloWorld_']};
        const code = '// OMG: github.com HelloWorld_ github.com';
        const results = Array.from(code.matchAll(issueRegex(config)));

        expect(results.length).toBe(2);
        expect(results[0].groups.prefix).toEqual('OMG:');
        expect(results[1].groups.prefix).toEqual('HelloWorld_');
    });

    it('escapes user input regex', () => {
        const config = {comment_prefixes: ['A+']};
        const validCode = '// A+ github.com';
        const invalidCode = '// A github.com';

        const validResults = Array.from(validCode.matchAll(issueRegex(config)));
        const invalidResults = Array.from(invalidCode.matchAll(issueRegex(config)));

        expect(validResults.length).toBe(1);
        expect(invalidResults.length).toBe(0);
    });
});

describe('URL regex', () => {
    it('matches a basic comment (sanity test)', () => {
        const issueUrl = 'https://github.com/BlockedTODO/BlockedTODO/issues/57';
        const code = `// BlockedTODO: ${issueUrl}`;
        const results = Array.from(code.matchAll(issueRegex(DEFAULT_CONFIG)));

        expect(results.length).toBe(1);
        expect(results[0].groups.url).toEqual(issueUrl);
    });

    it('matches a url without a protocol', () => {
        const issueUrl = 'github.com/BlockedTODO/BlockedTODO/issues/57';
        const code = `// BlockedTODO: ${issueUrl}`;
        const results = Array.from(code.matchAll(issueRegex(DEFAULT_CONFIG)));

        expect(results.length).toBe(1);
        expect(results[0].groups.url).toEqual(issueUrl);
    });

    it('does not match if no url is present', () => {
        const code = '// BlockedTODO: hello world';
        const results = Array.from(code.matchAll(issueRegex(DEFAULT_CONFIG)));

        expect(results.length).toBe(0);
    });

    it('matches several issue urls in one comment', () => {
        const issueUrl = 'https://github.com/BlockedTODO/BlockedTODO/issues/57';
        const code = `/* BlockedTODO: ${issueUrl}\nBlockedTODO: ${issueUrl} */`;
        const results = Array.from(code.matchAll(issueRegex(DEFAULT_CONFIG)));

        expect(results.length).toBe(2);
        expect(results[0].groups.url).toEqual(issueUrl);
        expect(results[1].groups.url).toEqual(issueUrl);
    });
});
