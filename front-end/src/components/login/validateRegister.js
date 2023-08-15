const validateRegister = (formData) => {
  const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  const regexPassword = /^(?=(.*\d){3})(?=(.*[A-Za-z]){3})[A-Za-z\d]{6,}$/;
  const regexPhone = /^\+?\d{1,3}[-.\s]?\d{3,}-?(\d{2,}-?\d{2,})?$/;
  const errors = {};

  if (!formData.username.trim()) {
    errors.username = "You must to enter a Username";
  }

  if (!formData.email.trim()) {
    errors.email = "You must to enter a Email";
  } else if (!regexEmail.test(formData.email)) {
    errors.email = "You must to enter a valid email";
  }

  if (!formData.password.trim()) {
    errors.password = "You must to enter a Password";
  } else if (!regexPassword.test(formData.password)) {
    errors.password =
      "The password must have at least 3 numbers and three letters.";
  }

  if (!formData.firstName.trim()) {
    errors.firstName = "You must to enter a First Name";
  }

  if (!formData.lastName.trim()) {
    errors.lastName = "You must to enter a Last Name";
  }

  if (!formData.phoneNumber.trim()) {
    errors.phoneNumber = "You must to enter a Phone Number";
  } else if (!regexPhone.test(formData.phoneNumber)) {
    errors.phoneNumber = "You must to enter a valid Phone Number";
  }
  return errors;
};

export default validateRegister;
