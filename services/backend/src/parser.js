const {promises: fsPromises} = require('fs');
const globby = require('globby');
const {logger, urlNormalizer, COMMENT_REGEX, ISSUE_REGEX} = require('utils/');

/* Return array of issue urls that match ISSUE_REGEX in a single comment */
const scanComment = (comment) => {
    const results = comment.matchAll(ISSUE_REGEX);
    issueUrls = []
    for (const result of results) {
        issueUrls.push(urlNormalizer(result.groups.url));
    }
    return issueUrls;
};

const scanOneFile = async (file) => {
    try {
        logger.info(`Gathering comments from file: ${file}`);
        const contents = await fsPromises.readFile(file, {encoding: 'utf-8'});
        const fileComments = contents.match(COMMENT_REGEX) || [];

        const fileIssueUrls = [];
        for (const comment of fileComments) {
            fileIssueUrls.push(...scanComment(comment));
        }
        return fileIssueUrls;
    } catch (error) {
        logger.error(`Error occurred while reading file ${file}: ${error}`);
        throw error;
    }
};

/* Create a set of issue URLs from a list of settled promises (no duplicates) */
const mergeScanResults = (results) => {
    const issueUrls = new Set();
    for (const {status, value} of results) {
        if (status !== 'fulfilled' || !value) {
            continue;
        }

        value.forEach((url) => issueUrls.add(url));
    }
    return issueUrls;
};

/* Take in a path to a codebase, return a set of issue URLs */
const parseCodebase = async (codeFolder) => {
    const filesToScan = await globby(`${codeFolder}/**/*`);
    logger.info(`files to scan: ${filesToScan}`);

    // Create promises for each file to scan
    const scanPromises = filesToScan.map(scanOneFile);

    // Scan all files asynchronously, continue when all files are scanned.
    const results = await Promise.allSettled(scanPromises);

    return mergeScanResults(results)
};

module.exports = parseCodebase;
