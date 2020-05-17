#!/bin/sh

# Install missing dependencies (so we don't have to rebuild at every package*.json change)
npm install --no-progress --no-audit

# Wait for services
dockerize -wait tcp://$BACKEND_HOST:$BACKEND_PORT -timeout 1m

# Run migrations
npx sequelize db:migrate

# Start server
npm run start
