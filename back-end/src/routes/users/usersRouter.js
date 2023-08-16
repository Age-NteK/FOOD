/*
! ESTE ARCHIVO DEFINE CÓMO LAS SOLICITUDES HTTP DEBEN SER MANEJADAS Y QUÉ FUNCIONES DE CONTROLADOR SE DEBEN EJECUTAR PARA CADA RUTA. CADA RUTA SE ASOCIA A UNA FUNCIÓN ESPECÍFICA QUE REALIZA UNA ACCIÓN CORRESPONDIENTE, COMO OBTENER INFORMACIÓN DE USUARIOS, REGISTRAR NUEVOS USUARIOS, ACTUALIZAR DETALLES DE USUARIOS O ELIMINAR USUARIOS.

* Importaciones
? Creo una instancia de Router que llamo UserRouter
? Importo los controladores para manejar las diferentes funciones relacionadas con usuarios */
const express = require("express");
const usersRouter = express.Router();
const getUserByEmailAndPassword = require("../../controllers/users/getUserByEmailAndPassword");
const registerUser = require("../../controllers/users/registerUser");
const getAllUsers = require("../../controllers/users/getAllUsers");
const getByUsername = require("../../controllers/users/getByUsername");
const updateUser = require("../../controllers/users/updateUser");
const getMyRecipes = require("../../controllers/users/getMyRecipes");
const getUserById = require("../../controllers/users/getUserById");
const deleteUser = require("../../controllers/users/deleteUser");

/*
* Se definen las rutas y asocia las funciones de controlador correspondientes */

// Obtiene recetas de un usuario específico por su ID
usersRouter.get("/:id", getMyRecipes);

// Obtiene todos los usuarios
usersRouter.get("/", getAllUsers);

// Obtiene el perfil de un usuario por su ID
usersRouter.get("/profile/:id", getUserById);

// Obtiene un usuario por su nombre de usuario
usersRouter.post("/profile", getByUsername);

// Obtiene un usuario por correo electrónico y contraseña
usersRouter.post("/", getUserByEmailAndPassword);

 // Registra un nuevo usuario
usersRouter.post("/register", registerUser);

// Actualiza los detalles de un usuario por su ID
usersRouter.put("/:id", updateUser);

 // Elimina un usuario por su ID
usersRouter.delete("/:id", deleteUser);


/*
! Exporto la instancia usersRouter */
module.exports = usersRouter;
