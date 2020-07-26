const {promises: fsPromises} = require('fs');
const globby = require('globby');
const {logger, COMMENT_REGEX, ISSUE_REGEX} = require('utils/');

/* Return array of issue urls that match ISSUE_REGEX in a single comment */
const scanComment = (comment) => {
    const results = comment.matchAll(ISSUE_REGEX);
    const issueUrls = [];
    for (const result of results) {
        issueUrls.push(result.groups.url);
    }
    return issueUrls;
};

/* Scans one file for comments that match the proper regexes
 * returns an array of objects with the following structure{<url>: {filePath, comment}} */
const scanOneFile = async (file) => {
    try {
        logger.info(`Gathering comments from file: ${file}`);
        const contents = await fsPromises.readFile(file, {encoding: 'utf-8'});
        const fileComments = contents.match(COMMENT_REGEX) || [];

        const fileIssueUrls = [];
        for (const comment of fileComments) {
            const commentIssueUrls = scanComment(comment);
            commentIssueUrls.forEach((url) => {
                fileIssueUrls.push({[url]: {filePath: file, comment: comment}});
            });
        }
        return fileIssueUrls;
    } catch (error) {
        logger.error(`Error occurred while reading file ${file}: ${error}`);
        throw error;
    }
};

/* Create a set of issue URLs from a list of settled promises (no duplicates),
 * represented as an object with the following structure: {<url>: [{file, comment}]}*/
const mergeScanResults = (results, codeFolder) => {
    const referencedIssues = {};
    for (const {status, value: urlList} of results) {
        if (status !== 'fulfilled' || !urlList) {
            continue;
        }

        for (const urlObject of urlList) {
            for (const [key, commentDetails] of Object.entries(urlObject)) {
                const relativeCommentDetails = {
                    file: commentDetails.filePath.replace(`${codeFolder}/`, ''),
                    comment: commentDetails.comment,
                };
                if (key in referencedIssues) {
                    referencedIssues[key].push(relativeCommentDetails);
                } else {
                    referencedIssues[key] = [relativeCommentDetails];
                }
            }
        }
    }

    return referencedIssues;
};

/* Take in a path to a codebase, return a set of issue URLs */
const parseCodebase = async (codeFolder) => {
    const filesToScan = await globby(`${codeFolder}/**/*`);
    logger.info(`files to scan: ${filesToScan}`);

    // Create promises for each file to scan
    const scanPromises = filesToScan.map(scanOneFile);

    // Scan all files asynchronously, continue when all files are scanned.
    const results = await Promise.allSettled(scanPromises);

    return mergeScanResults(results, codeFolder);
};

module.exports = parseCodebase;
