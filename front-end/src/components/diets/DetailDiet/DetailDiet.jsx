import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getDietById, clean } from "../../../redux/actions";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const DetailDiet = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const dietsDetail = useSelector((state) => state.dietsDetail);
  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 9; // You can adjust the number of recipes to display per page

  useEffect(() => {
    dispatch(getDietById(id));
    return () => {
      dispatch(clean());
    };
  }, [id, dispatch]);

  const cleanSummary = (summary) => {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = summary;
    return tempDiv.innerText;
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const getTotalPages = () => {
    if (!dietsDetail || !dietsDetail.recipes) {
      return 0;
    }
    return Math.ceil(dietsDetail.recipes.length / cardsPerPage);
  };

  const totalPages = getTotalPages();
  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentRecipes = dietsDetail.recipes
    ? dietsDetail.recipes.slice(indexOfFirstCard, indexOfLastCard)
    : [];

  return (
    <>
      <div>
        <button onClick={handlePrevPage} disabled={currentPage === 1}>
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button onClick={handleNextPage} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>

      {dietsDetail ? (
        <div key={dietsDetail.searchDiet?.id}>
          <p>{dietsDetail.searchDiet?.id}</p>
          <p>{dietsDetail.searchDiet?.name}</p>
          {currentRecipes.map((recipe) => (
            <div key={recipe?.id}>
              <p>{recipe?.id}</p>
              <p>{recipe?.title}</p>
              <Link to={`/detail/${recipe.id}`}>
                <img src={recipe?.image} alt="Recipe" />
              </Link>
              <p>{recipe?.healthScore}</p>
              <p>{recipe?.pricePerServing}</p>
              <p>{recipe?.veryPopular ? "Very Popular" : "Not Very Popular"}</p>
              <p>{recipe?.vegetarian ? "Vegetarian" : "Not Vegetarian"}</p>
              <p>{recipe?.vegan ? "Vegan" : "Not Vegan"}</p>
              <p>{recipe?.dairyFree ? "DairyFree" : "Non Dairy Free"}</p>
              <p>{recipe?.glutenFree ? "Gluten-free" : "Not Gluten-free"}</p>
              {recipe?.steps.map((step, index) => (
                <p key={index}>{step.step}</p>
              ))}
              <p>{cleanSummary(recipe?.summary)}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
};

export default DetailDiet;
// import { useDispatch, useSelector } from "react-redux";
// import { useParams } from "react-router-dom";
// import { getDietRecipe, clean } from "../../../redux/actions";

// const DietDetail = () => {
//   const { dietId } = useParams();
//   const dispatch = useDispatch();
//   const dietsRecipe = useSelector((state) => state.dietsRecipe);

//   useEffect(() => {
//     dispatch(getDietRecipe(dietId));
//     return () => {
//       dispatch(clean());
//     };
//   }, [dispatch, dietId]);

//   if (!dietsRecipe) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div>
//       <h2>Detail Diet</h2>
//       <h3>Dieta: {dietsRecipe.dietId}</h3>
//       {/* Add other diet details as needed */}
//       {/* ... */}

//       {dietsRecipe.length ? (
//         <>
//           <h3>Recipes:</h3>
//           <p>Price Per Serving: {dietsRecipe.pricePerServing}</p>
//           <p>Health Score: {dietsRecipe.healthScore}</p>
//           <ul>
//             {dietsRecipe.map((recipe) => (
//               <li key={recipe.id}>
//                 <h4>{recipe.title}</h4>
//                 <p>Summary: {recipe.summary}</p>
//                 {/* Render other recipe details as needed */}
//                 <img src={recipe.image} alt={recipe.title} />
//                 {/* Render the recipe steps */}
//                 <h5>Steps:</h5>
//                 <ul>
//                   {recipe.steps.map((step, index) => (
//                     <li key={index}>{step.step}</li>
//                   ))}
//                 </ul>
//                 {/* ... */}
//               </li>
//             ))}
//           </ul>
//         </>
//       ) : (
//         <p>No recipes found for this diet.</p>
//       )}
//     </div>
//   );
// };

// export default DietDetail;
