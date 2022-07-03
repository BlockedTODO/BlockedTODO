FROM node:16.15.0-stretch

# Install netcat (used by scripts/wait-for.sh)
RUN apt-get update && apt-get install -y netcat

# Install pg_dump for database backup job. Source: https://dba.stackexchange.com/questions/193023
RUN apt-get update && apt-get install -y lsb-release gnupg wget ca-certificates
RUN echo "deb http://apt.postgresql.org/pub/repos/apt/ $(lsb_release -cs)-pgdg main" > /etc/apt/sources.list.d/pgdg.list
RUN wget -O - http://apt.postgresql.org/pub/repos/apt/ACCC4CF8.asc | apt-key add -
RUN apt-get update && apt-get install -y postgresql-client-13

# Expose ports in the container
EXPOSE 3000

# Create service directory
RUN mkdir -p /backend
WORKDIR /backend

# Install dependencies
COPY package*.json ./
RUN npm ci --production

# Copy source code
COPY . .

# Set default command that is called when the container runs
CMD ["sh", "scripts/docker-start.sh"]
