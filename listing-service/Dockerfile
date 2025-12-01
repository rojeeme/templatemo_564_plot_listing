FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./
RUN npm install

# Copy source code
COPY . .

# Create database schema on startup
# COPY init-schema.js ./scripts/ 

EXPOSE 3000

CMD ["npm", "start"]