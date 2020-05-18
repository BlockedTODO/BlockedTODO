#!/bin/sh

# Wait for services
dockerize -wait tcp://$DATABASE_HOST:$DATABASE_PORT -timeout 1m

# Run migrations
npx sequelize db:migrate

# Start server
npm run start:prod || echo "Backend server stopped"
