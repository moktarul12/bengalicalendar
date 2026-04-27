const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const Database = require('better-sqlite3');

const app = express();
const db = new Database('bangalicalendar.db');

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('.'));

// Get all events
app.get('/api/events', (req, res) => {
  try {
    const events = db.prepare('SELECT * FROM events ORDER BY day, month, year').all();
    res.json(events);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get event by ID
app.get('/api/events/:id', (req, res) => {
  try {
    const event = db.prepare('SELECT * FROM events WHERE id = ?').get(req.params.id);
    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }
    res.json(event);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get events by date
app.get('/api/events/date/:day/:month', (req, res) => {
  try {
    const events = db.prepare('SELECT * FROM events WHERE day = ? AND month = ? ORDER BY year').all(req.params.day, req.params.month);
    res.json(events);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get events by month
app.get('/api/events/month/:month', (req, res) => {
  try {
    const events = db.prepare('SELECT * FROM events WHERE month = ? ORDER BY day, year').all(req.params.month);
    res.json(events);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create new event
app.post('/api/events', (req, res) => {
  try {
    const { id, day, month, year, titleBn, titleEn, type, color, descriptionBn, descriptionEn, imageUrl } = req.body;
    const stmt = db.prepare('INSERT INTO events (id, day, month, year, titleBn, titleEn, type, color, descriptionBn, descriptionEn, imageUrl) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)');
    const result = stmt.run(id, day, month, year, titleBn, titleEn, type, color, descriptionBn, descriptionEn, imageUrl);
    res.json({ id, message: 'Event created' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update event
app.put('/api/events/:id', (req, res) => {
  try {
    const { day, month, year, titleBn, titleEn, type, color, descriptionBn, descriptionEn, imageUrl } = req.body;
    const stmt = db.prepare('UPDATE events SET day = ?, month = ?, year = ?, titleBn = ?, titleEn = ?, type = ?, color = ?, descriptionBn = ?, descriptionEn = ?, imageUrl = ? WHERE id = ?');
    const result = stmt.run(day, month, year, titleBn, titleEn, type, color, descriptionBn, descriptionEn, imageUrl, req.params.id);
    if (result.changes === 0) {
      return res.status(404).json({ error: 'Event not found' });
    }
    res.json({ message: 'Event updated' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete event
app.delete('/api/events/:id', (req, res) => {
  try {
    const stmt = db.prepare('DELETE FROM events WHERE id = ?');
    const result = stmt.run(req.params.id);
    if (result.changes === 0) {
      return res.status(404).json({ error: 'Event not found' });
    }
    res.json({ message: 'Event deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Festival API endpoints
// Get all festivals
app.get('/api/festivals', (req, res) => {
  try {
    const festivals = db.prepare('SELECT * FROM festivals ORDER BY day, month, year').all();
    res.json(festivals);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get festival by ID
app.get('/api/festivals/:id', (req, res) => {
  try {
    const festival = db.prepare('SELECT * FROM festivals WHERE id = ?').get(req.params.id);
    if (!festival) {
      return res.status(404).json({ error: 'Festival not found' });
    }
    res.json(festival);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get festivals by date
app.get('/api/festivals/date/:day/:month', (req, res) => {
  try {
    const festivals = db.prepare('SELECT * FROM festivals WHERE day = ? AND month = ? ORDER BY year').all(req.params.day, req.params.month);
    res.json(festivals);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get festivals by month
app.get('/api/festivals/month/:month', (req, res) => {
  try {
    const festivals = db.prepare('SELECT * FROM festivals WHERE month = ? ORDER BY day, year').all(req.params.month);
    res.json(festivals);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create new festival
app.post('/api/festivals', (req, res) => {
  try {
    const { id, day, month, year, titleBn, titleEn, type, color, descriptionBn, descriptionEn, imageUrl } = req.body;
    const stmt = db.prepare('INSERT INTO festivals (id, day, month, year, titleBn, titleEn, type, color, descriptionBn, descriptionEn, imageUrl) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)');
    const result = stmt.run(id, day, month, year, titleBn, titleEn, type, color, descriptionBn, descriptionEn, imageUrl);
    res.json({ id, message: 'Festival created' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update festival
app.put('/api/festivals/:id', (req, res) => {
  try {
    const { day, month, year, titleBn, titleEn, type, color, descriptionBn, descriptionEn, imageUrl } = req.body;
    const stmt = db.prepare('UPDATE festivals SET day = ?, month = ?, year = ?, titleBn = ?, titleEn = ?, type = ?, color = ?, descriptionBn = ?, descriptionEn = ?, imageUrl = ? WHERE id = ?');
    const result = stmt.run(day, month, year, titleBn, titleEn, type, color, descriptionBn, descriptionEn, imageUrl, req.params.id);
    if (result.changes === 0) {
      return res.status(404).json({ error: 'Festival not found' });
    }
    res.json({ message: 'Festival updated' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete festival
app.delete('/api/festivals/:id', (req, res) => {
  try {
    const stmt = db.prepare('DELETE FROM festivals WHERE id = ?');
    const result = stmt.run(req.params.id);
    if (result.changes === 0) {
      return res.status(404).json({ error: 'Festival not found' });
    }
    res.json({ message: 'Festival deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get both events and festivals for a specific date
app.get('/api/date/:day/:month', (req, res) => {
  try {
    const events = db.prepare('SELECT * FROM events WHERE day = ? AND month = ? ORDER BY year').all(req.params.day, req.params.month);
    const festivals = db.prepare('SELECT * FROM festivals WHERE day = ? AND month = ? ORDER BY year').all(req.params.day, req.params.month);
    res.json({ events, festivals });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
