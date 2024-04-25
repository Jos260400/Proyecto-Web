
const express = require('express');
const sqlite3 = require('sqlite3');
const bodyParser = require('body-parser');
const cors = require('cors');


const app = express();
app.use(cors());
app.use(bodyParser.json());

const db = new sqlite3.Database('./mydb.sqlite3');

db.run('CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, email TEXT, password TEXT)');

app.post('/login', (req, res) => {

  const { email, password } = req.body;


  const stmt = db.prepare('INSERT INTO users (email, password) VALUES (?, ?)');
  stmt.run(email, password, function(err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(200).json({ id: this.lastID });
  });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
