// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { createRecipe, getAllDiets, updateRecipe } from "../redux/actions";
// import validateRecipeForm from "../components/recipes/CreateUpdateForm/validate";

// const useCreateRecipe = (isUpdate, recipeData) => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const dietsCopy = useSelector((state) => state.dietsCopy);
//   const userId = useSelector((state) => state.userId);

//   const [formData, setFormData] = useState({
//     title: "",
//     summary: "",
//     image: "",
//     healthScore: 0,
//     steps: [{ step: "" }],
//     veryPopular: false,
//     pricePerServing: 0,
//     diets: [],
//     userId: userId,
//   });

//   const [errors, setErrors] = useState({});

//   const handleChange = (event) => {
//     const { name, value, type, checked } = event.target;

//     if (type === "checkbox") {
//       setFormData((prevData) => ({
//         ...prevData,
//         [name]: checked,
//       }));
//     } else {
//       const parsedValue =
//         name === "healthScore" && Number.isInteger(value)
//           ? parseInt(value, 10)
//           : name === "pricePerServing"
//           ? parseFloat(value)
//           : value;

//       if (name === "diets") {
//         const selectedOptions = Array.from(
//           event.target.selectedOptions,
//           (option) => option.value
//         );
//         setFormData((prevData) => ({
//           ...prevData,
//           [name]: selectedOptions,
//         }));
//       } else {
//         setFormData((prevData) => ({
//           ...prevData,
//           [name]: parsedValue,
//         }));
//       }
//     }

//     console.log("Form Data:", formData);
//   };

//   const [steps, setSteps] = useState([""]);

//   const addStep = () => {
//     setSteps((prevSteps) => [...prevSteps, ""]);
//   };

//   const removeStep = () => {
//     setSteps((prevSteps) => prevSteps.slice(0, -1));
//   };

//   const handleStepChange = (index, value) => {
//     setFormData((prevData) => {
//       const updatedSteps = [...prevData.steps];
//       updatedSteps[index] = { step: value };
//       return {
//         ...prevData,
//         steps: updatedSteps,
//       };
//     });

//     console.log("Form Data:", formData);
//   };

//   useEffect(() => {
//     if (isUpdate && recipeData) {
//       setFormData(recipeData);
//       setSteps(recipeData?.steps?.map((stepObj) => stepObj.step));
//     }
//   }, [isUpdate, recipeData]);


//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     const validationErrors = validateRecipeForm(formData);
//     setErrors(validationErrors);

//     if (Object.keys(validationErrors).length === 0) {
//       try {
//         // Update formData with userId before sending the request
//         setFormData((prevData) => ({
//           ...prevData,
//           userId: userId,
//         }));
    
//         if (isUpdate) {
//           await dispatch(updateRecipe(formData));
//         } else {
//           await dispatch(createRecipe(formData));
    
//           setFormData({
//             title: "",
//             summary: "",
//             image: "",
//             healthScore: 0,
//             steps: [],
//             veryPopular: false,
//             pricePerServing: "",
//             diets: [],
//           });
    
//           console.log("Recipe was created successfully");
//           navigate("/myrecipes");
//         }
//       } catch (error) {
//         console.error("Error creating recipe:", error.message);
//       }
//     } else {
//       console.log("Form data is invalid. Please fix the errors.");
//     }
//         }


//   useEffect(() => {
//     dispatch(getAllDiets());
//   }, [dispatch]);


//   return {
//     formData,
//     handleChange,
//     dietsCopy,
//     steps,
//     handleStepChange,
//     addStep,
//     removeStep,
//     handleSubmit,
//     errors,
//   };
// };

// export default useCreateRecipe;
