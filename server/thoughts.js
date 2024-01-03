const pool = require('./db');
const { getTimestamp } = require('./dateManipulation');

const { date_generated, time_generated } = getTimestamp();

async function getThoughts(user_id) {
  const thoughts = await pool.query(
    'SELECT * FROM thoughts WHERE generated_by_user_id = $1;',
    [user_id]
  );
  return thoughts;
}

async function createThought({ params, body }) {
  const { user_id } = params;
  const { thought_body } = body;

  return await pool
    .query(
      'INSERT INTO thoughts (generated_by_user_id, thought_body, date_generated, time_generated) VALUES ($1, $2, $3, $4::timestamp with time zone);',
      [user_id, thought_body, date_generated, time_generated]
    )
    .catch(e => e);
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

module.exports = { getThoughts, createThought, modifyThought };
