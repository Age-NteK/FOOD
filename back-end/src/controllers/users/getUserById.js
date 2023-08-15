/* 
! ESTE ARCHIVO DEFINE UN CONTROLLER PARA OBTENER UN USER POR ID

* Importaciones
? Importo User de archivo db */

const { User } = require("../../db");

/*
* getUserById es una función asíncrona que toma una solicitud (req) y una respuesta (res) como parámetros
? Obtiene el ID del usuario de los parámetros de la solicitud utilizando req.params
? Verifica que el ID esté presente en el cuerpo de la solicitud
? Si no está presente  responde con un estado 400 (solicitud incorrecta) y un mensaje de error
? Utiliza el modelo User y el método findOne para buscar un usuario en la base de datos en la columna ID.
? Si el usuario no se encuentra, responde con un estado 404 (no encontrado) y un objeto indicando que el acceso es falso.
? Si el usuario se encuentra, responde con un estado 200 (éxito) y envía el objeto de usuario encontrado en la respuesta JSON
? Si ocurre algún error durante el proceso, captura y maneja el error 
? Responde con un estado 500 (error interno del servidor)*/

const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(`UserID: ${id}`);

    if (!id) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const user = await User.findOne({ where: { id } });

    // console.log(user);

    if (!user) {
      return res.status(404).json({ access: false });
    }

    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

/* 
! Exporto el controller getUserById */
module.exports = getUserById;
