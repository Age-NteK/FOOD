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

  //FAVORITES
  ADD_FAVORITE,
  GET_ALL_FAVORITES,
  DELETE_FAVORITE,

  //PAGINATION
  // PAGINATION,

  //CLEAN Y RESET
  RESET,
  CLEAN,
  GET_MY_DIETS,
  UPDATE_DIET,
} from "./action-types";

const initialState = {
  //USERS
  //CAMBIAR ACCESS A FALSE CUANDO TERMINE TODO
  access: false,
  newUser: [],
  userId: [],
  userProfile: [],
  updateUser: [],
  userRecipes: [],

  // RECIPES
  allRecipes: [],
  recipesCopy: [],
  recipeName: [],
  recipeCreate: [],
  updatedRecipe: [],
  deleteRecipe: [],
  recipeDiets: [],
  recipeDetail: [],

  //Ordenamientos Recipes
  recipeSortTitle: [],
  recipeHealthScore: [],
  recipePrice: [],
  //Filters Recipes
  recipeVegan: [],
  recipeVegetarian: [],
  recipePopular: [],
  recipeGlutenFree: [],

  // DIETS
  allDiets: [],
  dietsCopy: [],
  dietsName: [],
  dietsDetail: [],
  dietsDelete: [],
  dietCreate: [],
  dietId: [],
  dietName: [],
  myDiets: [],
  updateDiet: [],

  //FAVORITES
  addFavorite: [],
  allFavorites: [],
  userFavorites: [],

  // PAGINATION
  pagination: [],
};

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case UPDATE_DIET:
      console.log(payload);
      return {
        ...state,
        updateDiet: payload,
      };

    case GET_MY_DIETS:
      console.log(payload);
      return {
        ...state,
        myDiets: payload,
      };

    case CREATE_DIET:
      console.log(payload);
      return {
        ...state,
        dietCreate: payload,
      };

    case DELETE_DIET_OF_ONE_RECIPE:
      console.log(payload);
      return {
        ...state,
        dietsDelete: payload,
      };

    case GET_DIETS_OF_ONE_RECIPE:
      console.log(payload);
      return {
        ...state,
        recipeDiets: payload,
      };

    case GET_ALL_FAVORITES:
      console.log(payload);
      return {
        ...state,
        allFavorites: payload,
      };

    case ADD_FAVORITE:
      return {
        ...state,
        userFavorites: [...state.userFavorites, payload],
      };
    case DELETE_FAVORITE:
      return {
        ...state,
        userFavorites: state.userFavorites.filter((id) => id !== payload), // Remove the recipe ID from userFavorites
      };
    case DELETE_DIET:
      return {
        ...state,
      };

    case DELETE_RECIPE:
      const updatedRecipesCopy = state.recipesCopy.filter(
        (recipe) => recipe.id !== payload
      );
      return {
        ...state,
        deleteRecipe: updatedRecipesCopy,
      };

    case UPDATE_RECIPE:
      console.log(payload);
      return {
        ...state,
        recipeDetail: payload,
        allRecipes: [],
        recipesCopy: [],
        recipeName: [],
        recipeCreate: [],
        updatedRecipe: [],
        deleteRecipe: [],
        recipeDiets: [],
      };

    case CREATE_RECIPE:
      console.log(payload);
      return {
        ...state,
        recipeCreate: payload,
      };

    case GET_MY_RECIPES:
      console.log(payload);
      return {
        ...state,
        userRecipes: payload,
      };

    case LOGIN:
      console.log(payload);
      return {
        ...state,
        access: payload.access,
        userId: payload.userId,
      };

    case REGISTER_USER:
      console.log(payload);
      return {
        ...state,
        newUser: payload.newUser,
        userId: payload.userId,
      };

    case GET_RECIPE_BY_ID:
      console.log(payload);
      return {
        ...state,
        recipeDetail: payload,
        recipesCopy: [],
        recipeName: [],
      };

    case USER_PROFILE:
      console.log(payload);
      return {
        ...state,
        userProfile: payload,
      };

    case UPDATE_USER:
      console.log(payload);
      return {
        ...state,
        userProfile: {
          ...state.userProfile,
          ...payload,
        },
      };
    case GET_ALL_RECIPES:
      console.log(payload);
      return {
        ...state,
        allRecipes: payload,
        recipesCopy: [...payload],
        recipeDetail: [],
      };

    case GET_ALL_DIETS:
      console.log(payload);

      return {
        ...state,
        allDiets: payload,
        dietsCopy: [...payload],
        dietsDetail: [],
      };

    case GET_DIET_BY_ID:
      console.log(payload);
      return {
        ...state,
        dietsDetail: payload,
        dietsCopy: [],
        dietsName: [],
      };

    case GET_DIET_BY_NAME:
      console.log(payload);

      const dietNameArray = Array.isArray(payload) ? payload : [payload];
      console.log(dietNameArray);
      return {
        ...state,
        dietsName: dietNameArray,
      };

    case GET_RECIPE_BY_NAME:
      console.log(payload);
      //Porque me llega un objeto y lo quiero convertir a array
      const recipeNameArray = Array.isArray(payload) ? payload : [payload];
      console.log(recipeNameArray);
      return {
        ...state,
        recipeDetail: [],
        recipesCopy: [],
        recipeName: recipeNameArray,
      };

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
        recipeSortOption: payload,
        recipesCopy: sortedRecipes,
      };

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
        recipeHealthScore: payload,
        recipesCopy: sortByHealthScore,
      };

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
        recipePrice: payload,
        recipesCopy: sortByPrice,
      };

    case FILTER_BY_VEGAN:
      console.log(payload);
      const isVeganFilter = payload === "isVegan";
      const filteredRecipesByVegan = state.allRecipes.filter(
        (recipe) => recipe.vegan === isVeganFilter
      );
      return {
        ...state,
        recipeVegan: payload,
        recipesCopy: filteredRecipesByVegan,
      };

    case FILTER_BY_VEGETARIAN:
      console.log(payload);
      const isVegetarian = payload === "isVegetarian";
      let filteredRecipesByVegetarian = state.allRecipes.filter(
        (recipe) => recipe.vegetarian === isVegetarian
      );

      console.log(filteredRecipesByVegetarian);

      return {
        ...state,
        recipeVegetarian: payload,
        recipesCopy: filteredRecipesByVegetarian,
      };

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
        recipeGlutenFree: payload,
        recipesCopy: filteredRecipesByGlutenFree,
      };

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
        recipePopular: payload,
        recipesCopy: filteredRecipesByPopular,
      };

    case RESET:
      return {
        ...state,
        recipesCopy: [...state.allRecipes],
        recipeDetail: [],
        recipeName: [],
        recipeSortTitle: [],
        recipeHealthScore: [],
        allDiets: [],
        dietsCopy: [...state.allDiets],
        dietsName: [],
      };

    case CLEAN:
      console.log(payload);
      return {
        ...state,
        recipeDetail: [],
      };

    default:
      return { ...state };
  }
};

export default reducer;
