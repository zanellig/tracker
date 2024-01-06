const pool = require('./db');
const { getTimestamp } = require('./dateManipulation');

const { date_generated, time_generated } = getTimestamp();

const { insertThoughtForUser, deleteThoughtFromUser } = './user';

async function createThought(user_id, thought_body) {
  // We check if the thought already exists.
  const duplicateThought = await pool.query(
    'SELECT thought_id FROM thoughts WHERE thought_body = $1;',
    [thought_body]
  );
  if (duplicateThought.rows[0].thought_id) {
    return 'Thoughts cannot be duplicate.';
  }

  // Create the thought in db.
  await pool
    .query(
      'INSERT INTO thoughts (generated_by_user_id, thought_body, date_generated, time_generated) VALUES ($1, $2, $3, CURRENT_TIMESTAMP);',
      [user_id, thought_body, date_generated]
    )
    .catch(e => {
      if (e) console.error(e);
    });
  // Return thought body created FROM the db.
  // This query should never fail, as it depends on the query above to also not fail.

  const thoughtBody = await insertThoughtForUser({ user_id, thought_body });
  return thoughtBody;
}

// Deletes thoguht from the db accepting the id
async function deleteThoughtById(thought_id, user_id) {
  await pool.query('DELETE FROM thoughts WHERE thought_id = $1 LIMIT 1', [
    thought_id,
  ]);

  deleteThoughtFromUser(thought_id, user_id);
}

async function getThoughts(user_id) {
  const thoughts = await pool.query(
    'SELECT * FROM thoughts WHERE generated_by_user_id = $1;',
    [user_id]
  );
  return thoughts;
}

async function getThoughtById(thought_id) {
  /* 
  The function was getting passed a promise, 
  solved by adding the await keyword invoking the createThought function in server.js
  */
  return await pool.query(
    'SELECT thought_body FROM thoughts WHERE thought_id = $1',
    [thought_id]
  );
}

async function modifyThought({ params, body }) {
  const { user_id, thought_id } = params;
  const { thought_body } = body;

  return await pool
    .query(
      'UPDATE thoughts SET thought_body = $1, time_generated = $2 WHERE thought_id = $3 AND generated_by_user_id = $4;',
      [thought_body, time_generated, thought_id, user_id]
    )
    .catch(e => e);
}

module.exports = {
  createThought,
  deleteThoughtById,
  getThoughts,
  getThoughtById,
  modifyThought,
};
