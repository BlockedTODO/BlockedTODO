# FAQ
Frequently Asked Questions

## What data does BlockedTODO store?
BlockedTODO only stores issue URLs that are mentioned in your code comments, the GitHub UUID of your repo, and the UUIDs of the tasks it creates on your repository. That's it!

## Can I use a different comment pattern?
Supporting other issue prefixes such as `Blocked by`, `BLOCKED`, `NOTIFY` is one of the highest priority tasks in the backlog.

The plan is to have a few common defaults and make it configurable by the user via a `.blockedtodo` file. At the moment, `BlockedTODO:` (case insensitive) is the only supported prefix.

## Can it support other issue sources?
Supporting other issue sources such as google bugtracker and Jira instances is definitely something I would like to support in the future.

In the short term, however, focus will remain on polishing the experience with GitHub issues.

## Can it create tasks on another service?
Eventually, I would like to support other task destinations such as Jira and Trello. For now, the focus is on polishing the GitHub experience.

## Can I install this on my GitLab/Bitbucket repository?
At the moment, BlockedTODO is only available as a GitHub app. Supporting other repository hosts is a long-term goal.

## What technologies does BlockedTODO use?
Here are some of the main ones:

- **Backend**: JavaScript (NodeJS) [Express](https://expressjs.com/) server with [Apollo](https://www.apollographql.com/) GraphQL API
- **Database**: [PostgreSQL](https://www.postgresql.org/) db with [Objection](https://vincit.github.io/objection.js/) query builder
- **Containerization**: [Docker](https://www.docker.com/) and [Docker Compose](https://docs.docker.com/compose/)
- **Orchestration**: [Kubernetes](https://kubernetes.io/) (GKE) with [Helm 3](https://helm.sh/) for templating
- **Infrastructure**: [Terraform](https://www.terraform.io/)
- **Hosting**: [Google Cloud Platform](https://cloud.google.com/)
- **CI/CD**: Google [Cloud Build](https://cloud.google.com/cloud-build)
- **Secrets Management**: Google [Secret Manager](https://cloud.google.com/secret-manager)
