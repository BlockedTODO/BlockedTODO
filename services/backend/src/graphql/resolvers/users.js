export const userQueries = {
    users: (parent, args, {User}, info) => User.query()
};

export const userMutations = {
    createUser: async (parent, {userInput}, {User}, info) => {
        return await User.query().insert({
            email: userInput.email,
            password: userInput.password
        });
    }
};
