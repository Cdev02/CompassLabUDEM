const Router = require('express-promise-router');
const router = new Router();
const db = require(`${__dirname}/../db/dbConnection`);

//Obtener todos los laboratorios en base de datos
router.get('/', async (req, res) => {
  try {
    const allLabs = await db.query('SELECT * FROM laboratorio');
    res.json({ status: 'success', data: allLabs.rows });
  } catch (error) {
    console.error(error.message);
  }
});
//Consultar un laboratorio por id
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const element = await db.query(
      'SELECT * FROM laboratorio WHERE id_laboratorio = $1',
      [id]
    );
    res.json({ status: 'success', data: element.rows[0] });
  } catch (error) {
    console.error(error.message);
  }
});
//Crear un laboratorio
router.post('/', async (req, res) => {
  try {
    const {
      nombre_laboratorio,
      bloque,
      nivel,
      aula,
      capacidad,
      area,
      red_hidraulica,
      red_gases_especiales,
      red_electrica,
      red_aire,
      otros,
    } = req.body;
    const newLab = await db.query(
      `INSERT INTO laboratorio
         (nombre_laboratorio, bloque, nivel, aula,
         capacidad, area, red_hidraulica, red_gases_especiales, red_electrica, red_aire, otros) 
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)`,
      [
        nombre_laboratorio,
        bloque,
        nivel,
        aula,
        capacidad,
        area,
        red_hidraulica,
        red_gases_especiales,
        red_electrica,
        red_aire,
        otros,
      ]
    );
    res.json({ status: 'Success', newLab });
  } catch (error) {
    console.error(error.message);
  }
});
//Actualizar un laboratorio
router.patch('/:id', async (req, res) => {
  try {
    const {
      nombre_laboratorio,
      bloque,
      nivel,
      aula,
      capacidad,
      area,
      red_hidraulica,
      red_gases_especiales,
      red_electrica,
      red_aire,
      otros,
    } = req.body;
    const newElement = await db.query(
      `UPDATE laboratorio SET nombre_laboratorio = $1, bloque = $2, nivel = $3, aula = $4, 
      capacidad = $5, area = $6, red_hidraulica = $7, red_gases_especiales = $8, red_electrica = $9, red_aire = $10, otros = $11 
      WHERE id_laboratorio = $12`,
      [
        nombre_laboratorio,
        bloque,
        nivel,
        aula,
        capacidad,
        area,
        red_hidraulica,
        red_gases_especiales,
        red_electrica,
        red_aire,
        otros,
        req.params.id,
      ]
    );
    res.json({ status: 'Laboratorio actualizado', data: newElement });
  } catch (error) {
    console.error(error.message);
  }
});
//Eliminar un laboratorio
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await db.query('DELETE FROM laboratorio WHERE id_laboratorio = $1', [id]);
    res.json({ status: 'Elemento eliminado' });
  } catch (error) {
    console.error(error.message);
  }
});


module.exports = router;
