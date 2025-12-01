// This runs when the service starts
const { Client } = require('pg');

const client = new Client({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 5432
});

async function initSchema() {
  try {
    await client.connect();
    
    // Create schema for listing service
    await client.query(`
      CREATE SCHEMA IF NOT EXISTS listing;
      
      CREATE TABLE IF NOT EXISTS listing.properties (
        id VARCHAR(50) PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        location VARCHAR(100) NOT NULL,
        category VARCHAR(20) NOT NULL,
        price DECIMAL(10,2) NOT NULL,
        availability BOOLEAN DEFAULT true,
        details TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Create schema and table for analytics service
    await client.query(`
      CREATE SCHEMA IF NOT EXISTS analytics;

      CREATE TABLE IF NOT EXISTS analytics.events (
        id SERIAL PRIMARY KEY,
        event_type VARCHAR(50) NOT NULL,
        path VARCHAR(255),
        element_id VARCHAR(100),
        details JSONB,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    
    console.log('Schemas for listing and analytics initialized successfully');
  } catch (error) {
    console.error('Schema initialization failed:', error);
  } finally {
    await client.end();
  }
}

initSchema();