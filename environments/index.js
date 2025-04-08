const express = require('express');

const app = express();
const port = process.env.PORT || 3001

const env = process.env.NODE_ENV || "development";

app.get('/', (req, res) => {
  res.send(`
    <h1> Current Env : ${env} </h1>
  `);
});

app.listen(port, () => {
  console.log(`${env} server is running on port 3001`);
});
