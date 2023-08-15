/*
! ESTE ARCHIVO SE ENCARGA DE CONECTAR Y CREAR LA BASE DE DATOS

* Se importan las dependencias necesarias: Recipe y Diet del módulo ../db, uuidv4 de la biblioteca uuid, y los módulos path y fs para manejar archivos y rutas. */
//const axios = require('axios');
const { Recipe, Diet } = require("../db");
const { v4: uuidv4 } = require("uuid");
const path = require("path");
const fs = require("fs");

// ! CONEXIÓN A LA API
// try {
//   const response = await axios.get('https://api.spoonacular.com/recipes/complexSearch', {
//     params: {
//       apiKey: 'TU_API_KEY', // Reemplaza TU_API_KEY por tu clave de API válida
//       addRecipeInformation: false,
//       number: 10, // Modifica el número según la cantidad de recetas que desees obtener
//     },
//   });

// ! CONEXIÓN A ARCHIVO LOCAL
const filePath = path.join(__dirname, "../../data.json");
const rawData = fs.readFileSync(filePath);
const data = JSON.parse(rawData);

/*
* Define la función DB_connect, que es la que realizará la conexión y creación de la base de datos.
? Se lee el contenido del archivo JSON ubicado en ../../data.json y lo analiza en formato JSON.
? Procesa los resultados del archivo JSON para eliminar recetas duplicadas y crear las recetas en la tabla Recipe.
? Obtiene todas las dietas de las recetas y crea las dietas en la tabla Diet si aún no existen.
? Muestra un mensaje en la consola indicando que la base de datos ha sido creada.
? Maneja errores y muestra un mensaje de error en caso de que ocurra alguno.
*/

// Función para conectar y crear la base de datos
const DB_connect = async () => {
  try {
    const results = data.results;

    if (!results) {
      console.log("No results found in the data.");
      return;
    }

    // CONEXION PARA ELIMINAR RECETAS DUPLICADAS
    // Utilizar un Set para almacenar los títulos de las recetas únicos
    const uniqueRecipeTitles = new Set();
    const uniqueRecipes = results.reduce((unique, item) => {
      const title = item.title;

      // Verificar si el título de la receta ya existe en el Set
      // Si ya existe, omitir la receta actual para evitar duplicados
      if (!uniqueRecipeTitles.has(title)) {
        uniqueRecipeTitles.add(title);
        unique.push({
          id: uuidv4(),
          title: title,
          summary: item.summary,
          image: item.image,
          healthScore: item.healthScore,
          steps: item.analyzedInstructions[0]?.steps || [],
          vegetarian: item.vegetarian,
          vegan: item.vegan,
          glutenFree: item.glutenFree,
          veryPopular: item.veryPopular,
          pricePerServing: item.pricePerServing,
          dairyFree: item.dairyFree,
          diets: item.diets,
        });
      }
      return unique;
    }, []);

    // Crear las recetas en la tabla Recipe
    await Recipe.findOrCreate(uniqueRecipes);

    // Obtener todas las dietas de todas las recetas
    const allDiets = uniqueRecipes.reduce((diets, recipe) => {
      recipe.diets.forEach((diet) => {
        if (!diets.includes(diet)) {
          diets.push(diet);
        }
      });
      return diets;
    }, []);

    // Utilizar un Set para almacenar los nombres de las dietas únicas
    const uniqueDiets = new Set(allDiets);

    // Crear las dietas en la tabla Diet si aún no existen
    await Diet.findOrCreate(
      Array.from(uniqueDiets).map((diet) => ({ name: diet }))
    );

    console.log("Database Created...");
  } catch (error) {
    console.log("An error occurred:", error.message);
  }
};

/*
! Exporto la función DB_connect.*/
module.exports = DB_connect;
