/* Comment finder regex split into a bunch of chunks with comments to explain each part.
 * Inspired by several answers to this StackOverflow question: https://stackoverflow.com/questions/5989315
 *
 * Note: A regex is not a parser, so it will never be perfect (eg. it will fail on a string containing a comment).
 * In the future, we may want to create a parser for each language to get better results. */

/* JavaScript single-line comments regex.
 * This uses a "match prefix but exclude" group (?<=), which is not very well documented.
 * It is a bit more complex to ensure that "http://" is not matched outside of a comment. */
const JS_SINGLE_LINE_COMMENT = /(?<=[^\\:]|^)\/\/.*$/.source;

/* JavaScript multi-line comments regex. */
const JS_MULTILINE_COMMENT = /\/\*[\s\S]*?\*\//.source;

/* Python single-line comments regex. */
const PYTHON_SINGLE_LINE_COMMENT = /\#.*$/.source;

/* Python multi-line comments regex. */
const PYTHON_MULTILINE_COMMENT = /\"\"\"[\s\S]*?\"\"\"/.source;

/* HTML comments regex. */
const HTML_COMMENT = /<!--[\s\S]*?-->/.source;

/* g = global: All matches (don't return after first match)
 * m = multi line: Causes ^ and $ to match the begin/end of each line (not only begin/end of string) */
const GLOBAL_PATTERN_FLAGS = 'gm';

/* Combine all the above regexes into one by where any one of the above will match */
const COMMENT_REGEX = new RegExp(
    [
        JS_MULTILINE_COMMENT,
        JS_SINGLE_LINE_COMMENT,
        PYTHON_SINGLE_LINE_COMMENT,
        PYTHON_MULTILINE_COMMENT,
        HTML_COMMENT,
    ].join('|'),
    GLOBAL_PATTERN_FLAGS
);

module.exports = COMMENT_REGEX;
