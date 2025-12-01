#!/bin/sh
# Exit immediately if a command exits with a non-zero status.
set -e

# Wait for the database to be ready
# We use a loop to try connecting until it succeeds.
echo "Waiting for database to be ready..."
until PGPASSWORD=$DB_PASSWORD psql -h "$DB_HOST" -U "$DB_USER" -d "$DB_NAME" -c '\q'; do
  >&2 echo "Postgres is unavailable - sleeping"
  sleep 1
done

>&2 echo "Postgres is up - executing command"

# Run the schema initialization
node scripts/init-schema.js

# Start the main application
exec node server.js