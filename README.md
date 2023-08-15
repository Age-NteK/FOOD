![HenryLogo](https://d31uz8lwfmyn8g.cloudfront.net/Assets/logo-henry-white-lg.png)

# **FOOD** | Proyecto Individual

## **📌 OBJETIVOS**

-  Construir una Single Page Application utlizando las tecnologías: **React**, **Redux**, **Node**, **Express** y **Sequelize**.
-  Poner en práctica recursos básicos de estilos y diseño (UX : UI).
-  Afirmar y conectar los conceptos aprendidos en la carrera.
-  Aprender mejores prácticas.
-  Aprender y practicar el workflow de GIT.
-  Utilizar y practicar testing.

<br />

---

## **⏱ HORARIOS Y FECHAS**

El proyecto individual tiene una duración máxima de tres semanas. Se inicia la primera semana con un Kick-Off, y se agendará una corrección personalizada la última semana.

En el caso de completar todas las tareas antes de dicho lapso se podrá avisar a su instructor para coordinar una fecha de presentación del trabajo (DEMO).

<br />

---

## **⚠️ IMPORTANTE**

Es necesario contar minimamente con la última versión estable de NodeJS y NPM. Asegúrate de contar con ella para poder instalar correctamente las dependecias necesarias para correr el proyecto. Actualmente las versiónes necesarias son:

-  **Node**: 12.18.3 o mayor
-  **NPM**: 6.14.16 o mayor

Para verificar que versión tienes instalada:

```bash
node -v
npm -v
```

**ACLARACIÓN:** las dependencias actuales se encuentran en las versiones que venimos trabajando durante el bootcamp.

-  **react**: 17.0.1
-  **react-dom**: 17.0.1
-  **react-router-dom**: 5.2.0
-  **redux**: 4.0.5
-  **react-redux**: 7.2.3

Está permitido, **bajo tu responsabilidad**, actualizar las dependencias a versiones más actuales si lo deseas. Versiones mas actuales podrían presentar configuraciones diferentes respecto a las versiones en las que venimos trabajando durante el bootcamp.

### **⛔️ Está rotundamente prohibido utilizar librerías externas para aplicar estilos a la SPA. Tendrás que utilizar CSS mediante algunas de las opciones vistas en el bootcamp (CSS, Legacy, Inline Styling, CSS Modules o Styled Components).**

<br />

---

## **📋 PARA COMENZAR...**

1. Deberás forkear este repositorio para tener una copia del mismo en tu cuenta personal de GitHub.

2. Clona el repositorio en tu computadora para comenzar a trabajar. Este repositorio contiene un **`BoilerPlate`** con la estructura general del proyecto, tanto del servidor como del cliente. El boilerplate cuenta con dos carpetas: **`api`** y **`client`**. En estas carpetas estará el código del back-end y el front-end respectivamente.

3. En la carpeta **`api`** deberás crear un archivo llamado: **`.env`** que tenga la siguiente forma:

   ```env
       DB_USER=usuariodepostgres
       DB_PASSWORD=passwordDePostgres
       DB_HOST=localhost
   ```

4. Reemplazar **`usuariodepostgres`** y **`passwordDePostgres`** con tus propias credenciales para conectarte a postgres. Este archivo va ser ignorado en la subida a github, ya que contiene información sensible (las credenciales).

5. Adicionalmente será necesario que crees, **desde psql (shell o PGAdmin)**, una base de datos llamada **`food`**. Si no realizas este paso de manera manual no podrás avanzar con el proyecto.

<br />

---

## **📖 ENUNCIADO GENERAL**

La idea de este proyecto es construir una aplicación web a partir de la API [**spoonacular**](https://spoonacular.com/food-api) en la que se pueda:

-  Buscar recetas.
-  Visualizar la información de las recetas.
-  Filtrarlas.
-  Ordenarlas.
-  Crear nuevas recetas.

⚠️ Para las funcionalidades de filtrado y ordenamiento NO se puede utilizar los endpoints de la API externa que ya devuelven los resultados filtrados u ordenados.

**IMPORTANTE**: para poder utilizar la API es necesario crear una cuenta y obtener una ApiKey que luego deberá ser incluida en todos los request que hagamos. Esto se logra simplemente agregando **`?api_key={YOUR_API_KEY}`** al final de cada end-point. Agregar la clave en el archivo **`.env`** para que la misma no se suba al repositorio por cuestiones de seguridad.

### **Únicos end-points que se pueden utilizar**

-  [**Spoonacular**](https://api.spoonacular.com/recipes/complexSearch)
-  Para obtener mayor información sobre las recetas, como por ejemplo el tipo de dieta, debes agregar el flag **`&addRecipeInformation=true`** a ese end-point.
-  Para los tipos de dieta debes tener en cuenta las propiedades **vegetarian**, **vegan** y **glutenFree** por un lado, y también analizar las que se incluyan dentro de la propiedad **`diets`** por otro.
-  **Search By 'ID':** _"https://api.spoonacular.com/recipes/{id}/information"_

<br />

---

<div align="center">

## **📁 INSTRUCCIONES**

</div>

<br />

### **🖱 BASE DE DATOS**

Deberás crear dos modelos para tu base de datos. Una será para las recetas y la otra será para los tipos de dietas (pueden llevar el nombre que tu quieras). La relación entre ambos modelos debe ser de muchos a muchos. A continuación te dejamos las propiedades que debe tener cada modelo.

**📍 MODELO 1 | Recipe**

-  ID. \*
-  Nombre. \*
-  Imagen. \*
-  Resumen del plato. \*
-  Nivel de comida saludable (health score). \*
-  Paso a paso. \*

<br />

**📍 MODELO 2 | Diets**

-  ID. \*
-  Nombre. \*

<br />

---

<br />

### **🖱 BACK-END**

Para esta parte deberás construir un servidor utilizando **NodeJS** y **Express**. Tendrás que conectarlo con tu base de datos mediante **Sequelize**.

Tu servidor deberá contar con las siguientes rutas:

#### **📍 GET | /recipes/:idRecipe**

-  Esta ruta obtiene el detalle de una receta específica. Es decir que devuelve un objeto con la información pedida en el detalle de una receta.
-  La receta es recibida por parámetro (ID).
-  Tiene que incluir los datos de los tipos de dietas asociados a la receta.
-  Debe funcionar tanto para las recetas de la API como para las de la base de datos.

#### **📍 GET | /recipes/name?="..."**

-  Esta ruta debe obtener todas aquellas recetas que coincidan con el nombre recibido por query. (No es necesario que sea una coincidencia exacta).
-  Debe poder buscarla independientemente de mayúsculas o minúsculas.
-  Si no existe la receta, debe mostrar un mensaje adecuado.
-  Debe buscar tanto las de la API como las de la base de datos.

#### **📍 POST | /recipes**

-  Esta ruta recibirá todos los datos necesarios para crear una nueva receta y relacionarla con los tipos de dieta solicitados.
-  Toda la información debe ser recibida por body.
-  Debe crear la receta en la base de datos, y esta debe estar relacionada con los tipos de dieta indicados (al menos uno).

#### **📍 GET | /diets**

-  Obtiene un arreglo con todos los tipos de dietas existentes.
-  En una primera instancia, cuando no exista ninguna dieta, deberás precargar la base de datos con las dietas de la [**documentación**](https://spoonacular.com/food-api/docs#Diets).
-  Estas deben ser obtenidas de la API (se evaluará que no haya hardcodeo). Luego de obtenerlas de la API, deben ser guardadas en la base de datos para su posterior consumo desde allí.

<br />

---

<br />

### **🖱 FRONT-END**

Se debe desarrollar una aplicación utilizando **React** y **Redux** que contenga las siguientes vistas:

**📍 LANDING PAGE |** deberás crear una página de inicio o bienvenida con:

-  Alguna imagen de fondo representativa al proyecto.
-  Botón para ingresar a la **`home page`**.

<br />

**📍 HOME PAGE |** la página principal de tu SPA debe contener:

-  SearchBar: un input de búsqueda para encontrar recetas por nombre.
-  Sector en el que se vea un listado de cards con las recetas. Al iniciar deberá cargar los primeros resultados obtenidos desde la ruta **`GET /recipes`** y deberá mostrar su:
   -  Imagen.
   -  Nombre.
   -  Tipos de dietas.
-  Cuando se le hace click a una Card deberá redirigir al detalle de esa receta específica.
-  Botones/Opciones para **filtrar** por tipo de dieta, y por si su origen es de la API o de la base de datos (creados por nosotros desde el formulario).
-  Botones/Opciones para **ordenar** tanto ascendentemente como descendentemente las recetas por orden alfabético y por "comida saludable" (_health score_).
-  Paginado: el listado de recetas se hará por partes. Tu SPA debe contar con un paginado que muestre un total de 9 recetas por página.

**⚠️ IMPORTANTE**: se deben mostrar tanto las recetas traidas desde la API como así también las de la base de datos, pero **NO** está permitido almacenar en la base de datos las recetas de la API. **Solamente se pueden guardar aquellas creadas desde el form**.

**⚠️ IMPORTANTE:** debido a que en la API existen alrededor de 5.000 recetas, por cuestiones de performance puedes tomar la simplificación de obtener y **paginar** las primeras 100 recetas.

<br />

**📍 DETAIL PAGE |** en esta vista se deberá mostrar toda la información específica de una receta:

-  ID.
-  Nombre.
-  Resumen del plato.
-  Nivel de comida saludable (health score).
-  Paso a paso.
-  Imagen.
-  Tipos de dieta.

<br />

**📍 FORM PAGE |**: en esta vista se encontrará el formulario para crear una nueva receta.

Este formulario debe ser **controlado completamente con JavaScritp**. No se pueden utilizar validaciones HTML, ni utilizar librerías especiales para esto. Debe contar con los siguientes campos:

-  Nombre.
-  Resumen del plato.
-  Nivel de comida saludable (health score).
-  Paso a paso.
-  Imagen.
-  Posibilidad de seleccionar/agregar varios tipos de dieta en simultáneo.
-  Botón para crear la receta.

> [**IMPORANTE**]: es requisito que el formulario de creación esté validado sólo con JavaScript. Puedes agregar las validaciones que consideres. Por ejemplo: que el nombre de la receta no pueda contener números, o que el health score no pueda exceder determinado valor, etc.

<br />

---

<br />

### **🖱 TESTING**

Ten en cuenta que en esta instancia no es obligatorio el desarrollo de testing para tu aplicación. De igual manera, te desafiamos a que los hagas, ¡ya que suman puntos!

-  Al menos tener un componente del frontend con sus tests respectivos.
-  Al menos tener dos rutas del backend con sus tests respectivos.
-  Al menos tener un modelo de la base de datos con sus tests respectivos.

<br />

---

<br />

<div align="center">
<img src="./cooking.png" alt="" />
</div>
