# Use the official Nginx image
FROM nginx:alpine

# Copy the static content and the Nginx configuration
COPY . /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf