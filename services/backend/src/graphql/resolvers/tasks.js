const taskQueries = {
    tasks: (parent, args, {Task}, info) => Task.query()
};

const taskMutations = {
    createTask: async (parent, {taskInput}, {Task}, info) => {
        const {host, hostId, repositoryId, issueId} = taskInput;

        return await Task.query().insert({host: host, hostId: hostId, repositoryId: repositoryId, issueId: issueId});
    }
};

module.exports = {
    taskQueries,
    taskMutations,
};
