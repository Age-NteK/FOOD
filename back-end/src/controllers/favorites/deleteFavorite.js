/* 
! ESTE ARCHIVO DEFINE UN CONTROLADOR PARA ELIMINAR UNA RECETA DE FAVORITOS

* Importaciones
? Importo Favorite de archivo db */

const { Favorite } = require("../../db");

/*
* deleteFavorite es una función asíncrona que toma una solicitud (req) y una respuesta (res) como parámetros
? Obtiene los IDs del usuario y la receta de los parámetros de la solicitud utilizando req.params
? Elimina un registro de la tabla Favorite en la base de datos utilizando el modelo Favorite y los IDs de usuario y receta.
? Responde con un estado 200 (éxito) y un mensaje de confirmación.
? Si ocurre algún error durante el proceso, captura y maneja el error.
? Responde con un estado 500 (error interno del servidor) y un mensaje de error. */

const deleteFavorite = async (req, res) => {
  try {
    const { userId, recipeId } = req.params;

    await Favorite.destroy({ where: { UserId: userId, RecipeId: recipeId } });

    res.json({ message: `Recipe ${recipeId} was deleted successfully` });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "Error al eliminar la receta de las favoritas." });
  }
};

/* 
! Exporto el controlador deleteFavorite */
module.exports = deleteFavorite;
