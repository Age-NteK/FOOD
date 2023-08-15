import axios from "axios";
import {
  //USERS
  LOGIN,
  REGISTER_USER,
  USER_PROFILE,
  UPDATE_USER,
  GET_MY_RECIPES,

  //RECIPES
  GET_ALL_RECIPES,
  GET_RECIPE_BY_NAME,
  GET_RECIPE_BY_ID,
  CREATE_RECIPE,
  UPDATE_RECIPE,
  DELETE_RECIPE,
  GET_DIETS_OF_ONE_RECIPE,
  //Ordenamientos Recipes
  SORT_RECIPES_TITLE,
  SORT_RECIPES_HEALTH_SCORE,
  SORT_BY_PRICE,
  //Filters Recipes
  FILTER_BY_GLUTEN_FREE,
  FILTER_BY_VEGAN,
  FILTER_BY_POPULAR,
  FILTER_BY_VEGETARIAN,

  //DIETS
  GET_ALL_DIETS,
  GET_DIET_BY_NAME,
  GET_DIET_BY_ID,
  DELETE_DIET,
  DELETE_DIET_OF_ONE_RECIPE,
  CREATE_DIET,
  GET_MY_DIETS,
  UPDATE_DIET,

  //FAVORITES
  ADD_FAVORITE,
  GET_ALL_FAVORITES,
  DELETE_FAVORITE,

  //PAGINATION
  // PAGINATION,

  //CLEAN Y RESET
  RESET,
  CLEAN,
} from "./action-types";

// ENDPOINTS
const URL_USERS = "http://localhost:3001/users";
const URL_RECIPES = "http://localhost:3001/recipes";
const URL_DIETS = "http://localhost:3001/diets";
const URL_FAVORITES = "http://localhost:3001/favorites";

//HANDLER ERROR
const handleError = (error) => {
  return error.message;
};

export const updateDiet = (userId, dietId, name) => async (dispatch) => {
  try {
    const { data } = await axios.put(
      `${URL_DIETS}/${userId}/${dietId}`,
      { name: name } // Sending an object with the updated name property
    );
    console.log(data);

    if (data) {
      dispatch({
        type: UPDATE_DIET,
        payload: data,
      });
      return data;
    }
  } catch (error) {
    handleError(error);
  }
};

export const updateRecipe = (id, formData) => async (dispatch) => {
  try {
    const { data } = await axios.patch(`${URL_RECIPES}/${id}`, formData);
    console.log(data);

    if (data) {
      dispatch({
        type: UPDATE_RECIPE,
        payload: data,
      });
      return data;
    }
  } catch (error) {
    handleError(error);
  }
};

export const getMyDiets = (userId) => async (dispatch) => {
  try {
    const { data } = await axios.get(`${URL_DIETS}/${userId}/mydiets`);

    dispatch({
      type: GET_MY_DIETS,
      payload: data.userDiets,
    });
  } catch (error) {
    handleError(error);
  }
};

export const createDiet = (formData) => async (dispatch) => {
  try {
    const { data } = await axios.post(URL_DIETS, formData);

    dispatch({
      type: CREATE_DIET,
      payload: data,
    });
  } catch (error) {
    handleError(error);
  }
};

export const createRecipe = (formData) => async (dispatch) => {
  try {
    const { data } = await axios.post(URL_RECIPES, formData);
    console.log(data);

    if (data.length) {
      return dispatch({
        type: CREATE_RECIPE,
        payload: data,
      });
    }
  } catch (error) {
    handleError(error);
  }
};

export const deleteDietOfOneRecipe = (dietName, id) => async (dispatch) => {
  try {
    const { data } = await axios.delete(`${URL_DIETS}/delete/${id}`, {
      data: { dietName },
    });
    console.log(
      `Diet ${dietName} of recipe ID: ${id} was deleted successfully`
    );

    if (data) {
      dispatch({
        type: DELETE_DIET_OF_ONE_RECIPE,
        payload: data,
      });
    }
  } catch (error) {
    handleError(error);
  }
};

