/*
! ESTE ARCHIVO CONFIGURA UN SERVIDOR WEB Y ESTABLECE LA CONEXIÓN CON LA BASE DE DATOS */
/*
* Importaciones

? Importo el server
? Importa un objeto conn desde db
? Importa una funcion DB_conect desde DB_coonnect
? Define numero de puerto en el que se va a a ejecutar el servidor, en este caso 3001
*/
const server = require("./src/server");
const { conn } = require("./src/db.js");
const DB_connect = require("./src/DB_connect/DB_connect");
const PORT = 3001;

conn
  .sync({ force: false })
  .then(() => {
    server.listen(PORT, () => {
      console.log(`Server listening on port: ${PORT}`);
    });
    DB_connect();
  })
  .catch((error) => console.error(error.message));

/*
? Se sincroniza la base de datos
? Llama al metodo sync de conn que representa una instancia de una base de datos utilizando Sequelize
? Force true se utiliza para REDEFINIR la estructura de la base de datos desde cero. Útil en situaciones de pruebas.
? Force false para MANTENER los datos. la sincronización no creará nuevas tablas si ya existen. Util en producción.
? Una vez que la sincronización de la base de datos se completa con éxito, se ejecuta el código dentro de .then
? Se inicia el servidor para escuchar en el puerto especificado 3001
? Cuando el servidor este listo para recibir conexiones lanzará el mensaje en consola Server listening on port: ${PORT}
? Se llama a la funcion DB_connect que esta relacionada con la configuracion y el establecimiento de la conexion a la base de datos.
? Manejo de errores, si ocurre un error en cualquiera de las etapas anteriores se imprime en mensaje de error en la consola.
*/

/*
! BETTER COMMENTS
! Título || Importante || Exportaciónes
* Subtítulo
? Párrafo
? Px. (Por Ejemplo)
*/
