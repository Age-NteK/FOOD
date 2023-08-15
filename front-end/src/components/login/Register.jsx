/*
! ARCHIVO DE REGISTRO DE USUARIO

* Importaciones
? Se importan diferentes módulos y componentes necesarios para el archivo
? Se importa useNavigate: Hook utilizado para la navegación programática a través de rutas.
? Se importa useDispatch: Hook utilizado para enviar acciones al almacén de Redux.
? Se importa useState: Hook utilizado para manejar el estado local en el componente.
? Se importa validateRegister: Función de validación para el formulario de registro.
? Se importan estilos de módulo CSS locales. */

import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { registerUser } from "../../redux/actions";
import { useState } from "react";
import validateRegister from "./validateRegister";
import styles from "./register.module.css";

/*
! Definición del componente de registro */

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

/*
* Estados locales del componente
? isRegistered se inicializa en false. Esta variable se utiliza para rastrear si el usuario se ha registrado correctamente.
? hasErrors que se inicializa en false. Este estado se utiliza para rastrear si hay errores en el formulario.
? formData que es un objeto con propiedades todas inicializadas en cadenas vacías. Este estado se utiliza para rastrear los valores ingresados en los campos del formulario.
? formErrors es un objeto vacío. Este estado se utiliza para rastrear los errores de validación asociados a los campos del formulario. */

  const [isRegistered, setIsRegistered] = useState(false);
  const [hasErrors, setHasErrors] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
  });
  const [formErrors, setFormErrors] = useState({}); 

/*
* Función para manejar cambios en los campos del formulario 
? Se extraen las propiedades name y value del elemento del DOM que desencadenó el evento de cambio (e).
? name se refiere al nombre del campo del formulario y value es el nuevo valor ingresado en ese campo.
? Se actualiza el estado formData utilizando el operador de propagación (...) para copiar las propiedades existentes del estado
? luego sobrescribir o agregar la propiedad correspondiente. Esto actualiza el objeto formData con los valores más recientes.
?  Se llama a la función validateRegister con una copia actualizada de formData, donde se cambió la propiedad correspondiente ([name]: value) con el nuevo valor ingresado. Esto se hace para realizar una validación en tiempo real en el campo que se modificó y obtener cualquier error asociado.
? Se actualiza el estado formErrors. Se copian las propiedades existentes del estado y luego se sobrescribe o agrega la propiedad correspondiente ([name]: errors[name]) con el error específico (si lo hay) relacionado con el campo que se modificó.
? hasFormErrors i hay al menos un error, hasFormErrors se establece en true, de lo contrario, se establece en false.
? Se actualiza el estado hasErrors con el valor de hasFormErrors, que indica si hay errores en el formulario. */

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Realizar validación en tiempo real y actualizar los errores
    const errors = validateRegister({ ...formData, [name]: value });
    setFormErrors({ ...formErrors, [name]: errors[name] });

    // Verificar si hay errores en el formulario y actualizar el estado
    const hasFormErrors = Object.keys(errors).some((key) => errors[key]);
    setHasErrors(hasFormErrors);
  };

