export const taskQueries = {
    tasks: (parent, args, {Task}, info) => Task.query()
};

export const taskMutations = {
    createTask: async (parent, {taskInput}, {Task}, info) => {
        const {nodeId, repositoryId, issueId} = taskInput;

        return await Task.query().insert({nodeId, repositoryId, issueId});
    }
};
