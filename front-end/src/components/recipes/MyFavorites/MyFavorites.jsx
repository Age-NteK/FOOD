/*
! COMPONENTE DE RECETAS FAVORITAS DEL USUARIO
*/

import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllFavorites, deleteFavorite } from "../../../redux/actions";
import styles from "./myfavorites.module.css";

/*
* Definición del componente MyFavorites
! Este componente muestra las recetas favoritas del usuario actual y permite eliminar recetas de la lista de favoritos.
? Utiliza el hook useSelector para obtener las recetas favoritas del usuario y el ID del usuario.
? useEffect para cargar las recetas favoritas del usuario cuando el componente se monta o cuando cambia el ID del usuario. 
? Cuando el componente se monta o cuando cambia el ID del usuario, se llama a la acción getAllFavorites para obtener las recetas favoritas del usuario actual.
? Define la función handleRemoveFavorite que se activa cuando el botón de corazón (❤️) se hace clic para eliminar una receta de la lista de favoritos. 
? Después de eliminar la receta favorita, se llama a la acción getAllFavorites nuevamente para actualizar la lista de favoritos.
? Renderiza las recetas favoritas del usuario en la interfaz de usuario, mostrando el título y la imagen de cada receta.
? Si no hay recetas favoritas, se muestra un mensaje indicando que no se encontraron favoritas.
*/

const MyFavorites = () => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.userId);
  const allFavorites = useSelector((state) => state.allFavorites);

  useEffect(() => {
    dispatch(getAllFavorites(userId));
  }, [dispatch, userId]);

  const handleRemoveFavorite = async (favoriteId) => {
    await dispatch(deleteFavorite(favoriteId, userId));
    dispatch(getAllFavorites(userId));
  };

  return (
      <div className={styles.fav_img}>
        <div className={styles.fav_container}>
          <div className={styles.fav}>
            <h2>My Favorites</h2>
          </div>
          <div className={styles.fav_center}>
            {allFavorites?.length > 0 ? (
              allFavorites.map((favorite) => (
                <div key={favorite.RecipeId} className={styles.fav_cont_descr}>
                  <button
                    onClick={() => handleRemoveFavorite(favorite.RecipeId)}
                  >
                    ❤️
                  </button>
                  <Link to={`/detail/${favorite.RecipeId}`}>
                    <h3 className={styles.fav_title}>
                      {favorite.Recipe?.title}
                    </h3>
                    <img
                      src={favorite.Recipe?.image}
                      alt={favorite.Recipe?.title}
                    />
                  </Link>
                </div>
              ))
            ) : (
              <p>No favorites found.</p>
            )}
        </div>
      </div>
    </div>
  );
};

export default MyFavorites;
