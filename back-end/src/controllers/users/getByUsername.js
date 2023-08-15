/* 
! ESTE ARCHIVO DEFINE UN CONTROLADOR PARA OBTENER UN USUARIO POR SU NOMBRE DE USUARIO

* Importaciones
? Importo User de archivo db */

const { User } = require("../../db");

/*
* getByUsername es una función asíncrona que toma una solicitud (req) y una respuesta (res) como parámetros
? Obtiene el nombre de usuario del cuerpo de la solicitud utilizando req.body
? Verifica si el nombre de usuario se proporciona en el cuerpo de la solicitud.
? Si no se proporciona, responde con un estado 400 (solicitud incorrecta) y un mensaje de error.
? Utiliza el modelo User y el método findOne para buscar un usuario en la base de datos por su nombre de usuario.
? Si el usuario no se encuentra, responde con un estado 404 (no encontrado) y un mensaje de error.
? Verifica si el nombre de usuario proporcionado coincide con el nombre de usuario almacenado en la base de datos.
? Si no coincide, responde con un estado 401 (no autorizado) y un mensaje de nombre de usuario incorrecto, junto con los detalles del usuario.
? Si la autenticación es exitosa, responde con un estado 200 (éxito) y envía el objeto de usuario autenticado en la respuesta JSON.
? Si ocurre algún error durante el proceso, captura y maneja el error.
? Responde con un estado 500 (error interno del servidor) y un mensaje de error. */

const getByUsername = async (req, res) => {
  try {
    const { username } = req.body;
    console.log(req.body);

    if (!username) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const user = await User.findOne({ where: { username} });

    console.log(user);

    if (!user) {
      return res.status(404).json({ access: false });
    }

    if (user.username !== username) {
      return res.status(401).json({ message: "Incorrect username" }, user);
    }

    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

/* 
! Exporto el controlador getByUsername */
module.exports = getByUsername;