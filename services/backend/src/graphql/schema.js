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

    input RepositoryInput {
        url: String!
    }

    input UserInput {
        email: String!
        password: String!
    }

    type RootQuery {
        repositories: [Repository!]!
        users: [User!]!
    }

    type RootMutation {
        createRepository(repositoryInput: RepositoryInput): Repository
        createUser(userInput: UserInput): User
    }

    schema {
        query: RootQuery
        mutation: RootMutation
    }
`;
