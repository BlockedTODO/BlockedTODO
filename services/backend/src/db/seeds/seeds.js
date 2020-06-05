const {User, Repository, Issue, Task} = require('../models/');
require('../'); // connect db

const seed = async (knex) => {
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
        'host_id',
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
    // Create resources
    const user0 = await User.query().insert({email: 'test0@test.com', password: 'password0'}); // user 0 is empty (no associations/repositories)
    const user1 = await User.query().insert({email: 'test1@test.com', password: 'password1'}); // user 1 has many repos and issues, each issue has one task but no data is shared with other users
    const user2 = await User.query().insert({email: 'test2@test.com', password: 'password2'}); // users 2 and 3 share some repos, issues, and tasks
    const user3 = await User.query().insert({email: 'test3@test.com', password: 'password3'});

    const repository0 = await Repository.query().insert({host: 'github', hostId: 'user1/repo0'});
    const repository1 = await Repository.query().insert({host: 'github', hostId: 'user1/repo1'});
    const repository2 = await Repository.query().insert({host: 'github', hostId: 'user2/repo2'});
    const repository3 = await Repository.query().insert({host: 'github', hostId: 'user3/repo3'});
    const repository4 = await Repository.query().insert({host: 'github', hostId: 'someuser/repo4'});
    const repository5 = await Repository.query().insert({host: 'github', hostId: 'someuser/repo5'});

    const issue0 = await Issue.query().insert({url: 'http://github.com/user1/repo0/issues/0'});
    const issue1 = await Issue.query().insert({url: 'http://github.com/user1/repo0/issues/1'});
    const issue2 = await Issue.query().insert({url: 'http://github.com/someuser/somerepo/issues/2'});
    const issue3 = await Issue.query().insert({url: 'http://github.com/someuser/somerepo/issues/3'});
    const issue4 = await Issue.query().insert({url: 'http://github.com/someuser/somerepo/issues/4'});
    const issue5 = await Issue.query().insert({url: 'http://github.com/someuser/somerepo/issues/5'});

    // Create resources with belongsTo associations
    const task0 = await Task.query().insert({
        host: 'github',
        hostId: 'user1/repo0/issues/100',
        repositoryId: repository0.id,
        issueId: issue0.id
    });
    const task1 = await Task.query().insert({
        host: 'github',
        hostId: 'user1/repo1/issues/111',
        repositoryId: repository1.id,
        issueId: issue1.id,
    });
    const task2 = await Task.query().insert({
        host: 'github',
        hostId: 'user2/repo2/issues/222',
        repositoryId: repository2.id,
        issueId: issue2.id,
    });
    const task3 = await Task.query().insert({
        host: 'github',
        hostId: 'user3/repo3/issues/333',
        repositoryId: repository3.id,
        issueId: issue3.id,
    });
    const task4 = await Task.query().insert({
        host: 'github',
        hostId: 'user2/repo2/issues/224',
        repositoryId: repository2.id,
        issueId: issue4.id,
    });
    const task5 = await Task.query().insert({
        host: 'github',
        hostId: 'someuser/repo4/issues/044',
        repositoryId: repository4.id,
        issueId: issue4.id,
    });
    const task6 = await Task.query().insert({
        host: 'github',
        hostId: 'someuser/repo5/055',
        repositoryId: repository5.id,
        issueId: issue5.id,
    });
    const task7 = await Task.query().insert({
        host: 'github',
        hostId: 'someuser/repo4/045',
        repositoryId: repository4.id,
        issueId: issue5.id,
    })

    // Create associations
    await user1.$relatedQuery('repositories').relate([repository0, repository1]);
    await user2.$relatedQuery('repositories').relate([repository2, repository4, repository5]);
    await user3.$relatedQuery('repositories').relate([repository3, repository4, repository5]);

    await repository0.$relatedQuery('issues').relate([issue0]);
    await repository1.$relatedQuery('issues').relate([issue1]);
    await repository2.$relatedQuery('issues').relate([issue2, issue5]);
    await repository3.$relatedQuery('issues').relate([issue3, issue5]);
    await repository4.$relatedQuery('issues').relate([issue4, issue5]);
    await repository5.$relatedQuery('issues').relate([issue5]);
};
/* eslint-enable */

module.exports = {
    seed
};
