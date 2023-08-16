/*
! ESTE ARCHIVO DEFINE QUÉ FUNCIONES DE CONTROLADOR SE DEBEN EJECUTAR PARA CADA RUTA. 
! CADA RUTA SE ASOCIA A UNA FUNCIÓN ESPECÍFICA QUE REALIZA UNA ACCIÓN CORRESPONDIENTE.

* Importaciones
? Creo una instancia de Router que llamo dietsRouter
? Importo los controladores para manejar las diferentes funciones relacionadas con las dietas */

const { Router } = require("express");
const dietsRouter = Router();
const getAllDiets = require("../../controllers/diets/getAllDiets");
const getDietById = require("../../controllers/diets/getDietById");
const getDietByName = require("../../controllers/diets/getDietByName");
const createDiet = require("../../controllers/diets/createDiet");
const deleteDiet = require("../../controllers/diets/deleteDiet");
const getDietRecipe = require("../../controllers/diets/getDietRecipe");
const removeDietFromRecipe = require("../../controllers/diets/deleteDietFromRecipe");
const getMyDiets = require("../../controllers/diets/getMyDiets");
const updateDiet = require("../../controllers/diets/updateDiet");


/*
* Se definen las rutas y se asocian las funciones de controlador correspondientes */

// Ruta para obtener todas las dietas o una dieta por su nombre si se proporciona
dietsRouter.get("/", (req, res) => {
  const { name } = req.query;
  !name ? getAllDiets(req, res) : getDietByName(req, res);
});

// Ruta para obtener las dietas de un usuario por su ID //"ID USER"
dietsRouter.get("/:id/mydiets", getMyDiets);

// Ruta para obtener una dieta por su ID //"ID DIET"
dietsRouter.get("/:id", getDietById);

// Ruta para actualizar una dieta por los IDs de usuario y dieta
dietsRouter.put("/:userId/:dietId", updateDiet);

// Ruta para crear una nueva dieta
dietsRouter.post("/", createDiet);

// Ruta para eliminar una dieta por su ID
dietsRouter.delete("/:id", deleteDiet);

// Ruta para obtener las recetas asociadas a una dieta por su ID
dietsRouter.get("/recipes/:id", getDietRecipe);

// Ruta para eliminar una dieta de una receta por su ID
dietsRouter.delete("/delete/:id", removeDietFromRecipe);

/*
! Exporto la instancia dietsRouter */
module.exports = dietsRouter;