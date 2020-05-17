FROM node:12.16.3-alpine

# Install dockerize
ENV DOCKERIZE_VERSION v0.6.1
RUN wget -q https://github.com/jwilder/dockerize/releases/download/$DOCKERIZE_VERSION/dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
    && tar -C /usr/local/bin -xzvf dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
    && rm dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz

# Source run-time environment variables
ENV NODE_PATH=src

# Expose ports in the container
EXPOSE 3001

# Create service directory
RUN mkdir -p /frontend
WORKDIR /frontend

# Install dependencies
COPY package*.json ./
RUN npm install --no-progress

# Copy source code
COPY . .

# Set default command that is called when the container runs
CMD ["sh", "scripts/docker-start.sh"]
