const Router = require('express-promise-router');
const router = new Router();
const db = require(`${__dirname}/../db/dbConnection`);

// Aquí van los routes para la tabla laboratoristas_a_cargo

//Crear un registro
router.post('/', async (req, res) => {
  try {
    const { id_laboratorio, usuario, descripcion } = req.body;
    const newElement = await db.query(
      `INSERT INTO laboratorista_a_cargo
           (id_laboratorio, usuario, descripcion) 
           VALUES ($1, $2, $3)`,
      [id_laboratorio, usuario, descripcion]
    );
    res.json({ status: 'Success', newElement });
  } catch (error) {
    console.error(error.message);
  }
});

//Consultar todos los laboratoristas a cargo
router.get('/', async (req, res) => {
  try {
    const allElements = await db.query('SELECT * FROM laboratorista_a_cargo');
    res.json({ status: 'success', data: allElements.rows });
  } catch (error) {
    console.error(error.message);
  }
});

//Consultar un laboratorista a cargo en particular
router.get('/:id/:idLab', async (req, res) => {
  try {
    const { id, idLab } = req.params;
    const element = await db.query(
      'SELECT * FROM laboratorista_a_cargo WHERE id_laboratorio = $1 AND usuario = $2',
      [idLab, id]
    );
    res.json({ status: 'success', data: element.rows[0] });
  } catch (error) {
    console.error(error.message);
  }
});

//Actualizar la información de un laboratorista a cargo
router.patch('/:id/:idLab', async (req, res) => {
  try {
    const { id, idLab } = req.params;
    const { desc, newId, newLabId } = req.body;
    const newElement = await db.query(
      `UPDATE laboratorista_a_cargo id_laboratorio = $1, usuario = $2, descripcion = $3 WHERE id_laboratorio = $4 AND usuario = $5`,
      [newId, newLabId, desc, idLab, id]
    );
    res.json({ status: 'Laboratorista a cargo actualizado', data: newElement });
  } catch (error) {
    console.error(error.message);
  }
});

//Eliminar un registro
router.delete('/:id/:idLab', async (req, res) => {
  try {
    const { id, idLab } = req.params;
    await db.query(
      'DELETE FROM laboratorista_a_cargo WHERE WHERE id_laboratorio = $1 AND usuario = $2',
      [idLab, id]
    );
    res.json({ status: 'Laboratorista a cargo eliminado' });
  } catch (error) {
    console.error(error.message);
  }
});

module.exports = router;
