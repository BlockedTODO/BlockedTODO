const {Webhooks} = require('@octokit/webhooks');

const webhooks = new Webhooks({
    secret: process.env.GITHUB_WEBHOOKS_SECRET,
    path: '/github_event_handler',
});

webhooks.on('*', ({id, name, payload}) => {
    console.log(name, 'event received');
    console.dir(payload);
});

module.exports = webhooks;
