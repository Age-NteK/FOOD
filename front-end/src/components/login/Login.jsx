/*
! ARCHIVO DE INICIO DE SESIÓN DE USUARIO

* Importaciones
? Se importan los módulos y componentes necesarios para el archivo.
? Se importan useEffect y useState: Hooks utilizados para manejar efectos secundarios y estados locales en el componente.
? Se importan useNavigate y Link: Hooks utilizados para la navegación programática y la creación de enlaces en la aplicación.
? Se importan useSelector y useDispatch: Hooks utilizados para acceder al estado global y enviar acciones al almacén de Redux.
? Se importa getUserByEmail: Acción utilizada para obtener información de usuario por correo electrónico.
? Se importan estilos de módulo CSS locales.
*/

import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getUserByEmail } from "../../redux/actions";
import styles from "./login.module.css";

/*
! Definición del componente de inicio de sesión */

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const access = useSelector((state) => state.access);

  /*
* Estados locales del componente
? Se inicializan username, email y password como cadenas vacías 
? Se inicializa showMessage en false que muestra mensaje de Register
? Se inicializan tres estados locales. Estos estados se utilizarán para controlar la animación y el estilo de la interfaz de usuario
? showLogin: Es un estado booleano que controla si se muestra el formulario de inicio de sesión
? foddieWidth: Es un estado que controla el ancho de un elemento con el logo "Foodie". Se inicia con un valor de "100vw"
? loginForm: Se inicia con un valor de "0px", lo que indica que inicialmente el formulario tiene un ancho de 0 píxeles y no se muestra. */

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showRegisterMsg, setShowRegisterMsg] = useState(false);
  //Styles
  const [showLogin, setShowLogin] = useState(true);
  const [foddieWidth, setFoddieWidth] = useState("100vw");
  const [loginForm, setLoginForm] = useState("0px");

  /* 
 * useEffect esta parte del código controla una animación de entrada para mostrar y estilizar la interfaz de usuario de inicio de sesión de manera gradual
 ? setTimeout() Después de 900 milisegundos se cambia el estado showLogin a false, lo que significa que el formulario de inicio de sesión se ocultará, y se cambia el valor de foddieWidth a "58vw", reduciendo el ancho del elemento con el logo "Foodie".
 ? Después de 1000 milisegundos (1 segundo), se cambia el valor de loginForm a "470px", lo que indica que el formulario de inicio de sesión tendrá un ancho de 470 píxeles y se mostrará gradualmente.
 ? useEffect se ejecuta una vez (debido al array vacío []), lo que significa que estas modificaciones de estado ocurren después del montaje inicial del componente */

  useEffect(() => {
    setTimeout(() => {
      setShowLogin(false);
      setFoddieWidth("58vw");
    }, 900);
    setTimeout(() => {
      setLoginForm("470px");
    }, 1000);
  }, []);

  /*
* HandleChange
? Estas funciónes manejan el cambio en el campo de correspondiente del formulario. Y actualizan el estado local con el nuevo valor del campo. */

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
    setShowRegisterMsg(true);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  /*
*HandleSubmit
? e.preventDefault(): Evita el comportamiento predeterminado del formulario, que es recargar la página cuando se envía.
? Se llama a la acción getUserByEmail pasando el correo electrónico (email) y la contraseña (password) ingresados como argumentos.
? Si no se obtuvo acceso, se utiliza el hook navigate para redirigir al usuario a la página de registro (/register). */

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(getUserByEmail(email, password));
    if (!access) {
      navigate("/register");
    }
  };

/*
* Renderización del componente 
! Se renderiza una interfaz de inicio de sesión con un logo, un formulario de inicio de sesión 
? Incluye campos para el nombre de usuario, correo electrónico y contraseña, y botones para iniciar sesión y registrarse
? El diseño y la visibilidad de ciertos elementos cambian basados en estados condicionales. */

  return (
    <div className={styles.container}>
      <div className={styles.foodie_container} style={{ width: foddieWidth }}>
        <h1 className={styles.foddie}>Foodie</h1>
      </div>
      {!showLogin && (
        <div className={styles.login_container}>
          <div className={styles.image}>
            <h1 className={styles.heaven}>Heaven</h1>
          </div>
          <form
            onSubmit={handleSubmit}
            className={styles.login_form}
            style={{ width: loginForm }}
          >
            <div class={styles.welcome_container}>
              <h1 className={styles.welcome}>Welcome {username}</h1>
            </div>

            <div className={styles.login_input_container}>
              <div>
                <input
                  className={styles.login_input}
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={handleUsernameChange}
                />
              </div>
              <div>
                <input
                  className={styles.login_input}
                  type="text"
                  placeholder="Email"
                  value={email}
                  onChange={handleEmailChange}
                />
              </div>
              <div>
                <input
                  className={styles.login_input}
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={handlePasswordChange}
                />
              </div>
            </div>
            {showRegisterMsg && (
              <p className={styles.login_registermsg}>
                If you haven't registered yet, please go to Register
              </p>
            )}
            <div className={styles.login_container_btn}>
              <button className={styles.login_btn} type="submit">
                Login
              </button>
              <Link to="/register">
                <button className={styles.login_btn} type="submit">
                  Register
                </button>
              </Link>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};


/*
! Exporto componente Login */
export default Login;
