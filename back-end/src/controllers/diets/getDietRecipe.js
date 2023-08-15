/* 
! ESTE ARCHIVO DEFINE UN CONTROLADOR PARA OBTENER UNA DIETA Y SUS RECETAS RELACIONADAS

* Importaciones
? Importo Diet y Recipe de archivo db */

const { Diet, Recipe } = require("../../db");

/*
* getDietRecipe es una función asíncrona que toma una solicitud (req) y una respuesta (res) como parámetros
? Obtiene el ID de la dieta de los parámetros de la solicitud utilizando req.params
? Utiliza el modelo Diet y el método findByPk para buscar la dieta por su ID en mayúsculas y obtener sus recetas relacionadas.
? Utiliza el modelo Recipe como modelo asociado en la búsqueda para incluir las recetas relacionadas con la dieta.
? Utiliza el atributo `through` con `attributes: []` para no incluir los atributos de la tabla intermedia en el resultado.
? Si se encuentra la dieta, responde con un estado 200 (éxito) y un objeto JSON que contiene la dieta y sus recetas relacionadas.
? Si no se encuentra la dieta, responde con un estado 404 (no encontrado) y un mensaje de error.
? Si ocurre algún error durante el proceso, captura y maneja el error.
? Responde con un estado 500 (error interno del servidor) y un mensaje de error. */

const getDietRecipe = async (req, res) => {
  try {
    const { id } = req.params;
    
    const diet = await Diet.findByPk(id.toUpperCase(), {
      include: {
        model: Recipe,
        through: { attributes: [] }, // Para no incluir los atributos de la tabla intermedia
      },
    });

    if (!diet) {
      return res.status(404).json({ message: "Diet not found" });
    }

    return res.status(200).json(diet);
  } catch (error) {
    console.error("Error in getDietRecipe:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

/* 
! Exporto el controlador getDietRecipe */
module.exports = getDietRecipe;


 




