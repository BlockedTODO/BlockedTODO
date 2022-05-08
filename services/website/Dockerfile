FROM node:16.15.0-alpine

# Install dockerize
ENV DOCKERIZE_VERSION v0.6.1
RUN wget -q https://github.com/jwilder/dockerize/releases/download/$DOCKERIZE_VERSION/dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
    && tar -C /usr/local/bin -xzvf dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
    && rm dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz

# Expose ports in the container
EXPOSE 3002

# Use node user instead of root
# As per https://github.com/nodejs/docker-node/issues/740#issuecomment-538644464
USER node

# Create service directory
RUN mkdir -p /home/node/website
WORKDIR /home/node/website

# Install dependencies
COPY --chown=node:node package*.json ./
RUN npm ci

# Copy source code, create production build
COPY --chown=node:node . .
RUN npm run build

# Set default command that is called when the container runs
CMD ["sh", "scripts/docker-start.sh"]
