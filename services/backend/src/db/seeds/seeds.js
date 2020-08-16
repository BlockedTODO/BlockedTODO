const {User, Repository, Issue, Task} = require('../models/');
require('../'); // connect db

const seed = async (knex) => {
    const environment = process.env.NODE_ENV || 'development';
    if (environment === 'production') {
        return;
    }

    const seededUsers = await User.query().whereIn(
        'email',
        ['test0@test.com', 'test1@test.com', 'test2@test.com', 'test3@test.com']
    );

    if (seededUsers.length < 4) {
        await deleteSeedData(knex);
        await generateSeedData(knex);
    }
};

const deleteSeedData = async (_knex) => {
    // Deleting these models will cascade through associated tasks and join tables.
    await User.query().delete().whereIn(
        'email',
        ['test0@test.com', 'test1@test.com', 'test2@test.com', 'test3@test.com']
    );

    await Repository.query().delete().whereIn(
        'nodeId',
        ['user1/repo0', 'user1/repo1', 'user2/repo2', 'user3/repo3', 'someuser/repo4', 'someuser/repo5']
    );

    await Issue.query().delete().whereIn(
        'url',
        [
            'http://github.com/user1/repo0/issues/0',
            'http://github.com/user1/repo0/issues/1',
            'http://github.com/someuser/somerepo/issues/2',
            'http://github.com/someuser/somerepo/issues/3',
            'http://github.com/someuser/somerepo/issues/4',
            'http://github.com/someuser/somerepo/issues/5',
        ]
    );
};

/* eslint-disable */
const generateSeedData = async (knex) => {
    // Create users
    const user0 = await User.query().insert({email: 'test0@test.com', password: 'password0'}); // user 0 is empty (no associations/repositories)
    const user1 = await User.query().insert({email: 'test1@test.com', password: 'password1'}); // user 1 has many repos and issues, each issue has one task but no data is shared with other users
    const user2 = await User.query().insert({email: 'test2@test.com', password: 'password2'}); // users 2 and 3 share some repos
    const user3 = await User.query().insert({email: 'test3@test.com', password: 'password3'});

    // Create repositories
    const repository0 = await Repository.query().insert({nodeId: 'user1/repo0', installationId: '1'});
    const repository1 = await Repository.query().insert({nodeId: 'user1/repo1', installationId: '1'});
    const repository2 = await Repository.query().insert({nodeId: 'user2/repo2', installationId: '2'});
    const repository3 = await Repository.query().insert({nodeId: 'user3/repo3', installationId: '3'});
    const repository4 = await Repository.query().insert({nodeId: 'someuser/repo4', installationId: '4'});
    const repository5 = await Repository.query().insert({nodeId: 'someuser/repo5', installationId: '5'});

    // Create issues
    const issue0 = await Issue.query().insert({
        url: 'http://github.com/user1/repo0/issues/0',
        repositoryId: repository0.id,
    });
    const issue1 = await Issue.query().insert({
        url: 'http://github.com/user1/repo0/issues/1',
        repositoryId: repository1.id,
    });
    const issue2 = await Issue.query().insert({
        url: 'http://github.com/someuser/somerepo/issues/2',
        repositoryId: repository2.id,
    });
    const issue3 = await Issue.query().insert({
        url: 'http://github.com/someuser/somerepo/issues/3',
        repositoryId: repository3.id,
    });
    const issue4 = await Issue.query().insert({
        url: 'http://github.com/someuser/somerepo/issues/4',
        repositoryId: repository4.id,
    });
    const issue5 = await Issue.query().insert({
        url: 'http://github.com/someuser/somerepo/issues/5',
        repositoryId: repository5.id,
    });

    // Create resources with belongsTo associations
    const task0 = await Task.query().insert({
        nodeId: 'user1/repo0/issues/100',
        repositoryId: repository0.id,
        issueId: issue0.id
    });
    const task1 = await Task.query().insert({
        nodeId: 'user1/repo1/issues/111',
        repositoryId: repository1.id,
        issueId: issue1.id,
    });
    const task2 = await Task.query().insert({
        nodeId: 'user2/repo2/issues/222',
        repositoryId: repository2.id,
        issueId: issue2.id,
    });
    const task3 = await Task.query().insert({
        nodeId: 'user3/repo3/issues/333',
        repositoryId: repository3.id,
        issueId: issue3.id,
    });
    const task4 = await Task.query().insert({
        nodeId: 'user2/repo2/issues/224',
        repositoryId: repository2.id,
        issueId: issue4.id,
    });
    const task5 = await Task.query().insert({
        nodeId: 'someuser/repo4/issues/044',
        repositoryId: repository4.id,
        issueId: issue4.id,
    });
    const task6 = await Task.query().insert({
        nodeId: 'someuser/repo5/055',
        repositoryId: repository5.id,
        issueId: issue5.id,
    });
    const task7 = await Task.query().insert({
        nodeId: 'someuser/repo4/045',
        repositoryId: repository4.id,
        issueId: issue5.id,
    })

    // Create many-to-many associations
    await user1.$relatedQuery('repositories').relate([repository0, repository1]);
    await user2.$relatedQuery('repositories').relate([repository2, repository4, repository5]);
    await user3.$relatedQuery('repositories').relate([repository3, repository4, repository5]);
};
/* eslint-enable */

module.exports = {
    seed
};
