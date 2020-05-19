#!/bin/sh

# Install missing dependencies (so we don't have to rebuild at every package*.json change)
npm install --no-progress --no-audit

# Start server
npm run start
