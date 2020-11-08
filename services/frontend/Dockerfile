FROM node:14.15.0-alpine

# Install dockerize
ENV DOCKERIZE_VERSION v0.6.1
RUN wget -q https://github.com/jwilder/dockerize/releases/download/$DOCKERIZE_VERSION/dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
    && tar -C /usr/local/bin -xzvf dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
    && rm dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz

# Expose ports in the container
EXPOSE 3001

# Create service directory
RUN mkdir -p /frontend
WORKDIR /frontend

# Install dependencies
COPY package*.json ./
RUN npm ci

# Copy source code, create production build
COPY . .
RUN npm run build

# Set default command that is called when the container runs
CMD ["sh", "scripts/docker-start.sh"]
