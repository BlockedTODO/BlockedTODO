const taskQueries = {
    tasks: (parent, args, {Task}, info) => Task.query()
};

const taskMutations = {
    createTask: async (parent, {taskInput}, {Task, Repository, Issue}, info) => {
        const {host, hostId, repositoryId, issueId} = taskInput;
        const [repository, issue] = await Promise.all([
            Repository.query().findById(repositoryId),
            Issue.query().findById(issueId),
        ]);

        return await Task.query().insert({host: host, hostId: hostId, repositoryId: repository.id, issueId: issue.id});
    }
};

module.exports = {
    taskQueries,
    taskMutations,
};
