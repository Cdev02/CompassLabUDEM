const Router = require("express-promise-router");
const router = new Router();
const db = require(`${__dirname}/../db/dbConnection`);

// Aquí van los routes para la tabla laboratoristas

//Crear un laboratorista
router.post("/", async (req, res) => {
  try {
    const { cedula, nombre, apellido } = req.body;
    const newElement = await db.query(
      `INSERT INTO laboratorista
         (cedula, nombre, apellido) 
         VALUES ($1, $2, $3)`,
      [cedula, nombre, apellido]
    );
    res.json({ status: "Success", newElement });
  } catch (error) {
    console.error(error.message);
  }
});

//Consultar todos los laboratoristas
router.get("/", async (req, res) => {
  try {
    const allElements = await db.query("SELECT * FROM laboratorista");
    res.json({ status: "success", data: allElements.rows });
  } catch (error) {
    console.error(error.message);
  }
});

//Consultar un laboratorista en particular
router.get("/:id", async (req, res) => {
  try {
    const { cedula } = req.params;
    const element = await db.query(
      "SELECT * FROM laboratorista WHERE cedula	= $1",
      [cedula]
    );
    res.json({ status: "success", data: element.rows[0] });
  } catch (error) {
    console.error(error.message);
  }
});

//Actualizar la informaión de un laboratorista
router.patch("/:id", async (req, res) => {
  try {
    const { nombre, apellido } = req.body;
    const newElement = await db.query(
      `UPDATE laboratorista nombre = $1, apellido = $2 WHERE cedula = $3`,
      [nombre, apellido]
    );
    res.json({ status: "Laboratorista actualizado", data: newElement });
  } catch (error) {
    console.error(error.message);
  }
});

//Eliminar un laboratorista
router.delete("/:id", async (req, res) => {
  try {
    const { cedula } = req.params;
    await db.query("DELETE FROM laboratorista WHERE cedula = $1", [cedula]);
    res.json({ status: "Laboratorista eliminado" });
  } catch (error) {
    console.error(error.message);
  }
});

module.exports = router;
