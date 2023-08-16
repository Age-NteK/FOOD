/*
! COMPONENTE DE CREACIÓN DE RECETAS

* Importaciones
? Se importa Link para establecer enlaces
? Se importan estilos de módulo CSS locales.
*/

import { Link } from "react-router-dom";
import styles from "./Top.module.css";

/*
! El componente TopSearchBar es una barra de navegación que proporciona enlaces a diferentes secciones 
* Diseñada para ofrecer una forma visualmente atractiva y accesible para que los usuarios puedan navegar entre las diferentes áreas de la aplicación. 
? Cada botón en la barra de navegación está representado como un enlace Link de React Router, lo que permite al usuario hacer clic en ellos para acceder a las páginas correspondientes. */

const TopSearchBar = () => {

  return (
    <div className={styles.topbar_cont}>
      <div className={styles.topbar_container}>
        <div>
          <Link to="/home">
            <button className={styles.topbar_btn}>Home</button>
          </Link>
          <Link to="/create/:id">
            <button className={styles.topbar_btn}>Create New Recipe</button>
          </Link>
          <Link to="/myrecipes">
            <button className={styles.topbar_btn}>My Recipes</button>
          </Link>
          <Link to="/homediets">
            <button className={styles.topbar_btn}>Diets</button>
          </Link>
          <Link to="/mydiets">
            <button className={styles.topbar_btn}>My Diets</button>
          </Link>
          <Link to="/favorites">
            <button className={styles.topbar_btn}>My Favorites</button>
          </Link>
          <Link to="/profile">
            <button className={styles.topbar_btn}>My Profile</button>
          </Link>
          <Link to="/about">
            <button className={styles.topbar_btn}>About</button>
          </Link>
          <Link to="/notfound">
            <button className={styles.topbar_btn}>Not Found</button>
          </Link>
          <Link to="/">
            <button className={styles.topbar_btn}>Logout</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TopSearchBar;
