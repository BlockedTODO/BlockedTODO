const ISSUE_REGEX = require('./issueRegex');

describe('Prefix regex', () => {
    it('matches a basic comment (sanity test)', () => {
        const code = '// BlockedTODO: https://github.com/BlockedTODO/BlockedTODO/issues/57';
        const results = Array.from(code.matchAll(ISSUE_REGEX));

        expect(results.length).toBe(1);
        expect(results[0].groups.prefix).toEqual('BlockedTODO: ');
    });

    it('matches the prefix, case insensitive', () => {
        const code = '// blockedtodo: https://github.com/BlockedTODO/BlockedTODO/issues/57';
        const results = Array.from(code.matchAll(ISSUE_REGEX));

        expect(results.length).toBe(1);
        expect(results[0].groups.prefix).toEqual('blockedtodo: ');
    });
});

describe('URL regex', () => {
    it('matches a basic comment (sanity test)', () => {
        const issueUrl = 'https://github.com/BlockedTODO/BlockedTODO/issues/57'
        const code = `// BlockedTODO: ${issueUrl}`;
        const results = Array.from(code.matchAll(ISSUE_REGEX));

        expect(results.length).toBe(1);
        expect(results[0].groups.url).toEqual(issueUrl);
    });

    it('matches a url without a protocol', () => {
        const issueUrl = 'github.com/BlockedTODO/BlockedTODO/issues/57'
        const code = `// BlockedTODO: ${issueUrl}`;
        const results = Array.from(code.matchAll(ISSUE_REGEX));

        expect(results.length).toBe(1);
        expect(results[0].groups.url).toEqual(issueUrl);
    });
});
