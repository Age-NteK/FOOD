/* 
! ESTE ARCHIVO DEFINE UN CONTROLADOR PARA ELIMINAR UNA DIETA DE UNA RECETA PARTICULAR

* Importaciones
? Importo Diet y Recipe de archivo db */

const { Diet, Recipe } = require("../../db");

/*
* removeDietFromRecipe es una función asíncrona que toma una solicitud (req) y una respuesta (res) como parámetros
? Obtiene el ID de la receta de los parámetros de la solicitud utilizando req.params
? Obtiene el nombre de la dieta a eliminar de los datos de la solicitud utilizando req.body
? Utiliza el modelo Recipe y el método findByPk para buscar y recuperar una receta en la base de datos por su ID.
? Incluye las dietas asociadas a la receta en la búsqueda
? Si no encuentra la receta, responde con un estado 404 (no encontrado) y un mensaje de error
? Busca la dieta a eliminar por nombre en las dietas asociadas a la receta
? Si no encuentra la dieta a eliminar, responde con un estado 404 (no encontrado) y un mensaje de error
? Utiliza el método removeDiet para eliminar la asociación entre la receta y la dieta
? Obtiene la lista actualizada de dietas para la receta después de la eliminación
? Responde con un estado 200 (éxito) y la lista actualizada de dietas para la receta
? Si ocurre algún error durante el proceso, captura y maneja el error.
? Responde con un estado 500 (error interno del servidor) y un mensaje de error. */

const removeDietFromRecipe = async (req, res) => {
  try {
    const { id } = req.params;
    const { dietName } = req.body;

    const recipe = await Recipe.findByPk(id, {
      include: Diet,
    });

    if (!recipe) {
      return res.status(404).json({ error: "Recipe not found" });
    }

    const dietToRemove = recipe.Diets.find((diet) => diet.name === dietName);

    if (!dietToRemove) {
      return res.status(404).json({ error: "Diet not found" });
    }

    // Remover la asociación entre Recipe y Diet
    await recipe.removeDiet(dietToRemove);

    // Obtener la lista de diets de la recipe después de la eliminación
    const updatedDiets = await recipe.getDiets();

    res.json(updatedDiets);
  } catch (error) {
    console.error("Error while removing the diet:", error);
    res.status(500).json({ error: "Error while removing the diet" });
  }
};

/* 
! Exporto el controlador removeDietFromRecipe */
module.exports = removeDietFromRecipe;