export const addFavorite = (recipeId, userId) => async (dispatch) => {
  try {
    // Obtener la lista de favoritos del usuario antes de agregar un nuevo favorito
    const { data } = await axios.get(`${URL_FAVORITES}/${userId}`);
    console.log("Lista de favoritos antes de agregar:", data);

    // Realizar la solicitud para agregar el nuevo favorito
    const response = await axios.post(`${URL_FAVORITES}/${recipeId}/${userId}`);
    console.log("Respuesta de agregar favorito:", response.data);

    if (response.data) {
      dispatch({
        type: ADD_FAVORITE,
        payload: response.data,
      });
    }
  } catch (error) {
    handleError(error);
  }
};

export const getMyRecipes = (userId) => async (dispatch) => {
  try {
    const { data } = await axios.get(`${URL_USERS}/${userId}`);
    console.log(data);

    if (data) {
      dispatch({
        type: GET_MY_RECIPES,
        payload: data.userRecipes,
      });
    }
  } catch (error) {
    handleError(error);
  }
};

export const getAllFavorites = (id) => async (dispatch) => {
  try {
    const { data } = await axios.get(`${URL_FAVORITES}/${id}`);
    console.log(data);

    if (data) {
      dispatch({
        type: GET_ALL_FAVORITES,
        payload: data,
      });
    }
  } catch (error) {
    handleError(error);
  }
};

export const deleteFavorite = (recipeId, userId) => async (dispatch) => {
  try {
    const { data } = await axios.get(`${URL_FAVORITES}/${userId}`);
    console.log("Lista de favoritos antes de eliminar:", data);

    const { data: deletedData } = await axios.delete(
      `${URL_FAVORITES}/${recipeId}/${userId}`
    );
    console.log(
      "Información de la receta eliminada de favoritos:",
      deletedData
    );

    if (deletedData) {
      dispatch({
        type: DELETE_FAVORITE,
        payload: data,
      });
      console.log(`The Favorite was deleted successfully`);
    }
  } catch (error) {
    handleError(error);
  }
};

export const deleteRecipe = (id) => async (dispatch) => {
  try {
    const { data } = await axios.get(`${URL_RECIPES}/${id}`);
    console.log(data);
    const userConfirmation = window.confirm(
      `Are you sure that you want to delete this recipe?`
    );

    if (userConfirmation) {
      const { data } = await axios.delete(`${URL_RECIPES}/${id}`);
      console.log(data);

      if (data) {
        dispatch({
          type: DELETE_RECIPE,
          payload: data,
        });
        alert(`The Recipe ${data.title} was deleted successfully`);
      }
    } else {
      alert("Recipe deletion was cancelled.");
    }
  } catch (error) {
    handleError(error);
  }
};

export const getDietsOfOneRecipe = (id) => async (dispatch) => {
  try {
    const { data } = await axios.get(`${URL_RECIPES}/${id}/diets`);
    console.log(data);

    if (data) {
      dispatch({
        type: GET_DIETS_OF_ONE_RECIPE,
        payload: data,
      });
    }
  } catch (error) {
    handleError(error);
  }
};

export const deleteDiet = (id) => async (dispatch) => {
  try {
    const userConfirmation = window.confirm(
      `Are you sure that you want to delete this diet?`
    );
    if (userConfirmation) {
      const { data } = await axios.delete(`${URL_DIETS}/${id}`);
      console.log(data);

      if (data) {
        dispatch({
          type: DELETE_DIET,
        });
        alert(
          `The Diet ${data.name} was deleted successfully. Plis update to see changes.`
        );
      }
    } else {
      alert("Recipe deletion was cancelled.");
    }
  } catch (error) {
    handleError(error);
  }
};



export const loginSuccess = (payload) => ({
  type: LOGIN,
  payload: payload,
});

export const loginFailure = () => ({
  type: LOGIN,
  payload: { access: false },
});

export const getUserByEmail = (email, password) => async (dispatch) => {
  try {
    const { data } = await axios.post(`${URL_USERS}`, {
      email,
      password,
    });

    if (
      data.user &&
      data.user.email === email &&
      data.user.password === password
    ) {
      // Autenticación exitosa: email y password coinciden con la base de datos
      dispatch(loginSuccess({ userId: data.user.id, access: true }));
    } else {
      // Error de autenticación: email o password incorrectos
      dispatch(loginFailure());
    }
  } catch (error) {
    handleError(error);
  }
};

