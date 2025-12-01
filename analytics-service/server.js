const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 5432,
});

// Endpoint to receive events from the frontend
app.post('/events', async (req, res) => {
  const { event_type, path, element_id, details } = req.body;

  if (!event_type) {
    return res.status(400).json({ error: 'event_type is required' });
  }

  try {
    const result = await pool.query(
      'INSERT INTO analytics.events (event_type, path, element_id, details) VALUES ($1, $2, $3, $4) RETURNING *',
      [event_type, path, element_id, details]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Failed to insert event:', error);
    res.status(500).json({ error: error.message });
  }
});

app.listen(3001, async () => {
  // Test the database connection on startup
  await pool.query('SELECT NOW()');
  console.log('Analytics service running on port 3001 and connected to database');
});