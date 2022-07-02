#!/bin/sh

PARENT_FOLDER=$(dirname "$0")

# Wait for services
$PARENT_FOLDER/wait-for.sh $DATABASE_HOST:$DATABASE_PORT --timeout 60 \
  -- echo "Database is running." || echo "Timed out waiting for the database."

# Run migrations
npm run db:migrate

# Start server
npm run start:prod || echo 'Backend server stopped'
