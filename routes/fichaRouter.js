const Router = require('express-promise-router');
const router = new Router();
const db = require(`${__dirname}/../db/dbConnection`);

// Aquí van los routes para la tabla ficha

//Crear una ficha
router.post('/', async (req, res) => {
  try {
    const { codigo_ficha, id_laboratorio, version } = req.body;
    const newElement = await db.query(
      `INSERT INTO ficha
         (codigo_ficha,id_laboratorio, version) 
         VALUES ($1, $2, $3)`,
      [codigo_ficha, id_laboratorio, version]
    );
    res.json({ status: 'Success', newElement });
  } catch (error) {
    console.error(error.message);
  }
});

//Consultar todos las fichas
router.get('/', async (req, res) => {
  try {
    const allElements = await db.query('SELECT * FROM ficha');
    res.json({ status: 'success', data: allElements.rows });
  } catch (error) {
    console.error(error.message);
  }
});

//Consultar una ficha en particular
router.get('/:id', async (req, res) => {
  try {
    const element = await db.query('SELECT * FROM ficha WHERE codigo_ficha	= $1', [
      req.params.id,
    ]);
    res.json({ status: 'success', data: element.rows[0] });
  } catch (error) {
    console.error(error.message);
  }
});

//Actualizar la información de una ficha
router.patch('/:id', async (req, res) => {
  try {
    const { id_laboratorio, fecha_emision, version } = req.body;
    const newElement = await db.query(
      `UPDATE ficha id_laboratorio = $1, fecha_emision = $2, version = $3 WHERE codigo_ficha = $4`,
      [id_laboratorio, fecha_emision, version, req.params.id]
    );
    res.json({ status: 'Ficha actualizada', data: newElement });
  } catch (error) {
    console.error(error.message);
  }
});

//Eliminar una ficha
router.delete('/:id', async (req, res) => {
  try {
    await db.query('DELETE FROM ficha WHERE codigo_ficha = $1', [req.params.id]);
    res.json({ status: 'ficha eliminada' });
  } catch (error) {
    console.error(error.message);
  }
});

module.exports = router;
