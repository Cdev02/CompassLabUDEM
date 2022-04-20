const Router = require("express-promise-router");
const router = new Router();
const db = require(`${__dirname}/../db/dbConnection`);

// Aquí van los routes para la tabla registro

//Crear un registro
router.post("/", async (req, res) => {
    try {
      const {
        codigo_ficha,
        codigo_elemento,
        usuario,
        fecha_registro,
      } = req.body;
      const newElement = await db.query(
        `INSERT INTO registro
           (codigo_ficha, codigo_elemento, usuario, fecha_registro) 
           VALUES ($1, $2, $3, $4)`,
        [
            codigo_ficha,
            codigo_elemento,
            usuario,
            fecha_registro,
        ]
      );
      res.json({ status: "Success", newElement });
    } catch (error) {
      console.error(error.message);
    }
  });

//Consultar todos los registros (Es necesario?)
router.get("/", async (req, res) => {
    try {
      const allElements = await db.query("SELECT * FROM registro");
      res.json({ status: "success", data: allElements.rows });
    } catch (error) {
      console.error(error.message);
    }
  });

//Consultar un registro en particular
router.get("/:id", async (req, res) => {
    try {
      const { codigo_ficha, codigo_elemento } = req.params;
      const element = await db.query("SELECT * FROM registro WHERE codigo_ficha = $1 AND codigo_elemento = $2", [
        codigo_ficha,
        codigo_elemento,
      ]);
      res.json({ status: "success", data: element.rows[0] });
    } catch (error) {
      console.error(error.message);
    }
  });

//Actualizar la informaión de una registro
router.patch("/:id", async (req, res) => {
    try {
      const {
        codigo_ficha,
        codigo_elemento,
        usuario,
        fecha_registro,
      } = req.body;
      const newElement = await db.query(
        `UPDATE registro codigo_ficha = $1, codigo_elemento = $2, usuario = $3, fecha_registro = $4 WHERE codigo_ficha = $5 AND codigo_elemento = $6`,
        [
            codigo_ficha,
            codigo_elemento,
            usuario,
            fecha_registro,
        ]
      );
      res.json({ status: "Registro actualizado", data: newElement });
    } catch (error) {
      console.error(error.message);
    }
  });

//Eliminar un registro
router.delete("/:id", async (req, res) => {
    try {
      const { codigo_ficha, codigo_elemento } = req.params;
      await db.query("DELETE FROM ficha WHERE codigo_ficha = $1 AND codigo_elemento = $2", [codigo_ficha, codigo_elemento]);
      res.json({ status: "Registro eliminado" });
    } catch (error) {
      console.error(error.message);
    }
  });

module.exports = router;