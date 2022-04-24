const Router = require("express-promise-router");
const router = new Router();
const db = require(`${__dirname}/../db/dbConnection`);

// Aquí van los routes para la tabla laboratoristas

//Crear un laboratorista
router.post("/", async (req, res) => {
  try {
    const { usuario, contraseña, nombre, apellido } = req.body;
    const newElement = await db.query(
      `INSERT INTO laboratorista
         (usuario, contraseña, nombre, apellido) 
         VALUES ($1, $2, $3, $4)`,
      [usuario, contraseña, nombre, apellido]
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
    const { usuario } = req.params;
    const element = await db.query(
      "SELECT * FROM laboratorista WHERE usuario	= $1",
      [usuario]
    );
    res.json({ status: "success", data: element.rows[0] });
  } catch (error) {
    console.error(error.message);
  }
});

//Actualizar la informaión de un laboratorista
router.patch("/:id", async (req, res) => {
  try {
    const { contraseña, nombre, apellido } = req.body;
    const newElement = await db.query(
      `UPDATE laboratorista contraseña = $1, nombre = $2, apellido = $3 WHERE usuario = $4`,
      [contraseña, nombre, apellido]
    );
    res.json({ status: "Laboratorista actualizado", data: newElement });
  } catch (error) {
    console.error(error.message);
  }
});

//Eliminar un laboratorista
router.delete("/:id", async (req, res) => {
  try {
    const { usuario } = req.params;
    await db.query("DELETE FROM laboratorista WHERE usuario = $1", [usuario]);
    res.json({ status: "Laboratorista eliminado" });
  } catch (error) {
    console.error(error.message);
  }
});

module.exports = router;