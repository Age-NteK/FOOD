/*
! ESTE ARCHIVO SE ENCARGA DE CONECTAR Y CREAR LA BASE DE DATOS

* Se importan las dependencias necesarias: Recipe y Diet del módulo ../db, uuidv4 de la biblioteca uuid, y los módulos path y fs para manejar archivos y rutas. */
const { Recipe, Diet } = require("../db");
const { v4: uuidv4 } = require("uuid");
const path = require("path");
const fs = require("fs");

// ! CONEXIÓN A LA API
// const axios = require('axios');

// try {
//   const { data } = await axios.get('https://api.spoonacular.com/recipes/complexSearch', {
//     params: {
//       apiKey: '08dde4098ca64fac9fb7f59c7faf6d48',
//       addRecipeInformation: false,
//       number: 100, // * Número de recetas a obtener
//     },
//   });

//   const results = data.results;

//   if (!results) {
//     console.log("No results found in the data.");
//     return;
//   }

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

    const uniqueRecipeTitles = new Set();

    for (const item of results) {
      const title = item.title;

      if (!uniqueRecipeTitles.has(title)) {
        uniqueRecipeTitles.add(title);

        const [recipe, created] = await Recipe.findOrCreate({
          where: { title }, // Buscar por título
          defaults: {
            id: uuidv4(),
            title,
            summary: item.summary,
            image: item.image,
            healthScore: item.healthScore,
            steps: item.analyzedInstructions[0]?.steps || [],
            vegetarian: !!item.vegetarian,
            vegan: !!item.vegan,
            glutenFree: !!item.glutenFree,
            veryPopular: !!item.veryPopular,
            pricePerServing: item.pricePerServing || 0,
            dairyFree: !!item.dairyFree,
          },
        });

        if (created) {
          console.log("New recipe created:", recipe.title);
        }
      }
    }

    //? Generar lista única de valores para diets
    const allDiets = results.reduce((diets, item) => {
      item.diets.forEach((diet) => {
        if (!diets.includes(diet)) {
          diets.push(diet);
        }
      });
      return diets;
    }, []);

    // * Acumulador inicial [] de método reduce()
    //? NOTA Si no se proporcionara un valor inicial (en este caso, un arreglo vacío []), la primera iteración intentaría llamar al método push() en un valor que podría ser undefined, lo cual generaría un error.
    //? con [] aseguramos que haya un objeto Array sobre el cual llamar al método push() desde la primera iteración sin preocuparnos por la posibilidad de undefined.

    const uniqueDiets = new Set(allDiets);

    for (const dietName of uniqueDiets) {
      await Diet.findOrCreate({
        where: { name: dietName }, // Buscar por nombre de dieta
        defaults: { name: dietName },
      });
    }

    console.log("Database Created...");
  } catch (error) {
    console.log("An error occurred:", error.message);
  }
};

module.exports = DB_connect;

//! (!!) Se hace para asegurarse de que los valores de esas propiedades sean tratados como BOLEANOS en caso de que no estén definidos o sean valores falsy.
