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

// GET /inquiries
app.get('/inquiries', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM inquiry.inquiries');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST /inquiries
app.post('/inquiries', async (req, res) => {
  const { plot_id, user_name, user_email, message } = req.body;
  const newId = uuidv4();

  try {
    const result = await pool.query(
      'INSERT INTO inquiry.inquiries (id, plot_id, user_name, user_email, message) VALUES ($1, , , , ) RETURNING *',
      [newId, plot_id, user_name, user_email, message]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(3002, () => { // Use a different port
  console.log('Inquiry service running on port 3002');
});
