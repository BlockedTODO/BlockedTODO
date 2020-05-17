#!/bin/sh

# Wait for services
dockerize -wait tcp://$BACKEND_HOST:$BACKEND_PORT -timeout 1m

# Start server
npm run start || echo "Frontend server stopped"
