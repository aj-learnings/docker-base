const mysql = require('mysql2');
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());

const dbConfig = {
  host: 'db',
  user: 'root',
  password: 'password',
  database: 'sampledb'
};

function connectWithRetry() {
  const connection = mysql.createConnection(dbConfig);
  connection.connect(err => {
    if (err) {
      console.error('DB connection failed, retrying in 5s...', err.message);
      setTimeout(connectWithRetry, 5000);
    } else {
      console.log('Connected to DB');

      // Setup routes
      app.get('/api/data', (req, res) => {
        connection.query('SELECT * FROM users', (err, results) => {
          if (err) return res.status(500).send(err);
          res.json(results);
        });
      });

      app.listen(3001, () => {
        console.log('Backend running on port 3001');
      });
    }
  });
}

connectWithRetry();
