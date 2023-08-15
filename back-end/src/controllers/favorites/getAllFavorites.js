/* 
! ESTE ARCHIVO DEFINE UN CONTROLADOR PARA OBTENER TODAS LAS RECETAS FAVORITAS DE UN USUARIO

* Importaciones
? Importo Favorite y Recipe de archivo db */

const { Favorite, Recipe } = require("../../db");

/*
* getAllFavorites es una función asíncrona que toma una solicitud (req) y una respuesta (res) como parámetros
? Obtiene el ID del usuario de los parámetros de la solicitud utilizando req.params
? Busca y obtiene todas las recetas favoritas del usuario en la base de datos utilizando el modelo Favorite y el ID del usuario.
? Las recetas favoritas se obtienen junto con la información de la receta asociada utilizando la opción include con el modelo Recipe.
? Si se encuentran recetas favoritas, responde con un estado 200 (éxito) y un objeto JSON que contiene la lista de recetas favoritas.
? Si ocurre algún error durante el proceso, captura y maneja el error.
? Responde con un estado 500 (error interno del servidor) y un mensaje de error. */


const getAllFavorites = async (req, res) => {
  const { id } = req.params;
  try {
    const favorites = await Favorite.findAll({
      where: { UserId: id },
      include: Recipe,
    });

    return res.status(200).send(favorites);

  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

/* 
! Exporto el controlador getAllFavorites */
module.exports = getAllFavorites;