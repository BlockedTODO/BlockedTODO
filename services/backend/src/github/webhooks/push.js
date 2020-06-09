const parseCodebase = require('parser');
const {createAppClient, downloadRepository} = require('github/utils/');

const onPush = async ({payload}) => {
    const defaultBranch = payload.repository.default_branch;
    const branch = payload.ref.match(/refs\/heads\/(?<branchName>.*)/).groups.branchName;

    if (branch !== defaultBranch) {
        console.log('Not on the default branch, skipping repo scan');
        return;
    }

    const githubClient = await createAppClient(payload.installation.id);
    const repositoryId = payload.repository.node_id;

    const codeFolder = await downloadRepository(githubClient, repositoryId);

    const referencedIssues = await parseCodebase(codeFolder);
    console.dir(referencedIssues);

    // Delete temp folder
};

module.exports = {onPush};
