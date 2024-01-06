const express = require('express');

const cors = require('cors');

const pool = require('./db');

const app = express();

const port = process.env.PORT || 3333;
const root = __dirname;

const {
  getUser,
  getUsers,
  getUserByUsername,
  createNewUser,
} = require('./user');
const {
  createThought,
  deleteThoughtById,
  getThoughts,
  getThoughtById,
  modifyThought,
} = require('./thoughts');

app.use(cors());
app.use(express.json());

// User REST
app.get('/user/:user_id', async (req, res) => {
  const { user_id } = req.params;
  const user = await getUser(user_id);
  res.send(user);
});

// THIS ROUTE IS ONLY FOR TESTING PURPOSES
app.get('/users', async (req, res) => {
  const { user_name } = req.body;
  const response = await getUserByUsername(user_name);
  console.log(response);
  res.send(response);
});

app.get('/user', async (req, res) => {
  const users = await getUsers();
  res.send(users);
});

app.post('/user', async (req, res) => {
  const response = await createNewUser(req.body);
  if (typeof response === 'string') res.send(response);
  res.send(response.rows[0].user_id);
});

// Thoughts REST
app.get('/user/:user_id/thoughts', async (req, res) => {
  const { user_id } = req.params;
  const thoughts = await getThoughts(user_id);
  res.send(thoughts);
});

app.put('/user/:user_id/thoughts/:thought_id', async (req, res) => {
  const response = await modifyThought(req);
  res.send(response);
});

// Creates thought and returns it's body
app.post('/user/:user_id/thoughts', async (req, res) => {
  // I want to simplify this part. Maybe extract the try/catch blocks to a separate function.
  let user;
  try {
    user = await getUser(req.params.user_id);
  } catch (e) {
    console.error(e);
  }
  if (typeof user === 'string') res.send(user);

  let thoughtResponse;
  try {
    thoughtResponse = await createThought(user.user_id, req.body.thought_body);
  } catch (e) {
    console.error(e);
  }
  if (!thoughtResponse || typeof thoughtResponse === 'string')
    res.send(thoughtResponse);

  const thoughtId = thoughtResponse.rows[0].thought_id;

  let thoughtIdObject;
  let thoughtBody;
  try {
    thoughtIdObject = await getThoughtById(thoughtId);
    thoughtBody = thoughtIdObject.rows[0].thought_body;
  } catch (e) {
    console.error(e);
  }

  res.send(thoughtBody);
});

app.delete('/user/:user_id/thoughts/:thought_id', async (req, res) => {
  let response;
  try {
    response = await deleteThoughtById(req.params);
  } catch (e) {
    console.error(e);
  }
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
