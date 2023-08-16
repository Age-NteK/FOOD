/*
! EL COMPONENTE SE ENCARGA DE MOSTRAR UN FORMULARIO PRELLENADO CON LOS DETALLES DE LA RECETA SELECCIONADA
! PERMITE AL USUARIO REALIZAR MODIFICACIONES EN UNA RECIPE YA CREADA

* Importaciones
? Se importan los módulos y componentes necesarios para el componente de creación de recetas.
? Se importa useState y useEffect: Hooks utilizados para manejar estados locales y efectos secundarios en el componente.
? Se importa el hook useNavigate: Hook utilizado para la navegación programática a través de rutas.
? Se importan useDispatch y useSelector: Hooks utilizados para acceder al estado global y enviar acciones al almacén de Redux.
? Se importa useParams que permite acceder a los parámetros capturados en la ruta actual
? Se importa las actions del módulo de acciones Redux.
? Se importan los campos que se van a utilizar en el renderizado del componente
? Se importan estilos de módulo CSS locales
*/

import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getRecipeById,
  clean,
  updateRecipe,
  deleteDietOfOneRecipe,
  getAllDiets,
  getDietsOfOneRecipe,
} from "../../../redux/actions";
import Title from "../CreateUpdateForm/FieldsForm/Title";
import Image from "../CreateUpdateForm/FieldsForm/Image";
import Popular from "../CreateUpdateForm/FieldsForm/Popular";
import Price from "../CreateUpdateForm/FieldsForm/Price";
import Diets from "../CreateUpdateForm/FieldsForm/Diets";
import Summary from "../CreateUpdateForm/FieldsForm/Summary";
import Health from "../CreateUpdateForm/FieldsForm/Health";
import styles from "./updaterecipe.module.css";

/*
! Definición del componente de la actualización de la receta */

