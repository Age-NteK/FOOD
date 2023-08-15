/* 
! ESTE ARCHIVO DEFINE UN CONTROLADOR PARA CREAR UNA NUEVA DIETA

* Importaciones
? Importo Diet y User de archivo db */

const { Diet, User } = require("../../db");

/*
* createDiet es una función asíncrona que toma una solicitud (req) y una respuesta (res) como parámetros
? Obtiene el ID del usuario y el nombre de la dieta de los parámetros de la solicitud utilizando req.body
? Verifica si existen el ID del usuario y el nombre de la dieta
? Si no existen, responde con un estado 400 y un mensaje de error
? Utiliza el modelo User y el método findOne para buscar y recuperar un user en la base de datos por su ID.
? Si no encuentra el user, responde con un estado 404 y un mensaje de error
? Crea la nueva dieta en la base de datos utilizando el modelo Diet y el nombre de la dieta
? Asocia la nueva dieta al usuario utilizando el método addDiet del modelo User
? Si todo sale bien, responde con un estado 200 (éxito) y un objeto JSON que contiene el ID y el nombre de la nueva dieta.
? Si ocurre algún error durante el proceso, captura y maneja el error.
? Responde con un estado 400 (solicitud incorrecta) y un mensaje de error. */

const createDiet = async (req, res) => {
  const { userId, name } = req.body;

  if (!userId || !name) {
    return res.status(400).json({ error: "Missing user ID or diet name" });
  }

  try {

    const user = await User.findOne({ where: { id: userId } });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    
    const newDiet = await Diet.create({ name });

    // Asociar la nueva dieta al usuario
    await user.addDiet(newDiet);

    return res.status(200).json({ id: newDiet.id, name: newDiet.name });

  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

/* 
! Exporto el controlador createDiet */
module.exports = createDiet;
