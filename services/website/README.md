# BlockedTODO Website Service
The public "marketing" website/landing page.

## Difference between this and frontend service
This is the public website (blockedtodo.com). Once you authenticate, you land on the frontend service (app.blockedtodo.com).

# Required environment variables
All of these are automatically set when running with docker-compose, but do need to be set manually on production environments

* `REACT_APP_FRONTEND_PROTOCOL`
* `REACT_APP_FRONTEND_HOST`
* `REACT_APP_FRONTEND_PORT`
