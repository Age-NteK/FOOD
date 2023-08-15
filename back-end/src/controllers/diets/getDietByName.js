/* 
! ESTE ARCHIVO DEFINE UN CONTROLADOR PARA BUSCAR UNA DIETA POR SU NOMBRE

* Importaciones
? Importo Diet de archivo db
? Importo el operador Op de Sequelize para realizar operaciones de comparación */

const { Diet } = require("../../db");
const { Op } = require("sequelize");

/*
* getDietByName es una función asíncrona que toma una solicitud (req) y una respuesta (res) como parámetros
? Obtiene el nombre de la dieta de los parámetros de la solicitud utilizando req.query
? Utiliza el modelo Diet y el operador Op para realizar una búsqueda en la base de datos.
? Realiza una búsqueda que incluye dietas con el nombre exacto o parcial que coincida con el nombre proporcionado.
? Si se encuentran dietas, responde con un estado 200 (éxito) y un objeto JSON que contiene la lista de dietas.
? Si no se encuentran dietas, responde con un estado 404 (no encontrado) y un mensaje de error.
? Si ocurre algún error durante el proceso, captura y maneja el error.
? Responde con un estado 400 (solicitud incorrecta) y un mensaje de error. */

const getDietByName = async (req, res) => {
  try {
    const { name } = req.query;
    console.log(req.body)

    const searchDiet = await Diet.findAll({
      where: {
        [Op.or]: [
          { name: { [Op.eq]: name } },
          { name: { [Op.iLike]: `%${name}%` } },
        ],
      },
    });

    if (searchDiet) {
      res.status(200).json({searchDiet});
    }
  } catch (error) {
    return res
      .status(400)
      .json({ message: "Error occurred while searching for Diet" });
  }
};


/* 
! Exporto el controlador getDietByName */
module.exports = getDietByName;