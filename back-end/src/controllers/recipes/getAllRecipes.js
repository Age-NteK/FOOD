/* 
! ESTE ARCHIVO DEFINE UN CONTROLADOR PARA OBTENER TODAS LAS RECETAS JUNTO CON SUS DIETAS ASOCIADAS

* Importaciones
? Importo Recipe y Diet de archivo db */

const { Recipe, Diet } = require("../../db");

/*
* getAllRecipes es una función asíncrona que toma una solicitud (req) y una respuesta (res) como parámetros
? Utiliza el modelo Recipe y el método findAll para buscar y recuperar todas las recetas en la base de datos.
? La opción include se utiliza para cargar las dietas asociadas a cada receta utilizando el modelo Diet.
? Si no se encuentran recetas, se lanza un error.
? Responde con un estado 200 (éxito) y un objeto JSON que contiene la lista de recetas junto con sus dietas asociadas.
? Si ocurre algún error durante el proceso, captura y maneja el error.
? Responde con un estado 500 (error interno del servidor) y un mensaje de error. */

const getAllRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.findAll({
      include: { model: Diet },
    });

    if (!recipes) throw Error("Recipes Not Found");

    return res.status(200).json(recipes);

  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

/* 
! Exporto el controlador getAllRecipes */
module.exports = getAllRecipes;
