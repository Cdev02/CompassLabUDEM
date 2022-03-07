const Router = require('express-promise-router');
const router = new Router();
const db = require(`${__dirname}/../db/dbConnection`);

router.get('/', async function (req, res) {
  const { rows } = await db.query('SELECT * FROM products');
  res.status(200).json({ status: 'Success', results: rows.length, data: rows });
});

module.exports = router;
