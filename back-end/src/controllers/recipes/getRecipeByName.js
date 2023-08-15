/* 
! ESTE ARCHIVO DEFINE UN CONTROLADOR PARA BUSCAR RECETAS POR SU NOMBRE

* Importaciones
? Importo Recipe y Diet de archivo db
? Importo el operador Op de Sequelize para realizar operaciones de comparación */

const { Recipe, Diet } = require("../../db");
const { Op } = require("sequelize");

/*
* getRecipeByName es una función asíncrona que toma una solicitud (req) y una respuesta (res) como parámetros
? Obtiene el title de la receta de los parámetros de la solicitud utilizando req.query
? Utiliza el modelo Recipe y el operador Op para realizar una búsqueda en la base de datos.
? Realiza una búsqueda que incluye recetas con el título exacto o parcial que coincida con el nombre proporcionado.
? Si se encuentran recetas, responde con un estado 200 (éxito) y un objeto JSON que contiene la lista de recetas.
? Si no se encuentran recetas, no se envía ninguna respuesta.
? Si ocurre algún error durante el proceso, captura y maneja el error.
? Responde con un estado 400 (solicitud incorrecta) y un mensaje de error. */

const getRecipeByName = async (req, res) => {
  try {
    const { title } = req.query;

    const searchRecipe = await Recipe.findAll({
      where: {
        [Op.or]: [
          { title: { [Op.eq]: title } },
          { title: { [Op.iLike]: `%${title}%` } },
        ],
      },
    });

    if (searchRecipe) {
      console.log(searchRecipe);
      res.status(200).json({ searchRecipe });
    }
  } catch (error) {
    return res
      .status(400)
      .json({ message: "Error occurred while searching for recipe" });
  }
};

/* 
! Exporto el controlador getRecipeByName */
module.exports = getRecipeByName;
