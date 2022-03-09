const Router = require('express-promise-router');
const router = new Router();
const db = require(`${__dirname}/../db/dbConnection`);

// Aquí van los routes para la tabla elementos

//Crear un elemento
router.post('/', async (req, res) => {
  try {
    const {
      codigo_elemento,
      numero_inventario,
      nombre_elemento,
      cantidad,
      marco,
      modelo,
      tipo,
      serie,
      fecha_actualizacion,
      estado,
      observaciones,
    } = req.body;
    const newElement = await db.query(
      `INSERT INTO elemento
       (numero_inventario, nombre_elemento,
       cantidad, marco, modelo, tipo, serie, estado, observaciones) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
      [
        numero_inventario,
        nombre_elemento,
        cantidad,
        marco,
        modelo,
        tipo,
        serie,
        estado,
        observaciones,
      ]
    );
    res.json({ status: 'Success', newElement });
  } catch (error) {
    console.error(error.message);
  }
});

//Consultar todos los elementos
router.get('/', async (req, res) => {
  try {
    const allElements = await db.query('SELECT * FROM elemento');
    res.json({ status: 'success', data: allElements.rows });
  } catch (error) {
    console.error(error.message);
  }
});
//Consultar un elemento
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const element = await db.query('SELECT * FROM elemento WHERE codigo_elemento	= $1', [
      id,
    ]);
    res.json({ status: 'success', data: element.rows[0] });
  } catch (error) {
    console.error(error.message);
  }
});

//Actualizar un elemento
router.patch('/:id', async (req, res) => {
  try {
    const {
      codigo_elemento,
      numero_inventario,
      nombre_elemento,
      cantidad,
      marco,
      modelo,
      tipo,
      serie,
      fecha_actualizacion,
      estado,
      observaciones,
    } = req.body;
    const newElement = await db.query(
      `UPDATE elemento SET numero_inventario = $1, nombre_elemento = $2, cantidad = $3, marco = $4, 
      modelo = $5, tipo = $6, serie = $7, fecha_actualizacion = $8, estado = $9, observaciones = $10) 
      WHERE codigo_elemento = $11`,
      [
        numero_inventario,
        nombre_elemento,
        cantidad,
        marco,
        modelo,
        tipo,
        serie,
        fecha_actualizacion,
        estado,
        observaciones,
        codigo_elemento,
      ]
    );
    res.json({ status: 'Elemento actualizado', data: newElement });
  } catch (error) {
    console.error(error.message);
  }
});

//Eliminar un elemento
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deleteElement = await db.query(
      'DELETE FROM elemento WHERE codigo_elemento = $1',
      [id]
    );
    res.json({ status: 'Elemento eliminado' });
  } catch (error) {
    console.error(error.message);
  }
});

module.exports = router;
