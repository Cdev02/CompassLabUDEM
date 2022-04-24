const Router = require("express-promise-router");
const router = new Router();
const db = require(`${__dirname}/../db/dbConnection`);

// Aquí van los routes para la tabla ficha

//Crear una ficha
router.post("/", async (req, res) => {
  try {
    const {
      id_laboratorio,
      fecha_emision,
      version,
    } = req.body;
    const newElement = await db.query(
      `INSERT INTO ficha
         (id_laboratorio, fecha_emision, version) 
         VALUES ($1, $2, $3)`,
      [
        id_laboratorio,
        fecha_emision,
        version,
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
    const element = await db.query("SELECT * FROM ficha WHERE codigo_ficha	= $1", [
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
      id_laboratorio,
      fecha_emision,
      version,
    } = req.body;
    const newElement = await db.query(
      `UPDATE ficha id_laboratorio = $1, fecha_emision = $2, version = $3 WHERE codigo = $7`,
      [
        id_laboratorio,
        fecha_emision,
        version,
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
    await db.query("DELETE FROM ficha WHERE codigo_ficha = $1", [codigo]);
    res.json({ status: "ficha eliminada" });
  } catch (error) {
    console.error(error.message);
  }
});

module.exports = router;
