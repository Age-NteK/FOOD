/* 
! ESTE ARCHIVO DEFINE UN CONTROLADOR PARA ACTUALIZAR UNA RECETA

* Importaciones
? Importo Recipe y Diet de archivo db */

const { Recipe, Diet } = require("../../db");

/*
* updateRecipe es una función asíncrona que toma una solicitud (req) y una respuesta (res) como parámetros
? Obtiene el ID de la receta de los parámetros de la solicitud utilizando req.params
? Utiliza el modelo Recipe y el método findOne para buscar y recuperar una receta en la base de datos por su ID.
? Si la receta no se encuentra, responde con un estado 404 (no encontrado) y un mensaje de error.
? Actualiza las propiedades de la receta en función de los campos proporcionados en el cuerpo de la solicitud.
? Asocia las dietas adecuadas a la receta si el campo 'diets' se proporciona en el cuerpo de la solicitud.
? Filtra y busca las dietas existentes en la base de datos por sus nombres.
? Asocia las dietas encontradas a la receta.
? Guarda la receta actualizada en la base de datos.
? Responde con un estado 200 (éxito) y la receta actualizada como objeto JSON.
? Si ocurre algún error durante el proceso, captura y maneja el error.
? Responde con un estado 500 (error interno del servidor) y un mensaje de error. */


const updateRecipe = async (req, res) => {
  try {
    const { id } = req.params;

    const recipe = await Recipe.findOne({ where: { id } });

    if (!recipe) {
      return res.status(404).json({ error: "Receta Not Found" });
    }

    // Update the recipe properties based on the request body fields
    if (req.body.title) {
      recipe.title = req.body.title;
    }
    if (req.body.summary) {
      recipe.summary = req.body.summary;
    }
    if (req.body.vegan !== undefined) {
      recipe.vegan = req.body.vegan;
    }
    if (req.body.vegetarian !== undefined) {
      recipe.vegetarian = req.body.vegetarian;
    }
    if (req.body.glutenFree !== undefined) {
      recipe.glutenFree = req.body.glutenFree;
    }
    if (req.body.veryPopular !== undefined) {
      recipe.veryPopular = req.body.veryPopular;
    }
    if (req.body.dairyFree !== undefined) {
      recipe.dairyFree = req.body.dairyFree;
    }
    if (req.body.image) {
      recipe.image = req.body.image;
    }
    if (req.body.healthScore !== undefined) {
      recipe.healthScore = req.body.healthScore;
    }
    if (req.body.steps) {
      recipe.steps = req.body.steps;
    }
    if (req.body.pricePerServing !== undefined) {
      recipe.pricePerServing = req.body.pricePerServing;
    }

    // DIETS
    // Asocia las dietas adecuadas a la receta si 'diets' field is provided in the request body
    if (req.body.diets && Array.isArray(req.body.diets)) {
      // Filtra los elementos duplicados en el array de nombres de dietas
      const uniqueDietNames = [...new Set(req.body.diets)];

      // Busca las dietas existentes en la base de datos por sus nombres
      const existingDiets = await Diet.findAll({
        where: { name: uniqueDietNames },
      });

      // Asocia las dietas encontradas a la receta
      recipe.setDiets(existingDiets);
    }

    // Guarda la receta actualizada en la base de datos
    await recipe.save();

    // Retorna la receta actualizada como respuesta
    res.json(recipe);
  } catch (error) {
    console.error("Error al actualizar la receta:", error);
    res.status(500).json({ error: "Error al actualizar la receta" });
  }
};

/* 
! Exporto el controlador updateRecipe */
module.exports = updateRecipe;