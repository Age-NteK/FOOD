/* 
! ESTE ARCHIVO DEFINE UN CONTROLADOR PARA OBTENER LAS DIETAS DE UN USUARIO

* Importaciones
? Importo User y Diet de archivo db */

const { User, Diet } = require("../../db");

/*
* getMyDiets es una función asíncrona que toma una solicitud (req) y una respuesta (res) como parámetros
? Obtiene el ID del usuario de los parámetros de la solicitud utilizando req.params
? Verifica si se proporciona el ID del usuario. Si no se proporciona, responde con un estado 400 (solicitud incorrecta) y un mensaje de error.
? Utiliza el modelo User y el método findOne para buscar y recuperar un usuario en la base de datos por su ID.
? Utiliza el atributo `include` para incluir las dietas asociadas al usuario en la búsqueda.
? Si no se encuentra el usuario, responde con un estado 404 (no encontrado) y un mensaje de error.
? Las dietas asociadas al usuario se encontrarán en `user.Diets`.
? Responde con un estado 200 (éxito) y un objeto JSON que contiene las dietas asociadas al usuario.
? Si ocurre algún error durante el proceso, captura y maneja el error.
? Responde con un estado 500 (error interno del servidor) y un mensaje de error. */

const getMyDiets = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Busca el usuario por su ID en la base de datos junto con sus dietas asociadas
    const user = await User.findOne({
      where: { id: id },
      include: [{ model: Diet }],
    });

    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    // Las dietas asociadas al usuario estarán disponibles en user.Diets
    // console.log("Dietas asociadas al usuario:", user.Diets);
    res.json({ userDiets: user.Diets });
  } catch (error) {
    console.error("Error al obtener las dietas del usuario:", error);
    res.status(500).json({ error: "Error al obtener las dietas del usuario" });
  }
};

/* 
! Exporto el controlador getMyDiets */
module.exports = getMyDiets;