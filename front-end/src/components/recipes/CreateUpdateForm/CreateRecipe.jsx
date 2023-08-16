/*
! COMPONENTE DE CREACIÓN DE RECETAS

* Importaciones
? Se importan los módulos y componentes necesarios para el componente de creación de recetas.
? Se importa el hook useNavigate: Hook utilizado para la navegación programática a través de rutas.
? Se importan useDispatch y useSelector: Hooks utilizados para acceder al estado global y enviar acciones al almacén de Redux.
? Se importa useState y useEffect: Hooks utilizados para manejar estados locales y efectos secundarios en el componente.
? Se importa la acción createRecipe del módulo de acciones Redux.
? Se importan varios componentes para los campos del formulario.
? Se importa la función de validación validateCreateRecipe.
? Se importan estilos de módulo CSS locales.
*/

import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { createRecipe } from "../../../redux/actions";
import Title from "./FieldsForm/Title";
import Image from "./FieldsForm/Image";
import Popular from "./FieldsForm/Popular";
import Price from "./FieldsForm/Price";
import Diets from "./FieldsForm/Diets";
import Summary from "./FieldsForm/Summary";
import Steps from "./FieldsForm/Steps";
import Health from "./FieldsForm/Health";
import validateCreateRecipe from "./validateCreateRecipe";
import styles from "./createform.module.css";

/*
! Definición del componente de creación de recetas */

