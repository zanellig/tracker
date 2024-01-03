const express = require('express');

const cors = require('cors');

const pool = require('./db');

const app = express();

const port = process.env.PORT || 3333;
const root = __dirname;

const { getUser, getUsers, createNewUser } = require('./user');
const {
  getThoughts,
  getThoughtById,
  createThought,
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
  const thoughts = await getThoughts(user_id);
  res.send(thoughts);
});

app.put('/user/:user_id/thoughts/:thought_id', async (req, res) => {
  const response = await modifyThought(req);
  res.send(response);
});

// Creates thought and returns it's body
app.post('/user/:user_id/thoughts', async (req, res) => {
  let user;
  try {
    user = await getUser(req.params.user_id);
  } catch (e) {
    console.error(e);
  }
  if (user === 'User not found.') res.send(user);

  let thoughtResponse;
  try {
    thoughtResponse = await createThought(user.user_id, req.body.thought_body);
  } catch (e) {
    console.error(e);
  }
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

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
