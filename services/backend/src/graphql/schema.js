module.exports = `
    type Repository {
        id: ID!
        url: String!
        users: [User!]!
    }

    type User {
        id: ID!
        email: String!
        password: String
        repositories: [Repository!]!
    }

    type Task {
        id: ID!
        url: String!
    }

    input RepositoryInput {
        url: String!
    }

    input UserInput {
        email: String!
        password: String!
    }

    input TaskInput {
        url: String!
    }

    type RootQuery {
        repositories: [Repository!]!
        users: [User!]!
        tasks: [Task!]!
    }

    type RootMutation {
        createRepository(repositoryInput: RepositoryInput): Repository
        createUser(userInput: UserInput): User
        createTask(taskInput: TaskInput): Task
    }

    schema {
        query: RootQuery
        mutation: RootMutation
    }
`;
