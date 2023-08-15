/*
! ESTE ARCHIVO DEFINE CÓMO LAS SOLICITUDES HTTP DEBEN SER MANEJADAS Y QUÉ FUNCIONES DE CONTROLADOR SE DEBEN EJECUTAR PARA CADA RUTA. 
! CADA RUTA SE ASOCIA A UNA FUNCIÓN ESPECÍFICA QUE REALIZA UNA ACCIÓN CORRESPONDIENTE.

* Importaciones
? Creo una instancia de Router que llamo favoritesRouter
? Importo los controladores para manejar las diferentes funciones relacionadas con las recetas favoritas */

const { Router } = require("express");
const favoritesRouter = Router();
const addFavorite = require("../../controllers/favorites/addFavorite");
const getAllFavorites = require("../../controllers/favorites/getAllFavorites");
const deleteFavorite = require("../../controllers/favorites/deleteFavorite");

/*
* Se definen las rutas y se asocian las funciones de controlador correspondientes */

// Ruta para obtener todas las recetas favoritas de un usuario por su ID
favoritesRouter.get("/:id", getAllFavorites);

// Ruta para agregar una receta a favoritos
favoritesRouter.post("/:recipeId/:userId", addFavorite);

// Ruta para eliminar una receta de favoritos
favoritesRouter.delete("/:recipeId/:userId", deleteFavorite);

/*
! Exporto la instancia favoritesRouter */
module.exports = favoritesRouter;
