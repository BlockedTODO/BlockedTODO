const fs = require('fs');
const globby = require('globby');
const {asyncUnzip, asyncWriteFile, logger, graphqlRequestBody} = require('utils/');

const fsPromises = fs.promises;

// Get a temporary repository download URL
const repositoryDownloadLink = async (githubClient, repositoryNodeId) => {
    const getArchiveUrl = graphqlRequestBody(`
        query {
            node(id: "${repositoryNodeId}") {
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

    const response = await githubClient.post('/graphql', getArchiveUrl);
    logger.info(`Response from GitHub: ${response.status}`);
    const downloadLink = response.data.data.node.defaultBranchRef.target.zipballUrl;

    return downloadLink;
};

// Download repository, return the folder containing the downloaded & extracted repository
const downloadRepository = async (githubClient, repositoryNodeId, destination) => {
    // Download zip file
    const zipLocation = `${destination}/repository.zip`;
    const downloadLink = await repositoryDownloadLink(githubClient, repositoryNodeId);
    const fileResponse = await githubClient.get(downloadLink, {responseType: 'stream'});
    try {
        await asyncWriteFile(fileResponse.data, zipLocation);
    } catch (error) {
        logger.error(`Error occurred during asyncWriteFile: ${error}`);
        throw error;
    }

    // Extract files
    try {
        await asyncUnzip(zipLocation, destination);
    } catch (error) {
        logger.error(`Error occurred during asyncUnzip: ${error}`);
        throw error;
    }

    // Delete zip file
    await fsPromises.unlink(zipLocation);

    // The archive is unzipped as a single folder with a random name that contains the code
    const codeFolder = (await globby(`${destination}/*`, {onlyDirectories: true}))[0];

    return codeFolder;
};

module.exports = downloadRepository;
