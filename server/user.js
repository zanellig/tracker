const pool = require('./db');

async function getUser(user_id) {
  const user = await pool.query('SELECT * FROM users WHERE user_id = $1;', [
    user_id,
  ]);
  const retrievedUser = user.rows[0];
  return retrievedUser ? retrievedUser : `User not found.`;
}

async function getUserByUsername(user_name) {
  let response;
  await pool
    .query('SELECT user_id FROM users WHERE user_name = $1;', [user_name])
    .then(a => console.log(a));
  return response;
}

async function getUsers() {
  const users = await pool.query('SELECT * FROM users;');
  return users.rows;
}

async function createNewUser({
  auth_provider,
  user_name,
  email,
  has_accepted_terms,
}) {
  const userExists = await getUserByUsername(user_name);
  switch (userExists) {
    case true: {
      return 'Username already exists';
    }
  }
  let response;
  await pool
    .query(
      'INSERT INTO users (auth_provider, user_name, email, has_accepted_terms) VALUES ($1, $2, $3, $4);',
      [auth_provider, user_name, email, has_accepted_terms]
    )
    .catch(e => e.constraint)
    .then(
      (response = await pool.query(
        'SELECT user_id FROM users WHERE user_name = $1;',
        [user_name]
      ))
    );
  return response;
}

// Thoughts array methods
/**
 * @returns {Promise, Object, String}
 */
async function insertThoughtForUser(response) {
  console.log(`insertThoughtForUser function is being called with ${response}`);
  await pool
    .query('SELECT thought_id FROM thoughts WHERE thought_body = $1;', [
      response.thought_body,
    ])
    .then(async thoughtResponse => {
      const thought_id = thoughtResponse.rows[0].thought_id;
      await pool.query(
        'UPDATE users SET thoughts = array_append(thoughts, $1) WHERE user_id = $2',
        [thought_id, response.user_id]
      );
      console.log(thoughtResponse);
      return thoughtResponse;
    });
}

async function deleteThoughtFromUser(thought_id, user_id) {
  await pool.query(
    'UPDATE users SET thoughts = array_remove(thoughts, $1) WHERE user_id = $2',
    [thought_id, user_id]
  );
}

module.exports = {
  createNewUser,
  deleteThoughtFromUser,
  getUser,
  getUserByUsername,
  getUsers,
  insertThoughtForUser,
};
