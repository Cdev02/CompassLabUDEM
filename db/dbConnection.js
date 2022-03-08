const { Pool } = require('pg');
const pool = new Pool();

// (async function () {
//   try {
//     await pool.connect();
//     // client.release();
//   } catch (err) {
//     console.error(err);
//   }
// })();
pool.on('connect', () => {
  console.log('Client Connected');
});
pool.on('error', () => {
  console.log('Error');
});
module.exports = {
  query: (text, params) => pool.query(text, params),
};
