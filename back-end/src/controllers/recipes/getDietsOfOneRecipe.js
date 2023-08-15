/* 
! ESTE ARCHIVO DEFINE UN CONTROLADOR PARA OBTENER LAS DIETAS DE UNA RECETA ESPECÍFICA

* Importaciones
? Importo Diet y Recipe de archivo db */

const { Diet, Recipe } = require("../../db");

/*
* getDietsOfOneRecipe es una función asíncrona que toma una solicitud (req) y una respuesta (res) como parámetros
? Obtiene el ID de la receta de los parámetros de la solicitud utilizando req.params
? Utiliza el modelo Recipe y el método findByPk para buscar y recuperar una receta en la base de datos por su ID.
? La opción include se utiliza para cargar las dietas asociadas a la receta utilizando el modelo Diet.
? Si la receta no se encuentra, responde con un estado 404 (no encontrado) y un mensaje de error.
? Extrae las dietas de la receta y filtra las duplicadas utilizando un Set.
? Convierte el Set en un array de objetos únicos de dietas.
? Responde con un estado 200 (éxito) y un objeto JSON que contiene las dietas únicas asociadas a la receta.
? Si ocurre algún error durante el proceso, captura y maneja el error.
? Responde con un estado 500 (error interno del servidor) y un mensaje de error. */


const getDietsOfOneRecipe = async (req, res) => {
  try {
    const { id } = req.params;
    const recipe = await Recipe.findByPk(id, {
      include: {
        model: Diet,
      },
    });

    if (!recipe) {
      return res.status(404).json({ error: "Receta no encontrada" });
    }

    const diets = recipe.Diets;

    // Create a Set to filter out the duplicate diets
    const uniqueDietsSet = new Set(diets.map((diet) => diet.name));

    // Convert the Set back to an array
    const uniqueDiets = Array.from(uniqueDietsSet, (dietName) => ({
      name: dietName,
    }));

    res.json(uniqueDiets);
  } catch (error) {
    console.error("Error al obtener las dietas:", error);
    res.status(500).json({ error: "Error al obtener las dietas" });
  }
};

/* 
! Exporto el controlador getDietsOfOneRecipe */
module.exports = getDietsOfOneRecipe;