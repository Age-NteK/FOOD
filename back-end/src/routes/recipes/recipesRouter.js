/*
! ESTE ARCHIVO DEFINE CÓMO LAS SOLICITUDES HTTP DEBEN SER MANEJADAS Y QUÉ FUNCIONES DE CONTROLADOR SE DEBEN EJECUTAR PARA CADA RUTA. CADA RUTA SE ASOCIA A UNA FUNCIÓN ESPECÍFICA QUE REALIZA UNA ACCIÓN CORRESPONDIENTE, COMO OBTENER INFORMACIÓN DE USUARIOS, REGISTRAR NUEVOS USUARIOS, ACTUALIZAR DETALLES DE USUARIOS O ELIMINAR USUARIOS.

* Importaciones
? Creo una instancia de Router que llamo recipesRouter
? Importo los controladores para manejar las diferentes funciones relacionadas con las recetas */

const { Router } = require("express");
const recipesRouter = Router();
const getAllRecipes = require("../../controllers/recipes/getAllRecipes");
const getRecipeById = require("../../controllers/recipes/getRecipeById");
const getRecipeByName = require("../../controllers/recipes/getRecipeByName");
const createRecipe = require("../../controllers/recipes/createRecipe");
const updateRecipe = require("../../controllers/recipes/updateRecipe");
const deleteRecipe = require("../../controllers/recipes/deleteRecipe");
const getDietsOfOneRecipe = require("../../controllers/recipes/getDietsOfOneRecipe");

/*
* Se definen las rutas y asocia las funciones de controlador correspondientes */

// Ruta para obtener todas las recetas o una receta por su nombre si se proporciona
recipesRouter.get("/", (req, res) => {
  const { title } = req.query;
  !title ? getAllRecipes(req, res) : getRecipeByName(req, res);
});

// Ruta para obtener una receta por su ID
recipesRouter.get("/:id", getRecipeById);

// Ruta para crear una nueva receta
recipesRouter.post("/", createRecipe);

// Ruta para actualizar una receta por su ID
recipesRouter.patch("/:id", updateRecipe);

// Ruta para eliminar una receta por su ID
recipesRouter.delete("/:id", deleteRecipe);

// Ruta para obtener las dietas de una receta específica por su ID
recipesRouter.get("/:id/diets", getDietsOfOneRecipe);

/*
! Exporto la instancia recipesRouter */
module.exports = recipesRouter;