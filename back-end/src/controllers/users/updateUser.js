/* 
! ESTE ARCHIVO DEFINE UN CONTROLADOR PARA ACTUALIZAR LA INFORMACIÓN DE UN USUARIO

* Importaciones
? Importo User de archivo db */

const { User } = require("../../db");

/*
* updateUser es una función asíncrona que toma una solicitud (req) y una respuesta (res) como parámetros
? Obtiene el ID del usuario de los parámetros de la solicitud utilizando req.params
? Obtiene los campos a actualizar del cuerpo de la solicitud utilizando req.body
? Utiliza el modelo User y el método findOne para buscar un usuario en la base de datos por su ID.
? Si el usuario no se encuentra, responde con un estado 404 (no encontrado) y un mensaje de error.
? Actualiza los campos del usuario con los valores proporcionados en el cuerpo de la solicitud.
? Guarda los cambios en la base de datos utilizando el método save().
? Responde con un estado 200 (éxito) y el objeto de usuario actualizado.
? Si ocurre algún error durante el proceso, captura y maneja el error.
? Responde con un estado 500 (error interno del servidor) y un mensaje de error. */

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { username, email, password, firstName, lastName, phoneNumber } = req.body;
    const user = await User.findOne({ where: { id } });

    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    if (username) {
      user.username = username;
    }
    if (email) {
      user.email = email;
    }
    if (password) {
      user.password = password;
    }
    if (firstName) {
      user.firstName = firstName;
    }
    if (lastName) {
      user.lastName = lastName;
    }

    if (phoneNumber) {
      user.phoneNumber = phoneNumber;
    }

    await user.save();

    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

/* 
! Exporto el controlador updateUser */
module.exports = updateUser;