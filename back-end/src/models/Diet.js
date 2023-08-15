/*
! ESTE ARCHIVO DEFINE EL MODELO DIET QUE SE UTILIZARÁ EN LA BASE DE DATOS

* Importaciones
? Se importa el objeto DataTypes de la biblioteca Sequelize, que se utiliza para definir los tipos de datos de los campos en los modelos 
*/

const { DataTypes } = require("sequelize");

/*
? Exporta una función anónima que toma un objeto sequelize como parámetro
? Utiliza el método define proporcionado por Sequelize para definir el modelo "Diet" en la base de datos.
? Define el campo "id" y "name" del modelo
? Se establece timestapms deshabilitando automáticamente los campos de marca de tiempo (createdAt y updatedAt) en el modelo "Diet".
*/ 

module.exports = (sequelize) => {
  sequelize.define(
    "Diet",
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    { timestamps: false }
  );
};
