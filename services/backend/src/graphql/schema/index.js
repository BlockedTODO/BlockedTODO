module.exports = `
    type User {
        id: ID!
        email: String!
        password: String
        repositories: [Repository!]!
    }

    type Repository {
        id: ID!
        url: String!
        users: [User!]!
        issues: [Issue!]!
    }

    type Issue {
        id: ID!
        url: String!
        repositories: [Repository!]!
    }

    type Task {
        id: ID!
        url: String!
        repository: Repository!
        issue: Issue!
    }

    type AuthenticationData {
        userId: ID!
        token: String!
        tokenExpiration: Int!
    }

    input UserInput {
        email: String!
        password: String!
    }

    input RepositoryInput {
        url: String!
    }

    input IssueInput {
        url: String!
        repositoryId: ID!
    }

    input TaskInput {
        url: String!
        repositoryId: ID!
        issueId: ID!
    }

    input AuthenticationInput {
        email: String!
        password: String!
    }

    type RootQuery {
        users: [User!]!
        repositories: [Repository!]!
        issues: [Issue!]!
        tasks: [Task!]!
        login(authenticationInput: AuthenticationInput): AuthenticationData!
    }

    type RootMutation {
        createUser(userInput: UserInput): User
        createRepository(repositoryInput: RepositoryInput): Repository
        createIssue(issueInput: IssueInput): Issue
        createTask(taskInput: TaskInput): Task
    }

    schema {
        query: RootQuery
        mutation: RootMutation
    }
`;
