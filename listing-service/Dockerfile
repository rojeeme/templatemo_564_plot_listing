# Use an official Node.js runtime as a parent image
FROM node:18-alpine

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install app dependencies
RUN apk add --no-cache postgresql-client && npm install

# Copy the entrypoint script
COPY docker-entrypoint.sh /usr/src/app/docker-entrypoint.sh
RUN chmod +x /usr/src/app/docker-entrypoint.sh

# Copy app source
COPY . .

# The service runs on port 3000
EXPOSE 3000

ENTRYPOINT ["/usr/src/app/docker-entrypoint.sh"]

# Command to run the application
CMD [ "node", "server.js" ]