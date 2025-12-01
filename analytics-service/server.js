const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');

const app = express();
app.use(cors());
app.use(express.json());

const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: 5432,
});

// POST /analytics/events
app.post('/analytics/events', async (req, res) => {
  const { event_type, details } = req.body;
  const newId = uuidv4();

  try {
    const result = await pool.query(
      'INSERT INTO analytics.events (id, event_type, details) VALUES ($1, , ) RETURNING *',
      [newId, event_type, details]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(3003, () => { // Another unique port
  console.log('Analytics service running on port 3003');
});