export const getUserProfile = (id) => async (dispatch) => {
  try {
    const { data } = await axios.get(`${URL_USERS}/profile/${id}`);

    console.log(data);

    if (data) {
      dispatch({
        type: USER_PROFILE,
        payload: data.user,
      });
    }
  } catch (error) {
    handleError(error);
  }
};

export const registerUser = (formData) => async (dispatch) => {
  try {
    const { data } = await axios.post(`${URL_USERS}/register`, formData);
    console.log(data);
    if (data) {
      dispatch({
        type: REGISTER_USER,
        payload: {
          newUser: data.user,
          userId: data.user.id,
        },
      });
    }
  } catch (error) {
    handleError(error);
  }
};

export const updateUser = (id, updatedData) => async (dispatch) => {
  try {
    const { data } = await axios.put(`${URL_USERS}/${id}`, updatedData);
    console.log(data);

    if (data.length > 0) {
      dispatch({
        type: UPDATE_USER,
        payload: data,
      });
    }
  } catch (error) {
    handleError(error);
  }
};

export const getAllRecipes = () => async (dispatch) => {
  try {
    const { data } = await axios.get(URL_RECIPES);
    // console.log(data)
    if (data.length) {
      dispatch({
        type: GET_ALL_RECIPES,
        payload: data.slice(0, 40),
      });
    }
  } catch (error) {
    handleError(error);
  }
};

export const getAllDiets = () => async (dispatch) => {
  try {
    const { data } = await axios.get(URL_DIETS);
    console.log(data);
    if (data.length) {
      dispatch({
        type: GET_ALL_DIETS,
        payload: data,
      });
    }
  } catch (error) {
    handleError(error);
  }
};

export const getDietById = (id) => async (dispatch) => {
  try {
    const { data } = await axios.get(`${URL_DIETS}/${id}`);
    console.log(data);
    if (data) {
      dispatch({
        type: GET_DIET_BY_ID,
        payload: data.searchDiet,
      });
    }
    // return data.searchDiet;
  } catch (error) {
    handleError(error);
  }
};

export const getRecipeById = (id) => async (dispatch) => {
  try {
    const { data } = await axios.get(`${URL_RECIPES}/${id}`);
    console.log(data.searchRecipe);
    return dispatch({
      type: GET_RECIPE_BY_ID,
      payload: data.searchRecipe,
    });
  } catch (error) {
    handleError(error);
  }
};

export const getDietByName = (name) => async (dispatch) => {
  try {
    const { data } = await axios.get(`${URL_DIETS}?name=${name}`);
    console.log(data);

    if (data && data.searchDiet) {
      return dispatch({
        type: GET_DIET_BY_NAME,
        payload: data.searchDiet,
      });
    }
  } catch (error) {
    handleError(error);
  }
};

export const getRecipeByName = (title) => async (dispatch) => {
  try {
    const { data } = await axios.get(`${URL_RECIPES}?title=${title}`);
    console.log(data);
    if (data && data.searchRecipe) {
      return dispatch({
        type: GET_RECIPE_BY_NAME,
        payload: data.searchRecipe,
      });
    }
  } catch (error) {
    handleError(error);
  }
};

export const sortRecipesTitle = (title) => {
  return { type: SORT_RECIPES_TITLE, payload: title };
};

export const sortRecipeByHealthScore = (healthScore) => {
  return { type: SORT_RECIPES_HEALTH_SCORE, payload: healthScore };
};

export const sortRecipeByPrice = (price) => {
  return { type: SORT_BY_PRICE, payload: price };
};

export const filterByVegan = (vegan) => {
  return { type: FILTER_BY_VEGAN, payload: vegan };
};

export const filterByVegetarian = (vegetarian) => {
  return { type: FILTER_BY_VEGETARIAN, payload: vegetarian };
};
export const filterByGlutenFree = (glutenFree) => {
  return { type: FILTER_BY_GLUTEN_FREE, payload: glutenFree };
};

export const filterByPopular = (popular) => {
  return { type: FILTER_BY_POPULAR, payload: popular };
};

export const reset = () => {
  return { type: RESET };
};

export const clean = () => {
  return { type: CLEAN };
};
