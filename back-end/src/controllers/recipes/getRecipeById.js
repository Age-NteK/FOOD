/* 
! ESTE ARCHIVO DEFINE UN CONTROLADOR PARA OBTENER UNA RECETA POR SU ID

* Importaciones
? Importo Recipe y Diet de archivo db */

const { Recipe, Diet } = require("../../db");

/*
* getRecipeById es una función asíncrona que toma una solicitud (req) y una respuesta (res) como parámetros
? Obtiene el ID de la receta de los parámetros de la solicitud utilizando req.params
? Utiliza el modelo Recipe y el método findByPk para buscar y recuperar una receta en la base de datos por su ID.
? La opción include se utiliza para cargar las dietas asociadas a la receta utilizando el modelo Diet.
? Si no se encuentra la receta, responde con un estado 404 (no encontrado) y un mensaje de error.
? Responde con un estado 200 (éxito) y un objeto JSON que contiene los detalles de la receta junto con las dietas asociadas.
? Si ocurre algún error durante el proceso, captura y maneja el error.
? Responde con un estado 500 (error interno del servidor) y un mensaje de error. */

const getRecipeById = async (req, res) => {
  try {
    const { id } = req.params;

    const searchRecipe = await Recipe.findByPk(id.toUpperCase(), {
      include: { model: Diet },
    });

    if (!searchRecipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    return res.status(200).json({ searchRecipe });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

/* 
! Exporto el controlador getRecipeById */
module.exports = getRecipeById;
