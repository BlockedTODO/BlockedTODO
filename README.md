<p align="center">
    <img src="./docs/blockedtodo-logo-banner.svg" alt="BlockedTODO" width="336">
</p>

## About

**BlockedTODO** is a tool that tracks issues mentioned in code comments.

It periodically scans your repository for comments with the following format:

> BlockedTODO: \<github issue url\>

When a mentioned issue is closed, BlockedTODO will automatically open a new task on your backlog letting you know the issue is unblocked.

**TODO: ADD SCREENSHOT**

## Installation
Installing BlockedTODO on your GitHub repository is easy!

1. Visit https://github.com/apps/blockedtodo
2. Click install
3. Select repositories on which to install the GitHub app

## When would I need this?
If you work with lots of dependencies or cutting-edge technologies, odds are that you will eventually end up in a situation where a library you're using is missing a feature for your use case. You look it up on a search engine, and end up landing on an open GitHub issue for the exact feature you are looking for.

Since the issue is still open, you write a not-so-clean workaround in your codebase in the meantime, but you'd like to clean it up once the issue is resolved. BlockedTODO's proposed solution is to do the following:

- Install BlockedTODO on your GitHub repository
- Add a comment in your codebase referring to the open issue and describe what should be done once it's resolved

BlockedTODO will then automatically open an issue on your repository when the watched issue is closed.

## Why is this better than subscribing to a GitHub issue?
For personal repositories, the biggest benefit is that the opened issue gives you context for _why_ you are being notified.
If you subscribed to an issue one year ago and it gets closed today, you'll be notified, but you may not remember why you were following that issue in the first place. BlockedTODO will give you **additional context** to help you recall.

It shows even more benefits for **teams working on a shared codebase**.

Suppose we have a developer _Bob_ who works on a typical development team. Bob subscribes to an open feature request on library X, and in the meantime, writes a workaround in his codebase. One year later, library X addresses the issue and Bob is notified. In all likelihood, by this point, Bob no longer works on that part of the code.

In this situation, he may decide to ignore the notification. If he ignores it, then the company is left with **technical debt** that will probably never be addressed and no explanation for the added complexity in the codebase created by Bob's workaround.

Even worse, if Bob has left the company by the time he gets the notification, then _nobody_ at the company even knows about this unnecessary and **completely untracked** source of complexity left unaddressed in the codebase.

If bob is a better team member and still works at the company, he may instead choose to open an issue on his backlog explaining what work can be done now that library X is updated. If he does that, then he has essentially done **manually** what BlockedTODO could have done for him **automatically**.

## Why can't I just open an issue in my backlog?
This is definitely a good first step. The problem with this approach is that it can pollute your backlog with a bunch of unactionable tasks.

Ideally, a _blocked_ task in your backlog is blocked by another task in your own backlog, meaning that unblocking a task is completely within your control. When it comes to issues on your dependencies' codebases, you have no control over when they will be unblocked.

With BlockedTODO, tasks enter your backlog only after they become actionable.

## What is the value proposition?
BlockedTODO is a dependency monitoring tool that provides convenience via automation.

**Developers are expensive**. This tool automates a non-development task, allowing devs to focus their time on using their valuable coding skills.

**Technical debt is not only expensive, it also [compounds over time](https://dev.to/dealeron/what-s-the-interest-on-your-technical-debt-4pon)!** BlockedTODO minimizes the time your technical debt spends compounding.

## Other Questions
Visit the [FAQ](./docs/faq.md). You can also ask questions by [opening an issue](https://github.com/BlockedTODO/BlockedTODO/issues/new).

For private inquiries, email cblockedtodo@gmail.com.

## Contribute
Create feature requests and bug reports by [opening an issue](https://github.com/BlockedTODO/BlockedTODO/issues/new).

Vote on issues by reacting with a thumbs up to the issues that affect you. I use reaction counts to prioritize tasks.

Pull requests are welcome, but please keep in mind that while the code is public, it does not have an open-source license (ie. all rights reserved). This means that any contribution will require you to transfer your IP to BlockedTODO for that contribution.

### Local setup
See [these instructions](./docs/dev_setup.md) to set up and run the codebase locally.

### Deployment
See [these instructions](./docs/deployment.md) for instructions on deploying the services with terraform.

## License

While the code is public, it does not have an open-source license (ie. _all rights reserved_). Any contribution to this codebase will require you to transfer your relevant IP to BlockedTODO.

**So why is this codebase public?** So that companies and individuals can verify/audit that the code is up to their security and privacy standards. It also gives the community a place to open/discuss issues and feature requests.

Copyright © 2020 Dominic Roy-Stang. All rights reserved.
