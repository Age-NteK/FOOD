/*
! INITIALSTATE representa el estado inicial de la aplicación
! ARCHIVO QUE DEFINE QUE ASPECTO ESPECIFICO DEL ESTADO GLOBAL SE ACTUALIZARÁ EN FUNCIÓN DE LAS ACCIONES DESPACHADAS */

import {
  // ? USERS
  LOGIN,
  REGISTER_USER,
  USER_PROFILE,
  UPDATE_USER,
  GET_MY_RECIPES,
  DELETE_USER,

  // ? RECIPES
  GET_ALL_RECIPES,
  GET_RECIPE_BY_NAME,
  GET_RECIPE_BY_ID,
  CREATE_RECIPE,
  UPDATE_RECIPE,
  DELETE_RECIPE,
  GET_DIETS_OF_ONE_RECIPE,
  // * Ordenamientos Recipes
  SORT_RECIPES_TITLE,
  SORT_RECIPES_HEALTH_SCORE,
  SORT_BY_PRICE,
  // * Filters Recipes
  FILTER_BY_GLUTEN_FREE,
  FILTER_BY_VEGAN,
  FILTER_BY_POPULAR,
  FILTER_BY_VEGETARIAN,

  // ? DIETS
  GET_ALL_DIETS,
  GET_DIET_BY_NAME,
  GET_MY_DIETS,
  GET_DIET_BY_ID,
  DELETE_DIET,
  DELETE_DIET_OF_ONE_RECIPE,
  CREATE_DIET,

  // ? FAVORITES
  ADD_FAVORITE,
  GET_ALL_FAVORITES,
  DELETE_FAVORITE,

  // ? CLEAN Y RESET
  RESET,
  CLEAN,
} from "./action-types";

// ! ------------------------------------------------------------------
// ! INITIAL STATE
// ! ------------------------------------------------------------------

const initialState = {
  // ? USERS
  access: false,
  newUser: [],
  userId: [],
  userProfile: [],
  updateUser: [],
  userRecipes: [],
  userDelete: [],

  // ? RECIPES
  allRecipes: [],
  recipesCopy: [],
  recipeName: [],
  recipeDetail: [],
  recipeCreate: [],
  updatedRecipe: [],
  recipeDiets: [],
  deleteRecipe: [],

  // * Ordenamientos Recipes
  // ? - recipesCopy -

  // * Filters Recipes
  // ? - recipesCopy -

  // ? DIETS
  allDiets: [],
  dietsCopy: [],
  dietsName: [],
  dietsDetail: [],
  dietCreate: [],
  dietId: [],
  dietName: [],
  myDiets: [],
  updateDiet: [],
  dietsDelete: [],

  // ? FAVORITES
  allFavorites: [],
  userFavorites: [],
};

