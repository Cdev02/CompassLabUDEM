const Router = require('express-promise-router');
const router = new Router();
const db = require(`${__dirname}/../db/dbConnection`);

// Aquí van los routes para la tabla laboratoristas

//Crear un laboratorista
router.post('/', async (req, res) => {
  try {
    const { usuario, contrasena, nombre, apellido } = req.body;
    const newElement = await db.query(
      `INSERT INTO laboratorista
         (usuario, contrasena, nombre, apellido) 
         VALUES ($1, $2, $3, $4)`,
      [usuario, contrasena, nombre, apellido]
    );
    res.json({ status: 'Success', newElement });
  } catch (error) {
    console.error(error.message);
  }
});

//Consultar todos los laboratoristas
router.get('/', async (req, res) => {
  try {
    const allElements = await db.query('SELECT * FROM laboratorista');
    res.json({ status: 'success', data: allElements.rows });
  } catch (error) {
    console.error(error.message);
  }
});

//Consultar un laboratorista en particular
router.get('/:user', async (req, res) => {
  try {
    const element = await db.query('SELECT * FROM laboratorista WHERE usuario	= $1', [
      req.params.user,
    ]);
    res.json({ status: 'success', data: element.rows[0] });
  } catch (error) {
    console.error(error.message);
  }
});

//Actualizar la información de un laboratorista
router.patch('/:user', async (req, res) => {
  try {
    const { contrasena, nombre, apellido } = req.body;
    const newElement = await db.query(
      `UPDATE laboratorista contrasena = $1, nombre = $2, apellido = $3 WHERE usuario = $4`,
      [contrasena, nombre, apellido, req.params.user]
    );
    res.json({ status: 'Laboratorista actualizado', data: newElement });
  } catch (error) {
    console.error(error.message);
  }
});

//Eliminar un laboratorista
router.delete('/:user', async (req, res) => {
  try {
    await db.query('DELETE FROM laboratorista WHERE usuario = $1', [req.params.user]);
    res.json({ status: 'Laboratorista eliminado' });
  } catch (error) {
    console.error(error.message);
  }
});

module.exports = router;
