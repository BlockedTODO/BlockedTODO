const {User, Repository, Issue, Task} = require('../models/');
require('../'); // connect db

const seed = async (_knex) => {
    const user0 = await User.query().insert({email: 'test0@test.com', password: 'password0'}); // user 0 is empty (no associations/repositories)
    const user1 = await User.query().insert({email: 'test1@test.com', password: 'password1'}); // user 1 has many repos and issues, each task has one task but no data is shared with other users
    const user2 = await User.query().insert({email: 'test2@test.com', password: 'password2'}); // users 2 and 3 share some repos, issues, and tasks
    const user3 = await User.query().insert({email: 'test3@test.com', password: 'password3'});

    const repository0 = await Repository.query().insert({url: 'http://github.com/user1/repo0'});
    const repository1 = await Repository.query().insert({url: 'http://github.com/user1/repo1'});
    const repository2 = await Repository.query().insert({url: 'http://github.com/user2/repo2'});
    const repository3 = await Repository.query().insert({url: 'http://github.com/user3/repo3'});
    const repository4 = await Repository.query().insert({url: 'http://github.com/someuser/repo4'});
    const repository5 = await Repository.query().insert({url: 'http://github.com/someuser/repo5'});

    const issue0 = await Issue.query().insert({url: 'http://github.com/user1/repo0/issues/0'});
    const issue1 = await Issue.query().insert({url: 'http://github.com/user1/repo0/issues/1'});
    const issue2 = await Issue.query().insert({url: 'http://github.com/someuser/somerepo/issues/2'});
    const issue3 = await Issue.query().insert({url: 'http://github.com/someuser/somerepo/issues/3'});
    const issue4 = await Issue.query().insert({url: 'http://github.com/someuser/somerepo/issues/4'});
    const issue5 = await Issue.query().insert({url: 'http://github.com/someuser/somerepo/issues/5'});

    const task0 = await Task.query().insert({
        url: 'http://github.com/user1/repo0/issues/10',
        repositoryId: repository0.id,
        issueId: issue0.id
    });
    const task1 = await Task.query().insert({
        url: 'http://github.com/user1/repo1/issues/11',
        repositoryId: repository1.id,
        issueId: issue1.id,
    });
    const task2 = await Task.query().insert({
        url: 'http://github.com/user2/repo2/issues/2',
        repositoryId: repository2.id,
        issueId: issue2.id,
    });
    const task3 = await Task.query().insert({
        url: 'http://github.com/user3/repo3/issues/3',
        repositoryId: repository3.id,
        issueId: issue3.id
    });
};

module.exports = {
    seed,
}
