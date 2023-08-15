/*
! ESTE ARCHIVO DEFINE EL MODELO RECIPE QUE SE UTILIZARÁ EN LA BASE DE DATOS

* Importaciones
? Se importa el objeto DataTypes de la biblioteca Sequelize, que se utiliza para definir los tipos de datos de los campos en los modelos 
*/

const { DataTypes } = require("sequelize");

/*
? Exporta una función anónima que toma un objeto sequelize como parámetro
? Utiliza el método define proporcionado por Sequelize para definir el modelo "Recipe" en la base de datos.
? Define los campos del modelo "Recipe" con sus respectivos tipos de datos y restricciones.
? Se establece timestapms deshabilitando automáticamente los campos de marca de tiempo (createdAt y updatedAt) en el modelo "Recipe".
*/

module.exports = (sequelize) => {
  sequelize.define(
    "Recipe",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      summary: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      image: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      healthScore: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      steps: {
        type: DataTypes.ARRAY(DataTypes.JSON),
        allowNull: false,
      },
      vegetarian: {
        type: DataTypes.BOOLEAN,
      },
      vegan: {
        type: DataTypes.BOOLEAN,
      },
      glutenFree: {
        type: DataTypes.BOOLEAN,
      },
      veryPopular: {
        type: DataTypes.BOOLEAN,
      },
      pricePerServing: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      dairyFree: {
        type: DataTypes.BOOLEAN,
      },
      createdBy: {
        type: DataTypes.INTEGER,
      },
    },
    { timestamps: false }
  );
};
