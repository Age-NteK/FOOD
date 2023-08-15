/* 
! ESTE ARCHIVO DEFINE UN CONTROLADOR PARA ELIMINAR UNA RECETA

* Importaciones
? Importo Recipe de archivo db */

const { Recipe } = require("../../db");

/*
* deleteRecipe es una función asíncrona que toma una solicitud (req) y una respuesta (res) como parámetros
? Obtiene el ID de la receta de los parámetros de la solicitud utilizando req.params
? Utiliza el modelo Recipe y el método findByPk para buscar y recuperar una receta en la base de datos por su ID.
? Si no encuentra la receta, lanza un error.
? Si la receta se encuentra, se utiliza el método destroy para eliminar la receta de la base de datos.
? Responde con un estado 200 (éxito) y un mensaje de éxito.
? Si ocurre algún error durante el proceso, captura y maneja el error.
? Responde con un estado 500 (error interno del servidor) y un mensaje de error. */


const deleteRecipe = async (req, res) => {
  try {
    const { id } = req.params;

    const recipeToDelete = await Recipe.findByPk(id);

    if (!recipeToDelete) throw Error("Country Not Found");

    await Recipe.destroy({
      where: {
        id: id,
      },
    });

    res.status(200).json(`The Recipe ${id} was deleted succesfully`);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/* 
! Exporto el controlador deleteRecipe */
module.exports = deleteRecipe;
