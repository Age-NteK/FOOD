/* 
! ESTE ARCHIVO DEFINE UN CONTROLADOR PARA OBTENER UNA DIETA POR SU ID

* Importaciones
? Importo Recipe y Diet de archivo db */

const { Diet } = require("../../db");

/*
* getDietById es una función asíncrona que toma una solicitud (req) y una respuesta (res) como parámetros
? Obtiene el ID de la dieta de los parámetros de la solicitud utilizando req.params
? Utiliza el modelo Diet y el método findByPk para buscar la dieta por su ID en mayúsculas en la base de datos
? Garantiza que se busque correctamente en la base de datos incluso si el ID se proporcionó en minúsculas
? Si no se encuentra la dieta, responde con un estado 404 (no encontrado) y un mensaje de error
? Devuelve la dieta encontrada en un estado 200 (éxito)
? Si ocurre algún error durante el proceso, captura y maneja el error.
? Responde con un estado 500 (error interno del servidor) y un mensaje de error. */


const getDietById = async (req, res) => {
  try {
    const { id } = req.params;

    const diet = await Diet.findByPk(id.toUpperCase());

    if (!diet) {
      return res.status(404).json({ message: "Diet not found" });
    }

    return res.status(200).json( diet );
  } catch (error) {
    console.error("Error in getDietById:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

/* 
! Exporto el controlador getDietById */
module.exports = getDietById;
