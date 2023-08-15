/*
! EL COMPONENTE CARDS MANEJA LA PAGINACIÓN Y LA RENDERIZACIÓN DE LAS RECETAS */

import { useEffect, useState } from "react";
import { getAllRecipes } from "../../../redux/actions";
import { useSelector, useDispatch } from "react-redux";
import styles from "./Cards.module.css";
import NavBar from "../NavBar/NavBar";
import Card from "../Card/Card";

/*
* useSelector
? Utilizo useSelector para obtener el array que contiene la copia de todas las recipes y el name de cada recipe
* Manejo de Click 
? Define handleClick, una función que alterna el estado de isClicked cuando se hace clic. Toggle.
* Carga Inicial de Recetas
? useEffect para cargar todas las recetas al montar el componente. 
? Invoca la acción getAllRecipes a través de dispatch.
* Filtrado de Recetas
? Determina qué conjunto de recetas mostrar utilizando una verificación condicional
? Si recipeName (filtro por nombre) tiene elementos, se asigna a recipeToShow
? De lo contrario, se asigna recipesCopy (recetas originales) */

const Cards = () => {
  const dispatch = useDispatch();
  const recipesCopy = useSelector((state) => state.recipesCopy);
  const recipeName = useSelector((state) => state.recipeName);

  const [isClicked, setIsClicked] = useState(false);
  const handleClick = () => {
    setIsClicked((prevState) => !prevState); // Toggle isClicked state
  };

  useEffect(() => {
    dispatch(getAllRecipes());
  }, [dispatch]);

  let recipeToShow;
  if (recipeName.length > 0) {
    recipeToShow = recipeName;
  } else {
    recipeToShow = recipesCopy;
  }

  /*
* Paginación. Calcula cuántas tarjetas mostrar en cada página y maneja los botones para avanzar y retroceder entre las páginas.
? cardsPerPage: Define el NÚMERO MÁXIMO de tarjetas de recetas que se mostrarán en CADA PÁGINA.
? currentPage: Estado que almacena el número de PÁGINA ACTUAL.
? totalCards: Calcula el número TOTAL de tarjetas de recetas en función de si hay un término de búsqueda (recipeName) o no. Si hay un término de búsqueda, utiliza la longitud de recipeName; de lo contrario, utiliza la longitud de recipesCopy.
? totalPages: Calcula el número TOTAL de páginas necesarias para mostrar todas las tarjetas de recetas, dividiendo el totalCards entre cardsPerPage y redondeando hacia arriba.
? indexOfLastCard: Calcula el índice de la última tarjeta en la página actual multiplicando currentPage por cardsPerPage.
? indexOfFirstCard: Calcula el índice de la primera tarjeta en la página actual restando cardsPerPage al índice de la última tarjeta.
? currentCards: Extrae recetas a mostrar en la página actual utilizando slice y los índices calculados.
? handleNextPage: Función que incrementa el número de página actual, asegurándose de no exceder el totalPages. Esto permite avanzar a la siguiente página.
? handlePrevPage: Función que disminuye el número de página actual, asegurándose de no ser menor que 1. Esto permite retroceder a la página anterior.
? Calcula los índices de la última y primera tarjeta en la página actual utilizando las fórmulas indexOfLastCard y indexOfFirstCard.
? Define las funciones handleNextPage y handlePrevPage para avanzar o retroceder en la paginación, actualizando currentPage dentro de los límites de 1 y totalPages. */

  const cardsPerPage = 9;
  const [currentPage, setCurrentPage] = useState(1);
  const totalCards = recipeName.length > 0 ? recipeName.length : recipesCopy.length;
  const totalPages = Math.ceil(totalCards / cardsPerPage);

  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = recipeToShow.slice(indexOfFirstCard, indexOfLastCard);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  /*
* Renderizado del componente
? Título, Botones de Paginación y Search
? Si isClicked es verdadero (es decir, se hizo clic en "Search"), renderiza el menú de navegación NavBar en la sección inferior de la página.
? Se alterna la visibilidad del menú de navegación (NavBar) según si se hace clic en el botón "Search".
? Renderiza una lista de tarjetas de recetas, cada una con su título, imagen y otros detalles.
? Renderiza botones de navegación para ir a la página anterior y siguiente, que están condicionalmente habilitados según la página actual y el número total de páginas.
? La renderización condicional asegura que solo se rendericen las tarjetas si hay recetas para mostrar.
? De lo contrario se muestra un mensaje Loading...*/

  return (
    <div className={styles.cards_center}>
      <h1 className={styles.cards_title}>
        Exquisite Gastronomy: A feast for your senses
      </h1>

      <div className={styles.pagination}>
        <button onClick={handleClick} className={styles.search}>
          Search
        </button>
        <button
          className={styles.pagination_prev}
          onClick={handlePrevPage}
          disabled={currentPage === 1}
        >
          Prev Page
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          className={styles.pagination_next}
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
        >
          Next Page
        </button>
      </div>

      <div
        className={`${styles.cards_all} ${
          isClicked ? styles.clicked : styles.noClicked
        }`}
      >
        <div
          className={`${styles.cards_card} ${
            isClicked ? styles.cards_card_clicked : styles.cards_card_noClicked
          }`}
        >
          {currentCards.length === 0 ? (
            <p>Loading...</p>
          ) : (
            currentCards.map(
              ({
                id,
                title,
                image,
                pricePerServing,
                vegan,
                vegetarian,
                glutenFree,
                veryPopular,
              }) => (
                <Card
                  key={id}
                  id={id}
                  title={title}
                  image={image}
                  pricePerServing={pricePerServing}
                  vegan={vegan}
                  vegetarian={vegetarian}
                  glutenFree={glutenFree}
                  veryPopular={veryPopular}
                />
              )
            )
          )}
        </div>
        {isClicked && (
          <div className={styles.navbar}>
            <NavBar />
          </div>
        )}
      </div>
    </div>
  );
};

export default Cards;
