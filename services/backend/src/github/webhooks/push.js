const fs = require('fs');
const stream = require('stream');
const {promisify} = require('util');
const unzipper = require('unzipper');
const {asyncUnzip} = require('utils/');
const globby = require('globby');
const tempy = require('tempy');
const del = require('del');
const createAppClient = require('github/axiosWrapper');
const graphqlRequestBody = require('utils/graphqlRequestBody');

const pipeline = promisify(stream.pipeline);

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
    console.log(codeFolder);

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
    await del(zipLocation, {force: true});

    // The archive is unzipped as a single folder with a random name that contains the code
    const codeFolder = (await globby(`${tempFolder}/*`, {onlyDirectories: true}))[0];

    return codeFolder;
};

module.exports = {onPush};
