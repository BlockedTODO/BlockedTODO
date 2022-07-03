#!/bin/sh

PARENT_FOLDER=$(dirname "$0")

# Install missing dependencies (so we don't have to rebuild at every package*.json change)
npm install --no-progress --no-audit

# Wait for services
$PARENT_FOLDER/wait-for.sh $DATABASE_HOST:$DATABASE_PORT --timeout 60 \
  -- echo "Database is running." || echo "Timed out waiting for the database."

# Run migrations
npm run db:migrate

# Run seeds
npm run db:seed

# Start server
npm run start:debug
