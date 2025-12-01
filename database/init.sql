-- Create schemas
CREATE SCHEMA IF NOT EXISTS listing;
CREATE SCHEMA IF NOT EXISTS inquiry;
CREATE SCHEMA IF NOT EXISTS analytics;

-- Create listing.properties table
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

-- Create inquiry.inquiries table
CREATE TABLE IF NOT EXISTS inquiry.inquiries (
  id VARCHAR(50) PRIMARY KEY,
  plot_id VARCHAR(50) NOT NULL,
  user_name VARCHAR(100) NOT NULL,
  user_email VARCHAR(150) NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create analytics.events table
CREATE TABLE IF NOT EXISTS analytics.events (
    id VARCHAR(50) PRIMARY KEY,
    event_type VARCHAR(50) NOT NULL,
    details JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Optional: Insert some sample data for testing
INSERT INTO listing.properties (id, title, location, category, price, details) VALUES
('p1', 'Oceanfront Villa', 'Malibu, CA', 'villa', 4500000.00, 'A beautiful villa with an ocean view.'),
('p2', 'Downtown Apartment', 'New York, NY', 'apartment', 1200000.00, 'A modern apartment in the heart of the city.')
ON CONFLICT (id) DO NOTHING;
