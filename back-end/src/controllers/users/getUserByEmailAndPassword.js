/* 
! ESTE ARCHIVO DEFINE UN CONTROLLER cQUE MANEJA UNA SOLICITUD PARA AUTENTICAR UN USUARIO POR EMAIL Y PASSWORD

* Importaciones
? Importo User de archivo db */

const { User } = require("../../db");

/*
* getUserByEmailAndPassword es una función asíncrona que toma una solicitud (req) y una respuesta (res) como parámetros
? Obtiene el correo electrónico y la contraseña del cuerpo de la solicitud utilizando req.body
? Verifica que todos los campos requeridos estén presentes en el cuerpo de la solicitud
? Si falta algún campo, responde con un estado 400 (solicitud incorrecta) y un mensaje de error
? Utiliza el modelo User y el método findOne para buscar un usuario en la base de datos por su correo electrónico y contraseña.
? Si el usuario no se encuentra, responde con un estado 404 (no encontrado) y un objeto indicando que el acceso es falso.
? Verifica si la contraseña proporcionada no con la contraseña almacenada en la base de datos
? Si no coincide, responde con un estado 401 (no autorizado) y un mensaje de contraseña incorrecta, junto con los detalles del usuario.
? Si la autenticación es exitosa, responde con un estado 200 (éxito) y envía el objeto de usuario autenticado en la respuesta JSON.
? Si ocurre algún error durante el proceso, captura y maneja el error 
? Responde con un estado 500 (error interno del servidor)*/

const getUserByEmailAndPassword = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(req.body);

    if (!email || !password) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const user = await User.findOne({ where: { email, password } });

    console.log(user);
    console.log(user.id);

    if (!user) {
      return res.status(404).json({ access: false });
    }

    if (user.password !== password) {
      return res.status(401).json({ message: "Incorrect password" }, user);
    }

    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

/* 
! Exporto el controller getUserByEmailAndPassword */
module.exports = getUserByEmailAndPassword;
