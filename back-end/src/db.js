/* 
! ESTE ARCHIVO CONFIGURA UNA CONEXIÓN A UNA BASE DE DATOS POSTGRESQL UTILIZANDO SEQUELIZE, DEFINE MODELOS DE DATOS, ESTABLECE RELACIONES ENTRE ELLOS Y EXPORTA LOS MODELOS Y LA CONEXIÓN PARA SU USO EN OTRAS PARTES DE LA APLICACIÓN.

* Importaciones  
? Carga de variables de entorno utilizando la biblioteca dotenv
? Importa sequelize de la biblioteca Sequelize para crear una instanci de base de datos
? Importo fs para trabajar con sistema de archivos
? Importo path para trabajar con rutas de archivos y directorios
? Desestructuro las variables de entorno desde process.env */

require("dotenv").config();
const { Sequelize } = require("sequelize");
const fs = require("fs");
const path = require("path");
const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME } = process.env;

/*
* Creo la instancia de la clase Sequelize para utilizar opciones como loggin false que se utiliza para desactivar el registro de consultas
? Deshabilito el uso de la extensión nativa de PostgreSQL con native: false
? path __filename: la variable basename contendrá el nombre del archivo sin la ruta del directorio, es decir, solo el nombre del archivo en sí. Esto puede ser útil en escenarios donde necesitas referenciar el nombre del archivo actual sin la ruta completa*/

const sequelize = new Sequelize(
  `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`,
  {
    logging: false,
    native: false,
  }
);

const basename = path.basename(__filename);

const modelDefiners = new Set();

/*
? Leo el archivo /models y filtro los archivos que no empiezan con "." y que sí finalizan con la extensión "".js"*/

fs.readdirSync(path.join(__dirname, "/models"))
  .filter(
    (file) =>
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
  )
  .forEach((file) => {
    modelDefiners.add(require(path.join(__dirname, "/models", file)));
  });

/*
? Itero sobre los modelos y las asocia a la instancia de Sequelize para asociar el modelo a la base de datos */
modelDefiners.forEach((model) => model(sequelize));

let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [
  entry[0][0].toUpperCase() + entry[0].slice(1),
  entry[1],
]);
sequelize.models = Object.fromEntries(capsEntries);

/*
* Se establecen relaciones entre los modelos Recipe, Diet, User y Favorite utilizando métodos como belongsTo, hasMany y belongsToMany. Estas relaciones definen cómo están conectados los datos en la base de datos.
* Se desestructuran los modelos creados en Sequelize para utilizarlo en la definición de la asociaciones */
const { User, Recipe, Diet, Favorite } = sequelize.models;

/*
*RECIPE => DIET
? Relación: muchos a muchos
? Tabla intermedia: recipe_diets
? Timestamps: false no agregar fecha y hora a la tabla intermedia */
Recipe.belongsToMany(Diet, { through: "recipe_diets", timestamps: false });
Diet.belongsToMany(Recipe, { through: "recipe_diets", timestamps: false });

/*
* RECIPE => USER
? Relación: uno a muchos
? Recipe pertenece a un único User, y un User puede tener muchas recetas. 
? Foreing key: se establece que la columna CreatedBy en Recipe se utilizara como clave externa para la relación */
Recipe.belongsTo(User, { foreignKey: "createdBy" });
User.hasMany(Recipe, { foreignKey: "createdBy" });

/*
* DIET => USER
? Relación: uno a muchos
? Diet pertenece a un único User, y un User puede tener muchas dietas.
? Foreing key: se establece que la columna CreatedBy en Diet se utilizara como clave externa para la relación */
Diet.belongsTo(User, { foreignKey: "createdBy" });
User.hasMany(Diet, { foreignKey: "createdBy" });

/*
* RECIPE => FAVORITE
? Relación muchos a muchos
? Un User puede tener muchas recetas favoritas y una Recipe puede ser favorita para muchos usuarios
? La opción through especifica que la tabla intermedia a utilizar es el modelo Favorite */
Recipe.belongsToMany(User, { through: Favorite });
Favorite.belongsTo(Recipe);

// 
/*
* USER => FAVORITE
? Relación uno a muchos
? Relación de uno a muchos permite almacenar la información relacionada directamente en la tabla secundaria, sin requerir una tabla intermedia adicional */
User.hasMany(Favorite);
Favorite.belongsTo(User);

/*
! Exporto los modelos para que puedan ser utilizados en otros archivos de la aplicación */
module.exports = {
  ...sequelize.models,
  conn: sequelize,
};
