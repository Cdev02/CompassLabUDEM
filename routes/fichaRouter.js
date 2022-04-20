const Router = require("express-promise-router");
const router = new Router();
const db = require(`${__dirname}/../db/dbConnection`);

// Aquí van los routes para la tabla ficha

//Crear una ficha
router.post("/", async (req, res) => {
  try {
    const {
      codigo,
      fecha_creacion,
      version,
      id_laboratorio,
      nombre_procedimiento,
      capacidad,
      observaciones,
    } = req.body;
    const newElement = await db.query(
      `INSERT INTO ficha
         (codigo, fecha_creacion, version, id_laboratorio, id_laboratorio,
            nombre_procedimiento, capacidad, observaciones) 
         VALUES ($1, $2, $3, $4, $5, $6, $7)`,
      [
        codigo,
        fecha_creacion,
        version,
        id_laboratorio,
        nombre_procedimiento,
        capacidad,
        observaciones,
      ]
    );
    res.json({ status: "Success", newElement });
  } catch (error) {
    console.error(error.message);
  }
});

//Consultar todos las fichas (Es necesario?)
router.get("/", async (req, res) => {
  try {
    const allElements = await db.query("SELECT * FROM ficha");
    res.json({ status: "success", data: allElements.rows });
  } catch (error) {
    console.error(error.message);
  }
});

//Consultar una ficha en particular
router.get("/:id", async (req, res) => {
  try {
    const { codigo } = req.params;
    const element = await db.query("SELECT * FROM ficha WHERE codigo	= $1", [
      codigo,
    ]);
    res.json({ status: "success", data: element.rows[0] });
  } catch (error) {
    console.error(error.message);
  }
});

//Actualizar la informaión de una ficha
router.patch("/:id", async (req, res) => {
  try {
    const {
      fecha_creacion,
      version,
      id_laboratorio,
      nombre_procedimiento,
      capacidad,
      observaciones,
    } = req.body;
    const newElement = await db.query(
      `UPDATE ficha fecha_creacion = $1, version = $2, id_laboratorio = $3, nombre_procedimiento = $4,
      capacidad = $5, observaciones = $6 WHERE codigo = $7`,
      [
        fecha_creacion,
        version,
        id_laboratorio,
        nombre_procedimiento,
        capacidad,
        observaciones,
      ]
    );
    res.json({ status: "Ficha actualizada", data: newElement });
  } catch (error) {
    console.error(error.message);
  }
});

//Eliminar una ficha
router.delete("/:id", async (req, res) => {
  try {
    const { codigo } = req.params;
    await db.query("DELETE FROM ficha WHERE codigo = $1", [codigo]);
    res.json({ status: "Laboratorista eliminado" });
  } catch (error) {
    console.error(error.message);
  }
});

module.exports = router;
