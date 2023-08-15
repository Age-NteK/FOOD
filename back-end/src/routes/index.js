/* 
! ESTE ARCHIVO CONFIGURA LAS RUTAS DE LA APLICACIÓN UTILIZANDO COMO MARCO DE TRABAJO EXPRESS

* Importaciones  
? Importo el módulo "express", que es un framework (marco de trabajo) de Node.js utilizado para construir aplicaciones web y manejar rutas, solicitudes y respuestas.
? Importo el objeto Router de módulo Express
? Creo una instancia de Router que llamo router
? Importo recipes, diets, users y favorites desde sus respectivas ubicaciones
? Cada uno de los módulos contiene rutas y controladores específicos para c/ parte de la aplicación */

const { Router } = require("express");
const router = Router();
const usersRouter = require("./users/usersRouter");
const recipesRouter = require("./recipes/recipesRouter");
const favoritesRouter = require("./favorites/favoritesRouter");
const dietsRouter = require("./diets/dietsRouter");

/*
* Establecimiento de rutas principales utilizando los módulos importados
? Método "use" de router para establecer la ruta base para cada módulo
? Px. Todos los módulos relacionados con usuarios estarán bajo la ruta "/users" */

router.use("/users", usersRouter);
router.use("/recipes", recipesRouter);
router.use("/diets", dietsRouter);
router.use("/favorites", favoritesRouter);

/*
! Exporta la instancia de router configurada, que contiene todas las rutas y subrutas definidas en este archivo. */
module.exports = router;
