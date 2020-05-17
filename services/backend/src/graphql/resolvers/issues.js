const issueQueries = {
    issues: (parent, args, {Issue}, info) => Issue.findAll()
};

const issueMutations = {
    createIssue: async (parent, {issueInput}, {Issue, Repository, sequelize}, info) => {
        const transaction = await sequelize.transaction();
        try {
            const repository = await Repository.findByPk(issueInput.repositoryId);
            const [issue, _created] = await Issue.findOrCreate({
                where: {url: issueInput.url}
            });

            await issue.addRepository(repository);
            transaction.commit();

            return issue;
        } catch (error) {
            transaction.rollback();
            throw error;
        }
    }
};

module.exports = {
    issueQueries,
    issueMutations,
};
