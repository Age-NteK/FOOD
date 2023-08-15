/*
! COMPONENTE DE RECETAS FAVORITAS DEL USUARIO
*/

import { useState, useEffect } from "react";
import styles from "./Card.module.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  addFavorite,
  deleteRecipe,
  getAllRecipes,
  deleteFavorite,
} from "../../../redux/actions";

/*
* Definición del componente MyFavorites
! Este componente muestra las recetas favoritas del usuario actual y permite eliminar recetas de la lista de favoritos.
? Utiliza el hook useDispatch para obtener una función de despacho desde el store de Redux.
? Utiliza el hook useSelector para obtener las recetas favoritas del usuario y el ID del usuario.
? handleDeleteRecipe Llama a la acción deleteRecipe y envía el ID de la receta como argumento. Esta acción está diseñada para eliminar una receta de la base de datos en el servidor.
? Se establece el estado local isDeleted en true. Este estado se utiliza en un efecto posterior para determinar si la lista de recetas debe actualizarse. 
? Cuando isDeleted es true, se ejecuta un efecto que refresca la lista de recetas en la interfaz de usuario para reflejar la receta recién eliminada.
? Utiliza useEffect para cargar las recetas favoritas del usuario cuando el componente se monta o cuando cambia el ID del usuario. 
? Cuando el componente se monta o cuando cambia el ID del usuario, se llama a la acción getAllFavorites para obtener las recetas favoritas del usuario actual.
? Define la función handleRemoveFavorite que se activa cuando el botón de corazón (❤️) se hace clic para eliminar una receta de la lista de favoritos. 
? Después de eliminar la receta favorita, se llama a la acción getAllFavorites nuevamente para actualizar la lista de favoritos.
? Renderiza las recetas favoritas del usuario en la interfaz de usuario, mostrando el título y la imagen de cada receta.
? Si no hay recetas favoritas, se muestra un mensaje indicando que no se encontraron favoritas.
*/

const Card = ({
  id,
  title,
  image,
  pricePerServing,
  // vegan,
  // vegetarian,
  // glutenFree,
  // veryPopular,
}) => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.userId);
  const allFavorites = useSelector((state) => state.allFavorites);

  // Estado local para manejar el status de Favorite
  const [isFavorite, setIsFavorite] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);

  // Fn para manejar la eliminación de una receta
  const handleDeleteRecipe = () => {
    dispatch(deleteRecipe(id));
    setIsDeleted(true);
  };

  // useEffect para montar las recetas una vez que una ha sido eliminada
  useEffect(() => {
    if (isDeleted) {
      dispatch(getAllRecipes());
      console.log(`Esta eliminada ${isDeleted}`);
    }
  }, [dispatch, isDeleted]);

  // Fn para manejar agregar o eliminar de favoritos
  const handleAddFavorite = async () => {
    if (isFavorite) {
      await dispatch(deleteFavorite(id, userId));
      // Seteo Favorite a False si la action que se despacha es deleteFavorite
      setIsFavorite(false);
    } else {
      await dispatch(addFavorite(id, userId));
       // Seteo Favorite a true si la action que se despacha es addFavorite
      setIsFavorite(true);
    }
  };

 // Establecer el valor inicial de isFavorite según si el ID actual de la receta existe en allFavorites.
  useEffect(() => {
    setIsFavorite(allFavorites.some((favorite) => favorite.RecipeId === id));
  }, [id, allFavorites]);

  // Renderizado de botones de Favorite o Delete
  return (
    <div key={id} className={styles.card_container}>
      <img src={image} alt={title} className={styles.card_img} />

      <div className={styles.text_container}>
        <button className={styles.btn_fav} onClick={handleAddFavorite}>
          {isFavorite ? "❤️" : "🤍"}
        </button>
        <button className={styles.btn_del} onClick={handleDeleteRecipe}>
          X
        </button>
        <Link to={`/detail/${id}`} style={{ textDecoration: "none" }}>
          <h2 className={styles.card_title}>{title}</h2>
          <h2 className={styles.text_price}>$ {pricePerServing}</h2>
        </Link>
      </div>
    </div>
  );
};

export default Card;

/* 
{vegan ? <h3 className={styles.card_text}>Vegan</h3> : ""}
{vegetarian ? <h3 className={styles.card_text}>Vegetarian</h3> : ""}
{glutenFree ? <h3 className={styles.card_text}>Gluten Free</h3> : ""}
{veryPopular ? <h3 className={styles.card_text}>Popular</h3> : <h3>Exotic</h3>}
*/
