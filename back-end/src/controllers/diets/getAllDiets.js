/* 
! ESTE ARCHIVO DEFINE UN CONTROLADOR PARA OBTENER TODAS LAS DIETAS ÚNICAS

* Importaciones
? Importo Diet de archivo db */

const { Diet } = require("../../db");

/*
* getAllDiets es una función asíncrona que toma una solicitud (req) y una respuesta (res) como parámetros
? Utiliza el modelo Diet y el método findAll para obtener todos los registros de la tabla Diet en la base de datos
? Verifica si se obtuvieron dietas válidas como un arreglo
? Si no se obtuvieron dietas, responde con un estado 404 (no encontrado) y un mensaje de error
? Utiliza un conjunto (Set) para almacenar las dietas únicas
? Recorre todas las dietas y las agrega al conjunto
? Convierte el conjunto en un arreglo de dietas únicas
? Asigna un ID único a cada dieta basado en el índice + 1
? Devuelve el arreglo de dietas con IDs como resultado en un estado 200 (éxito)
? Si ocurre algún error durante el proceso, captura y maneja el error.
? Responde con un estado 500 (error interno del servidor) y un mensaje de error. */


const getAllDiets = async (req, res) => {
  try {

    const diets = await Diet.findAll();

    // Verificar si se obtuvieron dietas válidas como array
    if (!Array.isArray(diets)) {
      return res.status(404).json({ message: "No se encontraron dietas." });
    }

    // Utilizar un conjunto (Set) para almacenar las dietas únicas
    const uniqueDietsSet = new Set();

    // Recorrer todas las dietas y agregarlas al conjunto
    diets.forEach((diet) => {
      uniqueDietsSet.add(diet.name);
    });

    // Convertir el conjunto en un arreglo
    const uniqueDiets = Array.from(uniqueDietsSet);

    // Agregar un ID a cada dieta basado en el índice + 1
    const dietsWithIds = uniqueDiets.map((diet, index) => ({
      id: index + 1,
      name: diet,
    }));

    // Devolver el arreglo de dietas con IDs como resultado
    return res.status(200).json(dietsWithIds);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

/* 
! Exporto el controlador getAllDiets */
module.exports = getAllDiets;