const UpdateRecipe = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  /*
  * Obtención de datos para el componente
  ? Se obtiene el id de la recipe a actualizar por params
  ? recipeToUpdate Se obtiene el detalle de la receta del estado global con useSelector
  ? recipeDiets Se obtiene las diets asociadas a la receta del estado global con useSelector
  * useEffect getRecipeById
  ? Se utiliza para obtener los detalles de la receta correspondiente al "id" proporcionado en la URL.
  ? La acción getRecipeById(id) se envía al store de Redux para buscar y cargar los detalles de la receta.
  ? Se define una función clean() de limpieza que se ejecutará cuando el componente se desmonte
  * useEffect getAllDiets
  ? Se utiliza para cargar todas las dietas disponibles en la aplicación. 
  ? La acción getAllDiets() se envía al store de Redux para obtener todas las dietas que los usuarios pueden seleccionar al crear o actualizar una receta.
  * useEffect getDietsOfOneRecipe
  ? Se utiliza para cargar las dietas asociadas con la receta específica que se está actualizando. 
  ? La acción getDietsOfOneRecipe(id) se envía al store de Redux para obtener las dietas relacionadas con la receta identificada por el "id" proporcionado. */

  const { id } = useParams();
  const recipeToUpdate = useSelector((state) => state.recipeDetail);
  const recipeDiets = useSelector((state) => state.recipeDiets);

  useEffect(() => {
    dispatch(getRecipeById(id));
    return () => {
      dispatch(clean());
    };
  }, [dispatch, id]);

  useEffect(() => {
    dispatch(getAllDiets());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getDietsOfOneRecipe(id));
  }, [dispatch]);

  /*
  ! ESTADO INICIAL
* Estado local del componente: se inicializa el estado local formData con los valores actuales de la receta que se va a actualizar. Esto permite que el formulario de actualización se cargue con los detalles preexistentes de la receta y facilite la edición de los mismos.
? Se inicializa el estado local formData. formData almacenará los valores de los campos del formulario de actualización.
? Se utiliza el operador de propagación (...) para copiar todas las propiedades del objeto recipeToUpdate en el estado local formData. Esto ayuda a prellenar todos los campos con los valores actuales de la receta.
? Se especifican manualmente las propiedades de recipeToUpdate para asegurarse de que ciertos campos se prellenen correctamente en el estado formData.
? Se utiliza el operador opcional de encadenamiento (?.) para asegurarse de que si recipeToUpdate no tiene la propiedad steps, se establezca como un array vacío.
? En veryPopular. Se utiliza el doble operador de negación (!!) para convertir el valor en un booleano si no lo es.
? Se prellena el campo de dietas (diets) con las dietas de la receta actual. Al igual que antes, se utiliza el operador opcional de encadenamiento para manejar el caso en que recipeToUpdate no tiene la propiedad Diets. */

  const [formData, setFormData] = useState({
    ...recipeToUpdate,
    title: recipeToUpdate.title,
    summary: recipeToUpdate.summary,
    image: recipeToUpdate.image,
    healthScore: recipeToUpdate.healthScore,
    steps: recipeToUpdate?.steps || [],
    veryPopular: !!recipeToUpdate.veryPopular,
    pricePerServing: recipeToUpdate?.pricePerServing,
    diets: recipeToUpdate?.Diets || [],
  });

  /*
  ! STEPS Y DIETS
* Steps y Diets: useEffect para asegurar de que los campos de pasos (steps) y dietas (diets) en el estado local formData se prellenen correctamente con los valores actuales de recipeToUpdate. Esto permite que el formulario de actualización muestre los pasos y las dietas existentes de la receta que se está modificando
? Se verifica si recipeToUpdate tiene un valor válido antes de continuar. Esto evita que se realice el efecto en caso de que recipeToUpdate sea null o undefined.
? setFormData((prevData): Se utiliza setFormData para actualizar el estado local formData. Se proporciona una función que toma el estado anterior (prevData) y devuelve el nuevo estado actualizado.
? ...prevData: Se copian todas las propiedades existentes de prevData en el nuevo objeto newFormData.
? steps: Se prellena el campo de pasos (steps) en el estado newFormData. Si recipeToUpdate.steps existe y no es nulo, se copia cada paso del array en un nuevo array utilizando el operador de propagación (...). 
? Si recipeToUpdate.steps es nulo, se establece como un array vacío.
? diets: Se prellena el campo de dietas (diets) en el estado newFormData. Si recipeToUpdate.Diets existe y no es nulo, se crea un nuevo array mapeando los nombres de las dietas desde recipeToUpdate.Diets. 
? Si recipeToUpdate.Diets es nulo, se establece como un array vacío.
? array de dependencias [] Cada vez que recipeToUpdate cambie, este efecto se activará.
  */
  useEffect(() => {
    if (recipeToUpdate) {
      setFormData((prevData) => {
        const newFormData = {
          ...prevData,
          steps: recipeToUpdate?.steps ? [...recipeToUpdate.steps] : [],
          diets: recipeToUpdate?.Diets
            ? recipeToUpdate.Diets.map((diet) => diet.name)
            : [],
        };

        return newFormData;
      });
    }
  }, [recipeToUpdate]);

  /*
! STEPS
* handleStepChange, addStep y removeStep: se utilizan para manejar la manipulación de steps en el formulario de actualización. 

*handleStepChang
? Toma dos parámetros index, que es el índice del paso que se está modificando, y value, que es el nuevo valor del paso.
? Utiliza setFormData para actualizar el estado local formData. Se proporciona una función que toma el estado anterior (prevData) y devuelve el nuevo estado actualizado.
? Crea una copia del array steps del estado anterior utilizando el operador de propagación ([...prevData.steps]). Esto asegura que no se modifique el array original directamente.
? Actualiza el paso en el índice especificado (index) dentro del array updatedSteps con un objeto que tiene la propiedad step establecida en el nuevo value. Esto modifica el paso en el lugar en la copia del array.
? updatedSteps: Devuelve un nuevo objeto que representa el estado actualizado. Se copian todas las propiedades existentes de prevData en el nuevo objeto, y el campo steps se actualiza con el nuevo array updatedSteps.
* addStep 
? No toma ningún parámetro.
?setFormData(prevData): Utiliza setFormData para actualizar el estado local formData. Se proporciona una función que toma el estado anterior (prevData) y devuelve el nuevo estado actualizado.
?[...prevData.steps, { step: "" }],: Actualiza el campo steps en el estado con un nuevo array que contiene todos los pasos existentes en prevData.steps (mediante el operador de propagación) y agrega un nuevo objeto { step: "" } al final del array.
? Esto agrega un nuevo paso en blanco al final de la lista de pasos.
* removeStep
? No toma ningún parámetro.
? setFormData((prevData) => {: Utiliza setFormData para actualizar el estado local formData. Se proporciona una función que toma el estado anterior (prevData) y devuelve el nuevo estado actualizado.
? steps.slice(0, -1),: Actualiza el campo steps en el estado con un nuevo array que es una porción del array prevData.steps. 
? Utilizo el método slice, que toma dos argumentos: el índice de inicio (0 en este caso) y el índice de finalización (-1 en este caso). 
? Esto elimina el último elemento del array de pasos, efectivamente eliminando el último paso.
*/
  const handleStepChange = (index, value) => {
    setFormData((prevData) => {
      const updatedSteps = [...prevData.steps];
      updatedSteps[index] = { step: value };
      return {
        ...prevData,
        steps: updatedSteps,
      };
    });
  };

  const addStep = () => {
    setFormData((prevData) => ({
      ...prevData,
      steps: [...prevData.steps, { step: "" }],
    }));
  };

  const removeStep = () => {
    setFormData((prevData) => ({
      ...prevData,
      steps: prevData.steps.slice(0, -1),
    }));
  };

  /*
! DIETS
* La función updateSelectedDiets se utiliza para actualizar las dietas seleccionadas en el estado formData. Agrega las nuevas dietas seleccionadas al array existente de dietas en el estado, eliminando duplicados en el proceso
? updateSelectedDiets que toma un parámetro selectedDiets.
? Utiliza setFormData para actualizar el estado local formData. Se proporciona una función que toma el estado anterior (prevData) y devuelve el nuevo estado actualizado.
? existingDiets: Almacena en la variable existingDiets el array de dietas existentes en el estado anterior.
? newDiets: Crea un nuevo array newDiets que combina las dietas existentes con las dietas seleccionadas (selectedDiets). Esto agrega las dietas seleccionadas al final del array.
? uniqueDiets: Crea un nuevo array uniqueDiets utilizando un conjunto (Set) para eliminar duplicados del array newDiets. Luego, se convierte el conjunto nuevamente en un array utilizando la sintaxis de propagación ([...new Set(newDiets)]).
? return Devuelve un nuevo objeto que representa el estado actualizado. Se copia el estado anterior (prevData) utilizando la sintaxis de propagación (...prevData) y se actualiza la propiedad diets con el array de dietas únicas (uniqueDiets) */

  const updateSelectedDiets = (selectedDiets) => {
    setFormData((prevData) => {
      const existingDiets = prevData.diets;
      const newDiets = [...existingDiets, ...selectedDiets];
      const uniqueDiets = [...new Set(newDiets)]; // Remove duplicates

      return {
        ...prevData,
        diets: uniqueDiets,
      };
    });
  };

  /*
! ONCHAGE
* la función onChange maneja los cambios en los campos del formulario y actualiza el estado formData en consecuencia. También se encarga de la conversión de tipos para los campos numéricos y booleanos, y llama a la función updateSelectedDiets cuando se modifican las dietas seleccionadas.

? Verifica si el nombre del campo del evento  es "diets". Esto indica que se están modificando las dietas seleccionadas en el formulario.
? selectedDiets = Si el campo es "diets", crea un array selectedDiets que contiene los valores seleccionados en el campo de opciones múltiples. Utiliza el método Array.from para convertir la colección selectedOptions en un array.
? Llama a la función updateSelectedDiets para actualizar las dietas seleccionadas en el estado.
? Verifica si es un campo de tipo "checkbox". Esto se utiliza para manejar el caso del campo "veryPopular", que es un checkbox.
? Si el campo es un checkbox, obtiene el valor booleano checked del campo, que indica si el checkbox está marcado o no.
? await setFormData: Actualiza el estado formData utilizando setFormData. Cambia el valor del campo "veryPopular" en el estado según el valor booleano isVeryPopular.
? Si el campo no es "diets" ni un checkbox, se asume que es un campo de entrada de texto u otro tipo de campo.
? let parsedValue: Si no es "diets" ni un checkbox, se inicializa parsedValue con el valor del campo.
? Si el campo es "healthScore", se convierte parsedValue en un entero utilizando parseInt con base 10.
? Si el campo es "pricePerServing", se convierte parsedValue en un número de punto flotante utilizando parseFloat.
? Finalmente, actualiza el estado formData con el nuevo valor de parsedValue para el campo correspondiente. */

  const onChange = async (e) => {
    if (e.target.name === "diets") {
      const selectedDiets = Array.from(
        e.target.selectedOptions,
        (option) => option.value
      );
      updateSelectedDiets(selectedDiets);
    } else if (e.target.type === "checkbox") {
      // Handle the checkbox case for the "veryPopular" field
      const isVeryPopular = e.target.checked;
      await setFormData((prevData) => ({
        ...prevData,
        [e.target.name]: isVeryPopular,
      }));
    } else {
      let parsedValue = e.target.value;

      if (e.target.name === "healthScore") {
        parsedValue = parseInt(e.target.value, 10); // Parse integer  base 10
      }

      if (e.target.name === "pricePerServing") {
        parsedValue = parseFloat(e.target.value); // Parse floating-point number
      }

      setFormData((prevData) => ({
        ...prevData,
        [e.target.name]: parsedValue,
      }));
    }

    console.log("formData:", formData);
  };

  /*
! HANDLESUBMIT
* handleSubmit se encarga de enviar la solicitud para actualizar la receta al backend, mostrar un mensaje en la consola y redirigir al usuario a la página de "mis recetas" después de una actualización exitosa.
? e.preventDefault(): Esta línea evita el comportamiento predeterminado de envío del formulario, que en este caso sería la recarga de la página.
? Se llama a la acción updateRecipe de Redux pasando el id de la receta y los datos contenidos en formData. Esta acción se encargará de enviar una solicitud al backend para actualizar la receta en la base de datos.
? Se utiliza el hook useNavigate de React Router para redirigir al usuario a la página "/myrecipes" después de que la receta se haya actualizado exitosamente. */

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateRecipe(id, formData));
    console.log(`The Recipe ${formData.title} was updated successfully`);
    navigate("/myrecipes");
  };

  /*
  ! DELETE DIET
? Llama a la acción deleteDietOfOneRecipe de Redux pasando el nombre de la dieta (dietName) y el id de la receta. 
? Esta acción se encarga de enviar una solicitud al backend para eliminar la dieta especificada de la receta en la base de datos. */

  const handleDeleteDiet = (dietName) => {
    dispatch(deleteDietOfOneRecipe(dietName, id));
  };

  /*
! Renderización del componente 
 ? Renderizado del formulario de actualización de recetas. 
 ? Se muestran los campos actuales de la receta, permitiendo su edición
 ? Se proporcionan botones para agregar y eliminar pasos de la receta, así como para eliminar dietas. 
 ? También se permite seleccionar nuevas dietas y steps para agregar
 ? Se incluyen opciones para editar la popularidad y la puntuación de salud de la receta. 
 ? Finalmente, hay un botón "Update Recipe" para enviar la solicitud de actualización de la receta. */

  return (
    <div className={styles.update_container}>
      <div className={styles.update_img}> </div>
      <form onSubmit={handleSubmit} className={styles.update_form}>
        <h1 className={styles.update_title} style={{ marginTop: "40px" }}>
          Update Your Recipe
        </h1>
        <h2 className={styles.update_subtitle}>
          Present Title: {recipeToUpdate.title}
        </h2>
        <Title name="title" value={formData.title} onChange={onChange} />
        <h2 className={styles.update_subtitle}>
          Present Image URL: {recipeToUpdate.image}
        </h2>
        <Image name="image" value={formData.image} onChange={onChange} />
        <h2 className={styles.update_subtitle}>
          Present Price: {recipeToUpdate.pricePerServing}
        </h2>
        <Price
          name="pricePerServing"
          value={formData.pricePerServing}
          onChange={onChange}
        />

        <div>
          <h2 className={styles.update_subtitle}>Present Steps</h2>
          <button
            type="button"
            onClick={addStep}
            className={styles.update_add_remove_btn}
          >
            Add Step
          </button>
          <button
            type="button"
            onClick={removeStep}
            className={styles.update_add_remove_btn}
          >
            Delete Step
          </button>
        </div>

        <ul>
          {formData &&
            formData.steps.map((step, index) => (
              <li key={index}>
                <input
                  type="text"
                  value={formData.steps[index].step || ""}
                  onChange={(e) => handleStepChange(index, e.target.value)}
                  className={styles.update_input}
                />
              </li>
            ))}
        </ul>

        <div>
          <h2 className={styles.update_subtitle}>
            Actualy your recipe has this diets:
          </h2>
          {recipeDiets &&
            recipeDiets?.map((diet, index) => (
              <div key={diet.id} className={styles.update_diet_btn}>
                <button>{diet.name}</button>
                <button
                  type="button"
                  onClick={() => handleDeleteDiet(diet.name)}
                >
                  X
                </button>
              </div>
            ))}
        </div>

        <h2 className={styles.update_subtitle}>
          Select the Diets you want to Add
        </h2>

        <Diets name="diets" value={formData.diets} onChange={onChange} />
        <h2 className={styles.update_subtitle}>
          Present Summary: {recipeToUpdate.summary}
        </h2>

        <Summary name="summary" value={formData.summary} onChange={onChange} />

        <div style={{ maxWidth: "600px", margin: "0 auto" }}>
          <Popular
            name="veryPopular"
            value={formData.veryPopular}
            onChange={onChange}
            checked={formData.veryPopular}
            style={{ maxWidth: "600px", margin: "0 auto" }}
          />
        </div>

        {/* Health Component */}
        <h2 className={styles.update_subtitle}>
          Current HealthScore {recipeToUpdate.healthScore}
        </h2>
        <div style={{ maxWidth: "600px", margin: "0 auto" }}>
          <Health
            name="healthScore"
            value={formData.healthScore}
            onChange={onChange}
            style={{ maxWidth: "600px", margin: "0 auto" }}
          />
        </div>
        <button
          type="button"
          onClick={handleSubmit}
          className={styles.update_update_btn}
        >
          Update Recipe
        </button>
      </form>
    </div>
  );
};

export default UpdateRecipe;
