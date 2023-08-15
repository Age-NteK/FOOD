/* 
! ESTE ARCHIVO DEFINE UN CONTROLADOR PARA ACTUALIZAR UNA DIETA

* Importaciones
? Importo Diet y User de archivo db */

const { Diet, User } = require("../../db");

/*
* updateDiet es una función asíncrona que toma una solicitud (req) y una respuesta (res) como parámetros
? Obtiene el userId y dietId de los parámetros de la solicitud utilizando req.params
? Utiliza el modelo User y el método findOne para buscar y recuperar un usuario en la base de datos por su ID.
? Utiliza el modelo Diet y el método findOne para buscar y recuperar una dieta en la base de datos por su ID.
? Si no se encuentra la dieta, responde con un estado 404 (no encontrado) y un mensaje de error.
? Si no se encuentra el user, responde con un estado 404 (no encontrado) y un mensaje de error.
? Si el cuerpo de la solicitud contiene un campo `name`, actualiza el nombre de la dieta.
? Guarda los cambios en la base de datos utilizando el método `save()`.
? Responde con un estado 200 (éxito) y un objeto JSON que contiene la dieta actualizada y el usuario asociado.
? Si ocurre algún error durante el proceso, captura y maneja el error.
? Responde con un estado 500 (error interno del servidor) y un mensaje de error. */

const updateDiet = async (req, res) => {
  try {
    const { userId, dietId } = req.params;

    // Buscar el usuario por el userId
    const user = await User.findOne({ where: { id: userId } });

    // Buscar la dieta por el dietId
    const diet = await Diet.findOne({ where: { id: dietId } });

    if (!diet) {
      return res.status(404).json({ error: `Diet ${dietId} Not Found` }); 
    }

    if (!user) {
      return res.status(404).json({ error: `User ${userId} Not Found` }); 
    }

    if (req.body.name) {
      diet.name = req.body.name;
    }

    await diet.save();

    res.status(200).json({ diet, user });
  } catch (error) {
    res.status(500).json({ error: "Error updating the Diet" });
  }
};

/* 
! Exporto el controlador updateDiet */
module.exports = updateDiet;
