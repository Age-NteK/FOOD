/*
! COMPONENTE BARRA DE NAVEGACIÓN QUE INCLUYE FILTROS, ORDENAMIENTOS Y CAMPO DE BÚSQUEDA
*/

import SortRecipeByTittle from "./sort/SortRecipeByTitle";
import SortRecipeHealth from "./sort/SortRecipeHealth";
import SortRecipePrice from "./sort/SortRecipePrice";
import FilterByVegan from "./filter/FilterByVegan";
import FilterByVegetarian from "./filter/FilterByVegetarian";
import FilterByGlutenFree from "./filter/FilterByGlutenFree";
import FilterByPopular from "./filter/FilterByPopular";
import SearchBar from "../SearchBar/SearchBar";
import Reset from "./Reset";
import styles from "./Navbar.module.css";

/*
* Definición del componente NavBar
! Componente de barra de navegación que contiene filtros y el componente SearchBar para buscar recetas por nombre.
? Renderiza una estructura de barra de navegación con elementos de filtros, ordenamientos y búsqueda.
? Importa y renderiza los siguientes componentes
*/

const NavBar = () => {

  return (
    <div className={styles.nav_container}>
      <div className={styles.nav_search}>
        <div className={styles.nav_filters}>
          <SearchBar />
          <SortRecipeByTittle />
          <SortRecipePrice />
          <SortRecipeHealth />
          <FilterByVegan />
          <FilterByPopular />
          <FilterByVegetarian />
          <FilterByGlutenFree />
          <Reset />
        </div>
      </div>
    </div>
  );
};
export default NavBar;
