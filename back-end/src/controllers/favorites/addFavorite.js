/* 
! ESTE ARCHIVO DEFINE UN CONTROLADOR PARA AGREGAR UNA RECETA A FAVORITOS

* Importaciones
? Importo Favorite de archivo db */

const { Favorite } = require("../../db");

/*
* addFavorite es una función asíncrona que toma una solicitud (req) y una respuesta (res) como parámetros
? Obtiene los IDs de la receta y el usuario de los parámetros de la solicitud utilizando req.params
? Crea un nuevo registro en la tabla Favorite en la base de datos utilizando el modelo Favorite y los IDs de receta y usuario.
? Responde con un estado 200 (éxito) y el objeto de la Favorite creado.
? Si ocurre algún error durante el proceso, captura y maneja el error.
? Responde con un estado 400 (solicitud incorrecta) y un mensaje de error. */

const addFavorite = async (req, res) => {
  const { recipeId, userId } = req.params;

  try {
    const favorite = await Favorite.create({
      RecipeId: recipeId,
      UserId: userId,
    });

    console.log(`Recipe ${recipeId} was favorite added successfully!`);
    return res.status(200).send(favorite);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

/* 
! Exporto el controlador addFavorite */
module.exports = addFavorite;
