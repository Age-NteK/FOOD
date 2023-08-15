/*
! COMPONENTE CAMPO DE BÚSQUEDA DISEÑADO PARA PERMITIR BUSQUEDA DE RECETAS POR NOMBRE
*/

import { useDispatch } from "react-redux";
import { useState } from "react";
import { getRecipeByName, clean } from "../../../redux/actions";
import styles from "./searchbar.module.css";

/*
* Definición de componente SearchBar
! Con cada cambio en el campo de búsqueda, se envían acciones al store de Redux para buscar y mostrar las recetas que coinciden con el término de búsqueda.
? Crea un estado local llamado title con el valor inicial de una cadena vacía y fn setTitle para actualizar este estado.
? handleChange se activa cada vez que el usuario introduce texto en el campo de búsqueda.
? setTitle(e.target.value): Actualiza el estado title con el valor del texto introducido en el campo de búsqueda.
? Realiza una comprobación para ver si hay algún valor en el campo de búsqueda. 
? Si hay un valor, se envía una acción getRecipeByName al store de Redux con el valor del título para buscar recetas por nombre. 
? Si no hay valor, se envía una acción clean al store para restablecer el estado relacionado con las recetas.
? Renderización: El componente renderiza un elemento <input> que actúa como campo de búsqueda.
*/

const SearchBar = () => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");

  const handleChange = (e) => {
    setTitle(e.target.value);
    // Llamar a la función de búsqueda en cada cambio del input
    e.target.value
      ? dispatch(getRecipeByName(e.target.value))
      : dispatch(clean());
  };

  return (
    <>
      <input
        className={styles.searchbar}
        type="title"
        placeholder="Search By Name"
        name="title"
        value={title}
        onChange={handleChange}
      />
    </>
  );
};

export default SearchBar;