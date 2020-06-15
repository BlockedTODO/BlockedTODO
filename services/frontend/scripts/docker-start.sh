#!/bin/sh

# Start server
serve -s build -l 3000 || echo "Frontend server stopped"
