const Router = require('express-promise-router');
const router = new Router();
const db = require(`${__dirname}/../db/dbConnection`);


// Aquí van los routes para la tabla elementos

//Crear un elemento
router.post("/", async(req, res) =>{
  try {
    const { cod_elemento, num_inventario, nombre_elemento, cantidad, marco, modelo, 
            tipo, serie, fecha_actu, estado, observaciones} = req.body;
    const newElemento = await db.query("INSERT INTO elementos (cod_elemento, num_inventario, nombre_elemento, cantidad, marco, modelo, " + 
                                         "tipo, serie, fecha, estado, observaciones) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)",
                                         [cod_elemento, num_inventario, nombre_elemento, cantidad, marco, modelo, 
                                          tipo, serie, fecha_actu, estado, observaciones]);
    res.json(newElemento);
  } catch (error) {
    console.error(error.message);
  }
});

//Consultar todos los elementos
router.get("/", async(req, res) => {
  try {
    const allElements = await db.query("SELECT * FROM elementos");
    res.json({status:"succes", data:allElements.rows});
  } catch (error) {
    console.error(error.message)
  }
});
//Consultar un elemento
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const element = await db.query("SELECT * FROM elementos WHERE cod_elemento	= $1", [id]);
    res.json(element.rows[0]);
  } catch (error) {
    console.error(error.message);
  }
});

//Actualizar un elemento
router.patch("/:id", async (req, res) => {
  try {
    const { cod_elemento, num_inventario, nombre_elemento, cantidad, marco, modelo, 
      tipo, serie, fecha_actu, estado, observaciones} = req.body;
      const newElemento = await db.query("UPDATE elementos SET num_inventario = $1, nombre_elemento = $2, cantidad = $3, marco = $4, modelo = $5, " + 
                                          "tipo = $6, serie = $7, fecha = $8, estado = $9, observaciones = $10) WHERE cod_elemento = $11",
                                          [num_inventario, nombre_elemento, cantidad, marco, modelo, 
                                          tipo, serie, fecha_actu, estado, observaciones, cod_elemento]);
    res.json("Elemento actualizado");
  } catch (error) {
    console.error(error.message);
  }
});

//Eliminar un elemento
router.delete("/:id", async (req, res) => {
  try {
    const {id} = req.params;
    const deleteElement = await db.query("DELETE FROM elementos WHERE cod_elemento = $1", [id]);
    res.json("Elemento eliminado")
  } catch (error) {
    console.error(error.message);
  }
})

module.exports = router;