const CreateRecipe = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userId = useSelector((state) => state.userId);

  /*
* Estados locales del componente 
? formErrors es un objeto vacío. Este estado se utiliza para rastrear los errores de validación asociados a los campos del formulario.
? Convierto el id del user a Number
? formData que es un objeto con propiedades todas inicializados vacíos. Este estado se utiliza para rastrear los valores ingresados en los campos del formulario.
? title, summary, image: Son cadenas de texto que representarán el título, el resumen y la imagen de la receta.
? healthScore: Es un número que representa la puntuación de salud de la receta.
? pricePerServing: Es un número que representa el precio por porción de la receta.
? steps: Es un array de objetos, donde cada objeto tiene una propiedad step que representa un paso para preparar la receta. Inicialmente, se proporciona un objeto con un paso en blanco.
? veryPopular: Es un booleano que indica si la receta es muy popular o no.
? diets: Es un array que podría contener diferentes dietas asociadas con la receta.
? userId: Es un número que representa el ID del usuario que está creando la receta. Aquí, userIdAsNumber debe ser reemplazado con el valor adecuado del ID del usuario. */

  const [formErrors, setFormErrors] = useState({});
  const userIdAsNumber = Number(userId);
  const [formData, setFormData] = useState({
    title: "",
    summary: "",
    image: "",
    healthScore: 0,
    steps: [{ step: "" }],
    veryPopular: false,
    pricePerServing: 0,
    diets: [],
    userId: userIdAsNumber,
  });
  console.log(`ID de User: ${userId}`);

  /*
   *UseEffect para ver los cambios de FormData en consola en tiempo real */
  useEffect(() => {
    console.log("Form Data:", formData);
  }, [formData]);

  /*
* función onChange para manejar los campos del formulario
? Si el campo es un checkbox actualiza el valor booleano correspondiente en el estado. VeryPopular.
? Si el campo es de tipo 'diets' (seleccionar múltiples opciones), obtiene las opciones seleccionadas y las actualiza en el estado.
? addStep(): Esta función agrega un nuevo paso vacío a la lista de pasos en el estado formData.
? removeStep(): Esta función elimina el último paso de la lista de pasos en el estado formData.
? handleStepChange(index, value): Esta función maneja el cambio en un paso específico en la lista de pasos y Actualiza el estado formData con el nuevo valor proporcionado para el paso en el índice especificado.
? Para otros tipos de campos, procesa los valores según el nombre del campo (name) y actualiza el estado en consecuencia.
? Finalmente, realiza validación del campo actual utilizando la función validateCreateRecipe y actualiza los errores del formulario en el estado formErrors. */

  const onChange = (event) => {
    const { name, value, type, checked } = event.target;

    if (type === "checkbox") {
      setFormData((prevData) => ({
        ...prevData,
        [name]: checked,
      }));
    } else {
      const parsedValue =
        name === "healthScore"
          ? parseInt(value, 10)
          : name === "pricePerServing"
          ? parseFloat(value)
          : value;

      if (name === "diets") {
        const selectedOptions = Array.from(
          event.target.selectedOptions,
          (option) => option.value
        );
        setFormData((prevData) => ({
          ...prevData,
          [name]: selectedOptions,
        }));
      } else {
        setFormData((prevData) => ({
          ...prevData,
          [name]: parsedValue,
        }));
      }
    }

    // Validar el campo actual y actualizar los errores
    const fieldErrors = validateCreateRecipe({ ...formData, [name]: value });
    setFormErrors((prevErrors) => ({
      ...prevErrors,
      [name]: fieldErrors[name],
    }));
  };

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
* handleSubmit se encarga de validar los campos del formulario, enviar una solicitud para crear una nueva receta si no hay errores y manejar las respuestas exitosas o los errores que puedan ocurrir durante el proceso de creación de recetas.
? e.preventDefault(): Esto evita el comportamiento predeterminado de envío del formulario, que podría causar una recarga de la página.
? validateCreateRecipe(formData) se llama para validar todos los campos en formData. Devuelve un objeto que contiene errores de validación correspondientes a cada campo. Los errores se almacenan en el estado formErrors utilizando setFormErrors(allErrors).
? hasErrors Esto verifica si hay errores en algún campo. Si el objeto allErrors tiene alguna clave (lo que significa que hay errores), hasErrors será true.
? if (!hasErrors): Si no hay errores en ningún campo, se procede a enviar la solicitud para crear la receta.
? Se envía una solicitud para crear la receta utilizando la función createRecipe para enviar la acción a través del store de Redux y realizar el proceso de creación de la receta en el backend.
? Si todo ha ido bien, se navega a la página de "mis recetas" utilizando la función navigate, que redirige al usuario a la página especificada.
? Si se produce un error en el proceso de envío de la solicitud,  se captura y se imprime en la consola. */

  const handleSubmit = async (e) => {
    e.preventDefault();

    const allErrors = validateCreateRecipe(formData); // Validar todos los campos
    setFormErrors(allErrors); // Actualizar los errores

    // Verificar si hay errores en algún campo
    const hasErrors = Object.keys(allErrors).length > 0;

    // Si no hay errores en ningún campo, enviar la solicitud
    if (!hasErrors) {
      try {
        await dispatch(createRecipe(formData));
        console.log("La receta se ha creado correctamente");
        navigate("/myrecipes");
      } catch (error) {
        console.log(error.message);
      }
    }
  };

  /*
* Renderización del componente 
! Este bloque de código crea el formulario de registro con campos de entrada para la creacón de una nueva Recipe.
? Div container, define el diseño y el estilo del contenedor del formulario de creación.
? Se define el formulario y se establece el manejador onSubmit para que se ejecute la función handleSubmit cuando se envíe el formulario.
? Este fragmento de código renderiza un formulario para crear una receta con varios campos, muestra mensajes de error en caso de validación incorrecta y aplica estilos a través de clases CSS definidas en el archivo de estilos styles.
*/

  return (
    <div className={styles.create_img}>
      <form onSubmit={handleSubmit} className={styles.create_form_container}>
        <div className={styles.create_form}>
          <h2 className={styles.create_title}>Create your own Recipe</h2>
          {formErrors.title && (
            <p className={styles.create_p}>{formErrors.title}</p>
          )}
          <Title name="title" value={formData.title} onChange={onChange} />
          {formErrors.image && (
            <p className={styles.create_p}>{formErrors.image}</p>
          )}
          <Image name="image" value={formData.image} onChange={onChange} />
          {formErrors.pricePerServing && (
            <p className={styles.create_p}>{formErrors.pricePerServing}</p>
          )}
          <Price
            name="pricePerServing"
            value={formData.pricePerServing}
            onChange={onChange}
          />
          {formErrors.steps && (
            <p className={styles.create_p}>{formErrors.steps}</p>
          )}
          <Steps
            value={formData.steps}
            handleStepChange={handleStepChange}
            addStep={addStep}
            removeStep={removeStep}
          />

          {formErrors.diets && (
            <p className={styles.create_p}>{formErrors.diets}</p>
          )}
          <Diets name="diets" value={formData.diets} onChange={onChange} />

          {formErrors.summary && (
            <p className={styles.create_p}>{formErrors.summary}</p>
          )}
          <Summary
            name="summary"
            value={formData.summary}
            onChange={onChange}
          />
          {formErrors.veryPopular && (
            <p className={styles.create_p}>{formErrors.veryPopular}</p>
          )}
          <Popular
            name="veryPopular"
            value={formData.veryPopular}
            onChange={onChange}
          />
          {/* {formErrors.healthScore && (
            <p className={styles.create_p}>{formErrors.healthScore}</p>
          )} */}
          <Health
            name="healthScore"
            value={formData.healthScore}
            onChange={onChange}
          />
          <div className={styles.create_btn}>
            <button type="submit">Create Recipe</button>
          </div>
        </div>
      </form>
    </div>
  );
};
export default CreateRecipe;
