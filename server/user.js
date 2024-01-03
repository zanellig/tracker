const pool = require('./db');

async function getUser(user_id) {
  const user = await pool.query('SELECT * FROM users WHERE user_id = $1;', [
    user_id,
  ]);
  const retrievedUser = user.rows[0];
  return retrievedUser ? retrievedUser : `User not found.`;
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
  return await pool
    .query(
      'INSERT INTO users (auth_provider, user_name, email, has_accepted_terms) VALUES ($1, $2, $3, $4)',
      [auth_provider, user_name, email, has_accepted_terms]
    )
    .catch(e => e.constraint);
}
module.exports = { getUser, getUsers, createNewUser };
