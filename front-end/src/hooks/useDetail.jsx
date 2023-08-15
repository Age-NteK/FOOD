/*
! HOOK PERSONALIZADO PARA DETALLE DE RECETA

* Importaciones
? Se importan los módulos y componentes necesarios para el hook.
? Se importa useEffect: Hook utilizado para manejar efectos secundarios en el componente.
? Se importan useDispatch y useSelector: Hooks utilizados para acceder al estado global y enviar acciones al almacén de Redux.
? Se importa useParams: Hook utilizado para acceder a los parámetros de la URL.
? Se importan las acciones getRecipeById y clean del módulo de acciones Redux.
*/

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getRecipeById, clean } from "../redux/actions";

/*
! Definición del hook personalizado para detalle de receta 
? Se obtiene el parámetro 'id' de la URL
? Inicialización de dispatch
? Acceso al estado 'recipeDetail' mediante useSelector
? useEffect para obtener los detalles de la receta según el 'id'
? Obtener detalles de la receta utilizando la acción getRecipeById y el 'id'
? Limpiar los detalles de la receta utilizando la acción clean al desmontar el componente
? Devolver los detalles de la receta
*/

const useDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const recipeDetail = useSelector((state) => state.recipeDetail);

  console.log(recipeDetail);

  useEffect(() => {
    dispatch(getRecipeById(id));
    return () => {
      dispatch(clean());
    };
  }, [id]);

  return recipeDetail;
};

/*
! Exporto hook useDetail */
export default useDetail;
