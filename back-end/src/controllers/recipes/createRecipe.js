/* 
! ESTE ARCHIVO DEFINE UN CONTROLADOR PARA CREAR UNA NUEVA RECETA

* Importaciones
? Importo Recipe y Diet de archivo db */

const { Recipe, Diet, User } = require("../../db");

/*
* getDietsOfOneRecipe es una función asíncrona que toma una solicitud (req) y una respuesta (res) como parámetros
? Obtiene todos los campos obligatorios por req.body
? Verifica si existen todos datos obligatorios
? si no existen responde con un status 400 y un mensaje de error
? Utiliza el modelo User y el método findOne para buscar y recuperar un user en la base de datos por su ID.
? Si no encuentra el user responde con status 404 y un mensaje de error
? Si se encuantra el user se buscan las dietas en la base de datos por sus nombres y las crea si es que no existen
?  Se crea la nueva receta en la base de datos utilizando el modelo Recipe
? Se asocian las dietas a la receta
? Agregar el ID de la nueva receta al arreglo 'Recipes' del usuario
? Guardar el usuario en la base de datos para que se actualice el campo 'Recipes'
? Si todo sale bien, responde con un estado 201 (creada) y un objeto JSON que contiene un mensaje de éxito.
? Si ocurre algún error durante el proceso, captura y maneja el error.
? Responde con un estado 500 (error interno del servidor) y un mensaje de error. */

const createRecipe = async (req, res) => {

  const {
    title,
    summary,
    image,
    healthScore,
    steps,
    pricePerServing,
    diets,
    veryPopular,
    userId
  } = req.body;

  if (
    !title ||
    !summary ||
    !image ||
    !healthScore ||
    !steps ||
    typeof veryPopular !== "boolean" ||
    !pricePerServing ||
    !diets ||
    !userId
  ) {
    return res.status(400).json({ error: "Missing important data" });
  }

  try {
    const user = await User.findOne({ where: { id: userId } });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const existingDiets = await Promise.all(
      diets.map((name) => Diet.findOrCreate({ where: { name } }))
    );

  
    const newRecipe = await Recipe.create({
      title,
      summary,
      image,
      healthScore,
      steps,
      veryPopular,
      pricePerServing,
      createdBy: userId,
    });

    // Asociar las dietas a la receta por sus identificadores
    await newRecipe.setDiets(existingDiets.map((diet) => diet[0])); // diet[0] contiene el objeto dieta

    // Agregar el ID de la nueva receta al arreglo 'Recipes' del usuario
    user.Recipes.push(newRecipe.id);

    // Guardar el usuario en la base de datos para que se actualice el campo 'Recipes'
    await user.save();

    return res.status(201).send(`Recipe ${title} has been created succesfully`);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};


/* 
! Exporto el controlador createRecipe */
module.exports = createRecipe;