// ! ------------------
// - Better comments - |
// * STATE UPDATING    |
// ! ------------------

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    // ! ------------------------------------------------------------------
    // ! USERS
    // ! ------------------------------------------------------------------

    // * newUser & userId
    case REGISTER_USER:
      console.log(payload);
      return {
        ...state,
        newUser: payload.newUser,
        userId: payload.userId,
      };

    // * access & userId
    case LOGIN:
      console.log(payload);
      return {
        ...state,
        access: payload.access,
        userId: payload.userId,
      };

    // * userProfile
    case USER_PROFILE:
      console.log(payload);
      return {
        ...state,
        userProfile: payload,
      };

    // * userProfile
    case UPDATE_USER:
      console.log(payload);
      return {
        ...state,
        userProfile: {
          ...state.userProfile,
          ...payload,
        },
      };

    // * userRecipes
    case GET_MY_RECIPES:
      console.log(payload);
      return {
        ...state,
        userRecipes: payload,
      };

      // * userDelete
      case DELETE_USER:
        console.log(payload);
        return {
          ...state,
          userDelete: payload,
        };

    // ! ------------------------------------------------------------------
    // ! RECIPES
    // ! ------------------------------------------------------------------

    // * allRecipes & recipesCopy
    case GET_ALL_RECIPES:
      console.log(payload);
      return {
        ...state,
        allRecipes: payload,
        recipesCopy: [...payload],
      };

    // * recipeName
    case GET_RECIPE_BY_NAME:
      console.log(payload);
      //Porque me llega un objeto y lo quiero convertir a array
      const recipeNameArray = Array.isArray(payload) ? payload : [payload];
      console.log(recipeNameArray);
      return {
        ...state,
        recipeName: recipeNameArray,
      };

    // * recipeDetail
    case GET_RECIPE_BY_ID:
      console.log(payload);
      return {
        ...state,
        recipeDetail: payload,
      };

    // * recipeCreate
    case CREATE_RECIPE:
      console.log(payload);
      return {
        ...state,
        recipeCreate: payload,
      };

    // * recipeDetail
    case UPDATE_RECIPE:
      console.log(payload);
      return {
        ...state,
        recipeDetail: payload,
      };

    // *  recipeDiets
    case GET_DIETS_OF_ONE_RECIPE:
      console.log(payload);
      return {
        ...state,
        recipeDiets: payload,
      };

    // * deleteRecipe
    case DELETE_RECIPE:
      const updatedRecipesCopy = state.recipesCopy.filter(
        (recipe) => recipe.id !== payload
      );
      return {
        ...state,
        deleteRecipe: updatedRecipesCopy,
      };

    // ? ----------------------
    // ? ORDENAMIENTOS RECIPES
    // ? ----------------------

    // * recipesCopy
    case SORT_RECIPES_TITLE:
      let sortedRecipes = [...state.recipesCopy];
      console.log(payload);
      console.log(sortedRecipes);

      if (payload === "Asc") {
        sortedRecipes = sortedRecipes.sort((a, b) =>
          a.title.localeCompare(b.title)
        );
      } else if (payload === "Desc") {
        sortedRecipes = sortedRecipes.sort((a, b) =>
          b.title.localeCompare(a.title)
        );
      }

      return {
        ...state,
        recipesCopy: sortedRecipes,
      };

    // * recipesCopy
    case SORT_RECIPES_HEALTH_SCORE:
      console.log(payload);
      let sortByHealthScore = [...state.recipesCopy];
      console.log(sortByHealthScore);

      if (payload === "Asc") {
        sortByHealthScore.sort((a, b) => a.healthScore - b.healthScore);
      } else if (payload === "Desc") {
        sortByHealthScore.sort((a, b) => b.healthScore - a.healthScore);
      }

      return {
        ...state,
        recipesCopy: sortByHealthScore,
      };

    // * recipesCopy
    case SORT_BY_PRICE:
      console.log(payload);
      let sortByPrice = [...state.recipesCopy];

      console.log(sortByPrice);

      if (payload === "Asc") {
        sortByPrice.sort((a, b) => a.pricePerServing - b.pricePerServing);
      } else if (payload === "Desc") {
        sortByPrice.sort((a, b) => b.pricePerServing - a.pricePerServing);
      }

      return {
        ...state,
        recipesCopy: sortByPrice,
      };

    // ? ----------------------
    // ? FILTROS RECIPES
    // ? ----------------------

    // * recipesCopy
    case FILTER_BY_VEGAN:
      console.log(payload);
      const isVeganFilter = payload === "isVegan";
      const filteredRecipesByVegan = state.allRecipes.filter(
        (recipe) => recipe.vegan === isVeganFilter
      );
      return {
        ...state,
        recipesCopy: filteredRecipesByVegan,
      };

    // * recipesCopy
    case FILTER_BY_VEGETARIAN:
      console.log(payload);
      const isVegetarian = payload === "isVegetarian";
      let filteredRecipesByVegetarian = state.allRecipes.filter(
        (recipe) => recipe.vegetarian === isVegetarian
      );

      console.log(filteredRecipesByVegetarian);

      return {
        ...state,
        recipesCopy: filteredRecipesByVegetarian,
      };

    // * recipesCopy
    case FILTER_BY_GLUTEN_FREE:
      console.log(payload);
      const isGlutenFreeFilter = payload === "isGlutenFree";
      const filteredRecipesByGlutenFree = state.allRecipes.filter(
        (recipe) => recipe.glutenFree === isGlutenFreeFilter
      );

      console.log(isGlutenFreeFilter);
      console.log(filteredRecipesByGlutenFree);
      return {
        ...state,
        recipesCopy: filteredRecipesByGlutenFree,
      };

    // * recipesCopy
    case FILTER_BY_POPULAR:
      console.log(payload);
      const isPopularFilter = payload === "isPopular";
      const filteredRecipesByPopular = state.allRecipes.filter(
        (recipe) => recipe.veryPopular === isPopularFilter
      );

      console.log(isPopularFilter);
      console.log(filteredRecipesByPopular);
      return {
        ...state,
        recipesCopy: filteredRecipesByPopular,
      };

    // ! ------------------------------------------------------------------
    // ! DIETS
    // ! ------------------------------------------------------------------

    // * allDiets & dietsCopy
    case GET_ALL_DIETS:
      console.log(payload);

      return {
        ...state,
        allDiets: payload,
        dietsCopy: [...payload],
      };

    // * dietsName
    case GET_DIET_BY_NAME:
      console.log(payload);
      return {
        ...state,
        dietsName: payload,
      };

    // * dietCreate
    case CREATE_DIET:
      console.log(payload);
      return {
        ...state,
        dietCreate: payload,
      };

    // * myDiets
    case GET_MY_DIETS:
      console.log(payload);
      return {
        ...state,
        myDiets: payload,
      };

    // * dietsDetail
    case GET_DIET_BY_ID:
      console.log(payload);
      return {
        ...state,
        dietsDetail: payload,
      };

    // * deleteDiet
    case DELETE_DIET:
      return {
        ...state,
      };

    // * dietsDelete
    case DELETE_DIET_OF_ONE_RECIPE:
      console.log(payload);
      return {
        ...state,
        dietsDelete: payload,
      };

    // ! ------------------------------------------------------------------
    // ! FAVORITES
    // ! ------------------------------------------------------------------

    // * allFavorites
    case GET_ALL_FAVORITES:
      console.log(payload);
      return {
        ...state,
        allFavorites: payload,
      };

    // * userFavorites
    case ADD_FAVORITE:
      return {
        ...state,
        userFavorites: [...state.userFavorites, payload],
      };

    // * userFavorites
    case DELETE_FAVORITE:
      return {
        ...state,
        userFavorites: state.userFavorites.filter((id) => id !== payload),
      };

    // ! ------------------------------------------------------------------
    // ! RESET & CLEAN
    // ! ------------------------------------------------------------------

    case RESET:
      console.log(payload);
      return {
        ...state,
        recipesCopy: [...state.allRecipes],
        recipeDetail: [],
        recipeName: [],
        recipeSortTitle: [],
        recipeHealthScore: [],
        allDiets: [...state.allDiets],
        dietsCopy: [...state.allDiets],
        dietsName: [],
      };

    case CLEAN:
      console.log(payload);
      return {
        ...state,
        recipeDetail: [],
      };

    // ! ------------------------------------------------------------------
    // ! DEFAULT
    // ! ------------------------------------------------------------------

    default:
      return { ...state };
  }
};

export default reducer;
