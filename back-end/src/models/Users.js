/*
! ESTE ARCHIVO DEFINE EL MODELO USER QUE SE UTILIZARÁ EN LA BASE DE DATOS

* Importaciones
? Se importa el objeto DataTypes de la biblioteca Sequelize, que se utiliza para definir los tipos de datos de los campos en los modelos 
*/

const { DataTypes } = require("sequelize");

/*
? Exporta una función anónima que toma un objeto sequelize como parámetro
? Utiliza el método define proporcionado por Sequelize para definir el modelo "User" en la base de datos.
? Define los campos del modelo "User" con sus respectivos tipos de datos y restricciones.
? Se establece timestapms deshabilitando automáticamente los campos de marca de tiempo (createdAt y updatedAt) en el modelo "User".
*/

module.exports = (sequelize) => {
  sequelize.define(
    "User", 
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      password: {
        type: DataTypes.STRING,
      },
      firstName: {
        type: DataTypes.STRING,
      },
      lastName: {
        type: DataTypes.STRING,
      },
      phoneNumber: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    { timestamps: false }
  );
};