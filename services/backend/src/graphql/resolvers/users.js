const userQueries = {
    users: (parent, args, {User}, info) => User.findAll()
};

const userMutations = {
    createUser: async (parent, {userInput}, {User}, info) => {
        return await User.create({
            email: userInput.email,
            password: userInput.password
        });
    }
};

module.exports = {
    userQueries,
    userMutations,
};
