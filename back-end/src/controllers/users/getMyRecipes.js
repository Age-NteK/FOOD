/* 
! ESTE ARCHIVO DEFINE UN CONTROLLER PARA OBTENER LAS RECIPES ASOCIADAS A UN USUARIO ESPECÍFICO

* Importaciones
? Importo User y Recipe de archivo db */

const { User, Recipe } = require("../../db");

/*
* getMyRecipes es una función asíncrona que toma una solicitud (req) y una respuesta (res) como parámetros
? Obtiene el ID del usuario de los parámetros de la solicitud utilizando req.params
? Verifica si el ID del usuario se proporciona
? Si falta, responde con un estado 400 (solicitud incorrecta) y un mensaje de error.
? Utiliza el modelo User y el método findOne para buscar un usuario en la base de datos por su ID. 
? También utiliza la opción include para cargar las recetas asociadas a ese usuario utilizando el modelo Recipe.
? Si el usuario no se encuentra, responde con un estado 404 (no encontrado) y un mensaje de error.
? Si el usuario se encuentra, las recetas asociadas a ese usuario estarán disponibles en la propiedad user.Recipes.
? Responde con un objeto JSON que contiene las recetas asociadas al usuario bajo la clave userRecipes.
? Si ocurre algún error durante el proceso, captura y maneja el error 
? Responde con un estado 500 (error interno del servidor)*/

const getMyRecipes = async (req, res) => {
  try {
    const { id } = req.params; 
    console.log(req.params);

    if (!id) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const user = await User.findOne({
      where: { id: id },
      include: [{ model: Recipe }],
    });

    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    // console.log("Recetas asociadas al usuario:", user.Recipes);
    res.json({ userRecipes: user.Recipes });
  } catch (error) {
    console.error("Error al obtener las recetas del usuario:", error);
    res.status(500).json({ error: "Error al obtener las recetas del usuario" });
  }
};

/* 
! Exporto el controller getMyRecipes */
module.exports = getMyRecipes;
