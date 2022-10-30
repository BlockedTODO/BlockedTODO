import fs from 'fs';
import {globby} from 'globby';
import {asyncUnzip, asyncWriteFile, logger, graphqlRequestBody} from '../../utils/index.js';

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
    logger.info(`Response from GitHub: ${response.status}`, {response});
    const downloadLink = response.data.data.node.defaultBranchRef.target.zipballUrl;

    return downloadLink;
};

// Download repository, return the folder containing the downloaded & extracted repository
const downloadRepository = async (githubClient, repositoryNodeId, destination) => {
    // Download zip file
    const zipLocation = `${destination}/repository.zip`;
    const downloadLink = await repositoryDownloadLink(githubClient, repositoryNodeId);
    logger.info(`Download link for repository ${repositoryNodeId}: ${downloadLink}`);

    const fileResponse = await githubClient.get(downloadLink, {responseType: 'stream'});

    logger.info('Writing repository to zip file');
    try {
        await asyncWriteFile(fileResponse.data, zipLocation);
    } catch (error) {
        logger.error('Error occurred during asyncWriteFile', {error});
        throw error;
    }

    // Extract files
    logger.info('Extracting repository zip archive');
    try {
        await asyncUnzip(zipLocation, destination);
    } catch (error) {
        logger.error('Error occurred during asyncUnzip', {error});
        throw error;
    }

    // Delete zip file
    logger.info('Deleting repository zip archive');
    await fsPromises.unlink(zipLocation);

    // The archive is unzipped as a single folder with a random name that contains the code
    const codeFolder = (await globby(`${destination}/*`, {onlyDirectories: true}))[0];

    return codeFolder;
};

export default downloadRepository;
