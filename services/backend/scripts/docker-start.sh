#!/bin/sh

# Wait for services
dockerize -wait tcp://$DATABASE_HOST:$DATABASE_PORT -timeout 1m

# Run migrations
npm run db:migrate

# Start server
npm run start:prod || echo "Backend server stopped"
