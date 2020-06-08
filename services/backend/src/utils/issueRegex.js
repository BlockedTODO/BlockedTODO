const urlRegex = require('url-regex');

/* Prefix that comes before the issue url
 * eg. `BlockedTODO: `, `Blocked by ` or `NOTIFY: `*/
const BLOCKEDTODO_PREFIX = /(?<prefix>BlockedTODO:\s*)/.source;

/* URL regex. */
const URL_REGEX = new RegExp('(?<url>' + urlRegex({strict: false}).source + ')').source;

/* g = global: All matches (don't return after first match)
 * m = multi line: Causes ^ and $ to match the begin/end of each line (not only begin/end of string)
 * i = case insensitive match */
const GLOBAL_PATTERN_FLAGS = 'gmi';

/* Combine the above partial regexes into one */
const ISSUE_REGEX = new RegExp(
    [
        BLOCKEDTODO_PREFIX,
        URL_REGEX,
    ].join(''),
    GLOBAL_PATTERN_FLAGS
);

module.exports = ISSUE_REGEX;
