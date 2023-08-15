//USERS
export const LOGIN = "LOGIN"; //OK
export const REGISTER_USER = "REGISTER_USER"; //OK
export const USER_PROFILE = "USER_PROFILE"; //OK
export const UPDATE_USER = "UPDATE_USER"; //OK
export const GET_MY_RECIPES = "GET_MY_RECIPES"; //OK

//RECIPES
export const GET_ALL_RECIPES = "GET_ALL_RECIPES"; //OK
export const GET_RECIPE_BY_NAME = "GET_RECIPE_BY_NAME"; //OK
export const GET_RECIPE_BY_ID = "GET_RECIPE_BY_ID"; //OK
export const CREATE_RECIPE = "CREATE_RECIPE"; //OK
export const UPDATE_RECIPE = "UPDATE_RECIPE"; //OK
export const DELETE_RECIPE = "DELETE_RECIPE";  //OK
export const GET_DIETS_OF_ONE_RECIPE = "GET_DIETS_OF_ONE_RECIPE"  //OK

//Ordenamientos Recipes
export const SORT_RECIPES_TITLE = "SORT_RECIPES_TITLE"; //OK
export const SORT_RECIPES_HEALTH_SCORE = "SORT_RECIPES_HEALTH_SCORE"; //OK
export const SORT_BY_PRICE = "SORT_BY_PRICE"; //OK

//Filters Recipes
export const FILTER_BY_VEGAN = "FILTER_BY_VEGAN"; //OK
export const FILTER_BY_POPULAR = "FILTER_BY_POPULAR"; //OK
export const FILTER_BY_VEGETARIAN = "FILTER_BY_VEGETARIAN"; //OK
export const FILTER_BY_GLUTEN_FREE = "FILTER_BY_GLUTEN_FREE"; //OK

//DIETS
export const GET_ALL_DIETS = "GET_ALL_DIETS"; //OK
export const GET_DIET_BY_NAME = "GET_DIET_BY_NAME"; //OK
export const GET_DIET_BY_ID = "GET_DIET_BY_ID"; //OK
export const DELETE_DIET = "DELETE_DIET";  //OK
export const DELETE_DIET_OF_ONE_RECIPE = "DELETE_DIET_OF_ONE_RECIPE" //OK
export const CREATE_DIET = "CREATE_DIET"  //OK
export const GET_MY_DIETS = "GET_MY_DIETS"  //OK
export const UPDATE_DIET = "UPDATE_DIET"    //

//FAVORITES
export const ADD_FAVORITE = "ADD_FAVORITE";  //OK
export const GET_ALL_FAVORITES = "GET_ALL_FAVORITES";  //OK
export const DELETE_FAVORITE = "DELETE_FAVORITE";  //OK

//PAGINATION
export const PAGINATION = "PAGINATION";

//CLEAN Y RESET
export const RESET = "RESET"; //OK
export const CLEAN = "CLEAN"; //OK



















//ORDER PRICE DEL BACK END RUTA
// const express = require('express');
// const router = express.Router();
// const { Op } = require('sequelize'); // Importa los operadores de Sequelize
// const Recipe = require('../models/recipe'); // Ruta al modelo de Recipe

// // Ruta para obtener todas las recetas ordenadas por precio
// router.get('/recipes/sort-by-price', async (req, res) => {
//   try {
//     // Utiliza el método findAll() de Sequelize para obtener todas las recetas y ordenarlas por precio
//     const recipes = await Recipe.findAll({
//       order: [['price', 'ASC']], // Orden ascendente por precio (de menor a mayor)
//       // order: [['price', 'DESC']], // Orden descendente por precio (de mayor a menor)
//     });

//     res.json(recipes);
//   } catch (error) {
//     res.status(500).json({ message: 'Error al obtener las recetas.', error });
//   }
// });

// // Otras rutas y funciones del controlador para crear, actualizar, eliminar recetas, etc.

// module.exports = router;
