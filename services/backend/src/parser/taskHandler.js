const {Task} = require('db/');
const {URL} = require('url');
const {logger} = require('utils/');
const {getIssue, createIssue} = require('github/utils/');

// Create tasks
const createMissingTasks = async (repository, githubClient, referencedIssues) => {
    const issues = await repository.$relatedQuery('issues');

    const handleIssue = async (issue) => {
        const issueUrl = new URL(issue.url);
        if (issueUrl.hostname !== 'github.com') {
            logger.info(`Unsupported issue host: ${issueUrl.hostname} for ${issue.url}`);
            return;
        }

        const existingTask = await Task.query().findOne({repositoryId: repository.id, issueId: issue.id});
        if (existingTask) {
            logger.info(`task ${existingTask.id} already exists for issue ${issue.id} on repository ${repository.id}`);
            return;
        }

        const {closed} = await getIssue(githubClient, issue);
        if (!closed) {
            logger.info(`issue ${issue.id} is still open`);
            return;
        }

        // Create task (GitHub issue)
        logger.info(`Creating GitHub task for issue ${issue.url} on repo ${repository.id}`);
        const githubIssue = await createIssue(githubClient, issue, repository, referencedIssues[issue.url]);
        logger.info(`GitHub task was created for issue ${issue.url} on repo ${repository.id}`);

        // Create task in database
        const task = await Task.query().insert({
            host: 'github',
            hostId: githubIssue.id,
            repositoryId: repository.id,
            issueId: issue.id,
        });
        logger.info(`Task ${task.id} created`);

        return task;
    };

    await Promise.allSettled(issues.map((issue) => handleIssue(issue)));
};

module.exports = {createMissingTasks};
