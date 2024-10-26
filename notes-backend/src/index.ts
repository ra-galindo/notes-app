import express from 'express';
import mysql, { RowDataPacket, OkPacket } from 'mysql2';
import dotenv from 'dotenv';
import cors from 'cors'; // Import CORS

dotenv.config();

const app = express();
app.use(cors()); // Enable CORS for all routes
const port = process.env.PORT || 5000;

// Create MySQL connection
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: Number(process.env.DB_PORT),
});

// Connect to MySQL
db.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err.stack);
    return;
  }
  console.log('Connected to MySQL database');
});

app.use(express.json());

// Get All Notes
app.get('/notes', (req, res) => {
  db.query<RowDataPacket[]>('SELECT * FROM notes ORDER BY created_at DESC', (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(results);
  });
});

// Get a Single Note by ID
app.get('/notes/:id', (req, res) => {
  const { id } = req.params;
  db.query<RowDataPacket[]>('SELECT * FROM notes WHERE id = ?', [id], (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    if (results.length === 0) {
      res.status(404).json({ message: 'Note not found' });
      return;
    }
    res.json(results[0]); // No error, as `results` is typed as `RowDataPacket[]`
  });
});

// Create a New Note
app.post('/notes', (req, res) => {
  const { title, content } = req.body;
  const query = 'INSERT INTO notes (title, content) VALUES (?, ?)';

  db.query(query, [title, content], (err, result) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }

    if ('insertId' in result) {
      res.status(201).json({ id: result.insertId, title, content });
    } else {
      res.status(500).json({ error: 'Failed to retrieve insert ID' });
    }
  });
});



// Update a Note
app.put('/notes/:id', (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;
  const query = 'UPDATE notes SET title = ?, content = ? WHERE id = ?';
  db.query<OkPacket>(query, [title, content, id], (err, result) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ message: 'Note updated successfully' });
  });
});

// Delete a Note
app.delete('/notes/:id', (req, res) => {
  const { id } = req.params;
  db.query<OkPacket>('DELETE FROM notes WHERE id = ?', [id], (err, result) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ message: 'Note deleted successfully' });
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
