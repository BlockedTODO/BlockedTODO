#!/bin/sh

# Install missing dependencies (so we don't have to rebuild at every package*.json change)
npm install --no-progress

# Wait for services
dockerize -wait tcp://$DATABASE_HOST:$DATABASE_PORT -timeout 1m

# Run migrations
npx sequelize db:migrate

# Start server
npm run start
