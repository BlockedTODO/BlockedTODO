FROM node:16.15.0-alpine

# Expose ports in the container
EXPOSE 3001

# Use node user instead of root
# As per https://github.com/nodejs/docker-node/issues/740#issuecomment-538644464
USER node

# Create service directory
RUN mkdir -p /home/node/frontend
WORKDIR /home/node/frontend

# Install dependencies
COPY --chown=node:node package*.json ./
RUN npm ci --production

# Copy source code, create production build
COPY --chown=node:node . .
RUN npm run build

# Set default command that is called when the container runs
CMD ["sh", "scripts/docker-start.sh"]
