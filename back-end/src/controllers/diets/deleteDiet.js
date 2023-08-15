/*
! ESTE ARCHIVO DEFINE UN COTNROLLER PARA ELIMINAR UN DIETA

* Importaciones
? Importo Diet del archivo db
*/

const { Diet } = require("../../db");

/*
* deleteDiet es una función asincrónica que se utiliza para eliminar una Diet
? Obtiene el ID de la dieta de los parámetros de la solicitud utilizando req.params
? Utiliza el modelo Diet y el método findByPk para buscar y recuperar una dieta en la base de datos por su ID.
? Si no encuentra la dieta, lanza un error
? Utiliza el modelo Diet y el método destroy para eliminar la dieta de la base de datos por su ID.
? Si todo sale bien, responde con un estado 200 (éxito) y un mensaje de éxito.
? Si ocurre algún error durante el proceso, captura y maneja el error.
? Responde con un estado 500 (error interno del servidor) y un mensaje de error. */


const deleteDiet = async (req, res) => {
  try {
    const { id } = req.params;

    const dietToDelete = await Diet.findByPk(id);

    if (!dietToDelete) throw Error("Country Not Found");

    await Diet.destroy({
      where: {
        id: id,
      },
    });

    res.status(200).json(`The Diet ${id} was deleted succesfully`);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/* 
! Exporto el controlador deleteDiet */
module.exports = deleteDiet;
