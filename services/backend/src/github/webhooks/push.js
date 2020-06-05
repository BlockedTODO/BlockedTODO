const fs = require('fs');
const createAppClient = require('github/axiosWrapper');
const graphqlRequestBody = require('utils/graphqlRequestBody');

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

    const fileResponse = await github.get(downloadLink, {responseType: 'stream'});

    fileResponse.data.pipe(fs.createWriteStream('/downloadedrepo.zip'));
};

module.exports = {onPush};
