const express = require('express');

const cors = require('cors');

const pool = require('./db');

const app = express();

const port = process.env.PORT || 3333;
const root = __dirname;

app.use(cors());
app.use(express.json());

app.get('/user/:id/thoughts', async (req, res) => {
  const response = await pool.query();
});

app.listen(port, () => {});
