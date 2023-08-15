/* 
! ESTE ARCHIVO DEFINE UN CONTROLADOR PARA ELIMINAR UN USUARIO

* Importaciones
? Importo User de archivo db */

const { User } = require("../../db");

/*
* deleteUser es una función asíncrona que toma una solicitud (req) y una respuesta (res) como parámetros
? Obtiene el ID del usuario de los parámetros de la solicitud utilizando req.params
? Utiliza el modelo User y el método findOne para buscar un usuario en la base de datos por su ID.
? Si el usuario no se encuentra, se lanza un error.
? Elimina el usuario encontrado de la base de datos utilizando el método destroy().
? Responde con un estado 200 (éxito) y un mensaje de éxito que indica qué usuario se eliminó.
? Si ocurre algún error durante el proceso, captura y maneja el error.
? Responde con un estado 404 (no encontrado) y un mensaje de error. */

const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const userToDelete = await User.findOne({ where: { id } });
    if (!userToDelete) throw new Error("User not found");

    await userToDelete.destroy();

    return res.status(200).json({
      message: `The user ${userToDelete.id} was deleted successfully.`,
    });
  } catch (error) {
    return res.status(404).send(error.message);
  }
};

/* 
! Exporto el controlador deleteUser */
module.exports = deleteUser;