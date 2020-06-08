const fs = require('fs');
const {asyncUnzip, logger, COMMENT_REGEX} = require('utils/');
const globby = require('globby');
const tempy = require('tempy');
const createAppClient = require('github/axiosWrapper');
const graphqlRequestBody = require('utils/graphqlRequestBody');

const fsPromises = fs.promises;

const onPush = async ({payload}) => {
    const defaultBranch = payload.repository.default_branch;
    const branch = payload.ref.match(/refs\/heads\/(?<branchName>.*)/).groups.branchName;

    if (branch !== defaultBranch) {
        console.log('Not on the default branch, skipping repo scan');
        return;
    }

    const github = await createAppClient(payload.installation.id);
    const repositoryId = payload.repository.node_id;

    // Get a temporary repo download url
    const getArchiveUrl = graphqlRequestBody(`
        query {
            node(id: "${repositoryId}") {
                ... on Repository {
                    defaultBranchRef {
                        target {
                            ... on Commit {
                                zipballUrl
                            }
                        }
                    }
                }
            }
        }
    `);

    const urlResponse = await github.post('/graphql', getArchiveUrl);
    const downloadLink = urlResponse.data.data.node.defaultBranchRef.target.zipballUrl;

    const codeFolder = await downloadRepository(github, downloadLink);

    const filesToScan = await globby(`${codeFolder}/**/*`);
    logger.info(`files to scan: ${filesToScan}`);

    const comments = [];

    // Create promises for each file to scan
    const scanComments = filesToScan.map(async (file) => {
        try {
            logger.info(`Gathering comments from file: ${file}`);
            const contents = await fsPromises.readFile(file, {encoding: 'utf-8'});
            const fileComments = contents.match(COMMENT_REGEX) || [];
            comments.push(...fileComments);
        } catch (error) {
            logger.error(`Error occurred while reading file ${file}: ${error.toString()}`);
            throw error;
        }
    });

    // Scan all files asynchronously, continue when all files are scanned.
    await Promise.allSettled(scanComments);

    logger.info(comments);

    // Delete temp folder
};

const downloadRepository = async (githubClient, downloadLink) => {
    const tempFolder = tempy.directory();
    const zipLocation = `${tempFolder}/repository.zip`;

    // Download zip file
    const fileResponse = await githubClient.get(downloadLink, {responseType: 'stream'});
    fileResponse.data.pipe(fs.createWriteStream(zipLocation));

    // Extract files
    await asyncUnzip(zipLocation, tempFolder);

    // Delete zip file
    await fsPromises.unlink(zipLocation);

    // The archive is unzipped as a single folder with a random name that contains the code
    const codeFolder = (await globby(`${tempFolder}/*`, {onlyDirectories: true}))[0];

    return codeFolder;
};

module.exports = {onPush};