/*
* Función para manejar el envío del formulario, realiza la validación, registra al usuario si no hay errores y maneja la actualización de estados
? e.preventDefault();: Esto evita el comportamiento predeterminado de envío del formulario, que es recargar la página.
? Se llama a la función validateRegister pasando formData como argumento para validar los datos del formulario y obtener un objeto errors que contiene los errores de validación, si los hay.
? Se actualiza el estado formErrors con el objeto errors, lo que reflejará los errores de validación en la interfaz de usuario.
? Se verifica si no hay errores de validación en el formulario. Si el objeto errors está vacío (no hay errores), el código dentro del bloque if se ejecutará.
? Se llama a la acción registerUser utilizando el dispatch para enviar los datos del formulario al almacén Redux para su procesamiento.
? Se restablecen los valores del estado formData a cadenas vacías para limpiar los campos del formulario después de un registro exitoso.
? Se establece el estado isRegistered en true y se indica por consola que el usuario se ha registrado exitosamente.
? Utilizando el hook useNavigate, se navega a la página de inicio ("/") después de un registro exitoso.
? En caso de que ocurra un error durante el registro (dentro del bloque try), se captura y se muestra un mensaje en la consola.
*/

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = validateRegister(formData); // Validar el formulario
    setFormErrors(errors); // Actualizar los errores

    if (Object.keys(errors).length === 0) {
      try {
        await dispatch(
          registerUser({
            username: formData.username,
            email: formData.email,
            password: formData.password,
            firstName: formData.firstName,
            lastName: formData.lastName,
            phoneNumber: formData.phoneNumber,
          })
        );

        setFormData({
          username: "",
          email: "",
          password: "",
          firstName: "",
          lastName: "",
          phoneNumber: "",
        });

        setIsRegistered(true);
        navigate("/");
      } catch (error) {
        console.log("User data is invalid. Please fix the errors.");
      }
    }
  };

/*
* Renderización del componente 
! Este bloque de código crea el formulario de registro con campos de entrada para el nombre de usuario y muestra mensajes de error en caso de que la validación falle y tiene un botón de registro que se activa cuando se completan todos los campos correctamente.
? Div register_container, define el diseño y el estilo del contenedor del formulario de registro.
? Se crea un formulario. El evento onSubmit={handleSubmit} se activa cuando el formulario se envía, lo que significa que la función handleSubmit se ejecutará cuando se envíe el formulario.
? register_title Título principal
? placeholder: Texto de marcador de posición en el campo.
? className: La clase de estilo para estilizar el campo.
? type: Tipo de campo.
? name: El nombre del campo, que se utiliza para identificar el campo en el estado.
? value: El valor actual del campo, que se toma del estado formData.
? onChange: Un evento que se activa cuando el valor del campo cambia, que llama a la función handleChange para manejar los cambios.
? Después del campo de entrada, se verifica si hay errores para el campo de nombre de usuario (formErrors.username). 
? Si hay errores, se muestra un elemento p con el mensaje de error.
? Un botón de envío del formulario que se habilita cuando se completan todos los campos correctamente */

  return (
    <div className={styles.register_container}>
      <form className={styles.register_form} onSubmit={handleSubmit}>
        <div>
          <div className={styles.register_tittles}>
            <h2 className={styles.register_title}>Joining is easy</h2>
            <h2 className={styles.register_subtitle}>
              Register now and start exploring without limits!
            </h2>
          </div>
          <div>
            <input
              placeholder="Username"
              className={styles.register_input}
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
            />
            {formErrors.username && <p>{formErrors.username}</p>}
          </div>

          <div>
            <input
              placeholder="First Name"
              className={styles.register_input}
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
            />
            {formErrors.firstName && <p>{formErrors.firstName}</p>}
          </div>

          <div>
            <input
              placeholder="Last Name"
              className={styles.register_input}
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
            />
            {formErrors.lastName && <p>{formErrors.lastName}</p>}
          </div>

          <div>
            <input
              placeholder="Email"
              className={styles.register_input}
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
            {formErrors.email && <p>{formErrors.email}</p>}
          </div>

          <div>
            <input
              placeholder="Password"
              className={styles.register_input}
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
            {formErrors.password && <p>{formErrors.password}</p>}
          </div>

          <div>
            <input
              placeholder="Phone Number"
              className={styles.register_input}
              type="text"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
            />
            {formErrors.phoneNumber && <p>{formErrors.phoneNumber}</p>}
          </div>
          <button
            type="submit"
            className={styles.register_btn}
            disabled={hasErrors}
          >
            Register
          </button>
        </div>
      </form>
    </div>
  );
};

/*
! Exporto componente Register */
export default Register;
