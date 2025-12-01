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
  port: 5432,
});

// GET /listings
app.get('/listings', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM listing.properties');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST /listings
app.post('/listings', async (req, res) => {
  const { id, title, location, category, price, details } = req.body;
  
  try {
    const result = await pool.query(
      'INSERT INTO listing.properties (id, title, location, category, price, details) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [id, title, location, category, price, details]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(3000, () => {
  console.log('Listing service running on port 3000');
});


const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');


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


