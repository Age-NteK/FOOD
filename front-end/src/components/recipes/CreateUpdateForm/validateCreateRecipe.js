//No aparecen errores porque ya estan validados en el hook useCreateRecipe

const validateCreateRecipe = (formData) => {
  const regexURL = /^https:\/\/[^\s/$.?#].[^\s]*$/;
  const errors = {};

  // Validate the 'title' field
  if (!formData.title.trim()) {
    errors.title = "You must enter a title";
  }

  // Validate the 'summary' field
  if (!formData.summary.trim()) {
    errors.summary = "You must enter a summary";
  }

  // Validate the 'image' field
  if (!formData.image.trim()) {
    errors.image = "You must enter an image URL";
  } else if (!regexURL.test(formData.image)) {
    errors.image = "You must enter a valid URL";
  }

  // Validate the 'healthScore' field (assuming it's a number)
  if (!Array.isArray(formData.steps) || formData.steps.length === 0) {
    console.log("Steps Error: You must enter at least one step");
    errors.steps = "You must enter at least one step";
  } else {
    formData.steps.forEach((stepObject, index) => {
      if (!stepObject.step.trim()) {
        console.log(`Steps Error: Step ${index} must be a non-empty string`);
        errors[`steps[${index}].step`] = "Step must be a non-empty string";
      }
    });
  }

  // Validate the 'veryPopular' field (assuming it's a boolean)
  if (formData.veryPopular !== true && formData.veryPopular !== false) {
    errors.veryPopular = "Very Popular must be a boolean value";
    console.log(errors.veryPopular);
  }

  // Validate the 'healthScore' field (assuming it's a number)
  if (
    isNaN(formData.healthScore) ||
    formData.healthScore < 0 ||
    formData.healthScore > 100
  ) {
    console.log(
      "Health Score Error: Health score must be a number between 0 and 100"
    );
    errors.healthScore = "Health score must be a number between 0 and 100";
  }

  // Validate the 'pricePerServing' field (assuming it's a number)
  if (isNaN(formData.pricePerServing) || formData.pricePerServing < 0) {
    errors.pricePerServing = "Price per serving must be a positive number";
  }

  // Validate the 'diets' field (assuming it's an array)
  if (!Array.isArray(formData.diets) || formData.diets.length === 0) {
    errors.diets = "You must select at least one diet";
  }

  return errors;
};

export default validateCreateRecipe;
