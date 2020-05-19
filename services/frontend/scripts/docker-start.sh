#!/bin/sh

# Wait for services
dockerize -wait tcp://$REACT_APP_BACKEND_HOST:$REACT_APP_BACKEND_PORT -timeout 1m

# Start server
npm run start || echo "Frontend server stopped"
