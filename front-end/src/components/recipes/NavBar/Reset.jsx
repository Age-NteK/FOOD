/*
! COMPONENTE DE REINICIO PARA RESTABLECER EL ESTADO INICIAL
*/

import { useDispatch } from "react-redux";
import { reset } from "../../../redux/actions";
import styles from "./reset.module.css"

/*
* Definición del componente Reset
! Este componente renderiza un botón que, cuando se hace clic, envía una acción de reinicio al store de Redux para restablecer el estado inicial de la aplicación.
? Utiliza el hook useDispatch para obtener una función de despacho desde el store de Redux.
? Define la función handleClick que se activa cuando el botón es clicado.
? Dentro de handleClick, se envía la acción reset al store utilizando el método dispatch.
? Renderiza un botón con la clase de estilo "reset_btn" y vincula la función handleClick al evento onClick.
*/

const Reset = () => {
  const dispatch = useDispatch();

  const handleClick = (e) => {
    dispatch(reset())
  };

  return (
    <div>
      <button className={styles.reset_btn} onClick={handleClick}>Reset Initial State</button>
    </div>
  );
};

export default Reset;
