/* 
! ESTE ARCHIVO DEFINE UN CONTROLLER PARA EL REGISTRO DE NUEVOS USUARIOS

* Importaciones
? Importo User de archivo db */

const { User } = require("../../db");

/*
* RegisterUser es una función asíncrona que toma una solicitud (req) y una respuesta (res) como parámetros
? Verifica que todos los campos requeridos estén presentes en el cuerpo de la solicitud
? Si falta algún campo, responde con un estado 400 (solicitud incorrecta) y un mensaje de error
? Utiliza el modelo User para crear un nuevo usuario en la base de datos utilizando los datos proporcionados en el cuerpo de la solicitud
? Responde con un estado 201 (creado)
? Envía el nuevo usuario creado junto con su ID en la respuesta JSON
? Útil para acceder al ID del usuario en otras partes de la aplicación 
? Si ocurre algún error durante el proceso, captura y maneja el error 
? Responde con un estado 500 (error interno del servidor)*/

const registerUser = async (req, res) => {
  try {
    const { username, email, password, firstName, lastName, phoneNumber } = req.body;

    if (!username || !email || !password || !firstName || !lastName || !phoneNumber) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const newUser = await User.create({
      username,
      email,
      password,
      firstName,
      lastName,
      phoneNumber,
    });


    res.status(201).json({ user: newUser, userId: newUser.id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

/* 
! Exporto el controller registerUser */
module.exports = registerUser;