const express = require('express');

const cors = require('cors');

const pool = require('./db');

const app = express();

const port = process.env.PORT || 3333;
const root = __dirname;

const { getUser, getUsers, createNewUser } = require('./user');
const { getThoughts, createThought, modifyThought } = require('./thoughts');

app.use(cors());
app.use(express.json());

// User REST
app.get('/user/:user_id', async (req, res) => {
  const { user_id } = req.params;
  const user = await getUser(user_id);
  res.send(user);
});

app.get('/user', async (req, res) => {
  const users = await getUsers();
  res.send(users);
});

app.post('/user', async (req, res) => {
  const response = await createNewUser(req);
  res.send(response);
});

// Thoughts REST
app.get('/user/:user_id/thoughts', async (req, res) => {
  const { user_id } = req.params;
  const thoughts = getThoughts(user_id);
  res.send(thoughts);
});

app.put('/user/:user_id/thoughts/:thought_id', async (req, res) => {
  const response = await modifyThought(req);
  res.send(response);
});

// FINISH, NOT FUNCTIONAL
app.post('/user/:user_id/thoughts', async (req, res) => {
  const user = await getUser(req.params.user_id);
  if (user === 'User not found.') res.send(user);

  // TIMEZONE GIVING ERORRS
  /*
  POSTMAN RETURNED THIS RESPONSE ON POST AND PUT ROUTES
  {
    "length": 172,
    "name": "error",
    "severity": "ERROR",
    "code": "22007",
    "where": "unnamed portal parameter $2 = '...'",
    "file": "datetime.c",
    "line": "4018",
    "routine": "DateTimeParseError"
  }
  */
  const response = await createThought(req);
  res.send(response);
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
