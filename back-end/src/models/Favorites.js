/*
! ESTE ARCHIVO DEFINE EL MODELO FAVORITE QUE SE UTILIZARÁ EN LA BASE DE DATOS

* Importaciones
? Se importa el objeto sequelize para interactuar con la base de datos

* Definición del modelo "Favorite"
? Exporta una función anónima que toma un objeto sequelize como parámetro
? Utiliza el método define proporcionado por Sequelize para definir el modelo "Favorite" en la base de datos.
? No se definen campos en el modelo, ya que solo se necesita la relación entre usuarios y recetas favoritas.
? Se establece timestamps en false para deshabilitar automáticamente los campos de marca de tiempo (createdAt y updatedAt).
*/

module.exports = (sequelize) => {
  sequelize.define("Favorite", {}, { timestamps: false });
};
