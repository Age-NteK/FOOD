/*
! COMPONENTE DE RECETAS DEL USUARIO
*/

import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getMyRecipes, deleteRecipe } from "../../../redux/actions";
import { useEffect } from "react";
import styles from "./myrecipes.module.css";

/*
* Definición del componente MyRecipes
! Este componente muestra las recetas del usuario actual y permite eliminar recetas.
? Utiliza el hook useDispatch para obtener una función de despacho desde el store de Redux.
? Utiliza el hook useSelector para obtener las recetas del usuario y el ID del usuario.
? Define la función handleClick que se activa cuando el botón de eliminar se hace clic. 
? Dentro de esta función, se envía la acción deleteRecipe.
? useEffect para cargar las recetas del usuario cuando cambia el ID del usuario. Se asegura de que el valor de userId sea diferente de null antes de cargar las recetas.
? Realiza una comprobación para asegurarse de que "userRecipes" no sea "undefined" antes de acceder a su propiedad "length".
? Renderiza las recetas del usuario en la interfaz de usuario mostrando el título de la receta 
? También proporciona botones para ver, actualizar y eliminar cada receta.
*/

const MyRecipes = () => {
  const dispatch = useDispatch();
  const userRecipes = useSelector((state) => state.userRecipes);
  const userId = useSelector((state) => state.userId);
  console.log(userId);
  console.log(userRecipes);

  const handleClick = (id) => {
    dispatch(deleteRecipe(id));
    console.log(dispatch(deleteRecipe(id)));
  };

  // Array de dependencias userId y dispatch como dependencias para que se vuelva a ejecutar cuando cambien.
  useEffect(() => {
    if (userId) {
      dispatch(getMyRecipes(userId));
    }
  }, [userId, dispatch]); 

  // Añadir una comprobación para asegurarse de que "userRecipes" no sea "undefined" antes de acceder a su propiedad "length"
  if (!userRecipes) {
    return <p>Loading...</p>;
  }

  return (
    <div className={styles.myrecipes_background}>
      <div className={styles.myrecipes_img}>
        <div className={styles.myrecipes_container}>
          <div className={styles.myrecipes_center}>
            {userRecipes.length > 0 && (
              <div className={styles.myrecipes}>
                <h2 className={styles.myrecipes_title}>My Recipes</h2>
                <>
                  {userRecipes.map((recipe) => (
                    <div key={recipe.id} className={styles.myrecipes_item}>
                      <div className={styles.myrecipes_content}>
                        <Link
                          to={`/detail/${recipe.id}`}
                          style={{ textDecoration: "none" }}
                        >
                          <h3 className={styles.myrecipes_title_recipe}>
                            {recipe.title}
                          </h3>
                        </Link>
                        <div className={styles.myrecipes_container_btn}>
                          <Link
                            to={`/detail/${recipe.id}`}
                            style={{ textDecoration: "none" }}
                          >
                            <button className={styles.myrecipes_btn}>👨‍🍳</button>
                          </Link>
                          <Link
                            to={`/update/${recipe.id}`}
                            style={{ textDecoration: "none" }}
                          >
                            <button className={styles.myrecipes_btn}>🔄</button>
                          </Link>
                          <button
                            onClick={() => handleClick(recipe.id)}
                            className={styles.myrecipes_btn}
                          >
                            ❎
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyRecipes;
