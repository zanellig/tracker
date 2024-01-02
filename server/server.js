const express = require('express');

const cors = require('cors');

const pool = require('./db');

const app = express();

const port = process.env.PORT || 3333;
const root = __dirname;

app.use(cors());
app.use(express.json());

// get route for testing purpouses
app.get('/user/:user_id', async (req, res) => {
  const { user_id } = req.params;
  const user = await pool.query('SELECT * FROM users WHERE user_id = $1', [
    user_id,
  ]);
  user.rows[0]
    ? res.send(user.rows[0])
    : res.send(`Can't find user ${user_id}`);
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
