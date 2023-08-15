/* 
! ESTE ARCHIVO DEFINE UN CONTROLADOR PARA OBTENER TODOS LOS USUARIOS JUNTO CON SUS RECETAS ASOCIADAS

* Importaciones
? Importo User y Recipe de archivo db */

const { User } = require("../../db");

/*
* getAllUsers es una función asíncrona que toma una solicitud (req) y una respuesta (res) como parámetros
? Utiliza el modelo User y el método findAll para buscar y recuperar todos los usuarios en la base de datos.
? Si no se encuentran usuarios, se lanza un error.
? Responde con un estado 200 (éxito) y un objeto JSON que contiene la lista de usuarios junto con sus recetas asociadas.
? Si ocurre algún error durante el proceso, captura y maneja el error.
? Responde con un estado 500 (error interno del servidor) y un mensaje de error. */

const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();

    if (!users) throw Error("Users Not Found");

    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

/* 
! Exporto el controlador getAllUsers */
module.exports = getAllUsers;
