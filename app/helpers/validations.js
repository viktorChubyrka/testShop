const isValidEmail = (email) => {
  const regEx = /\S+@\S+\.\S+/;
  return regEx.test(email);
};

const validatePassword = (password) => {
  if (password.length <= 5 || password === "") {
    return false;
  }
  return true;
};
const isEmpty = (input) => {
  if (input === undefined || input === "") {
    return true;
  }
  if (input.replace(/\s/g, "").length) {
    return false;
  }
  return true;
};
const comparePassword = (dbPassword, givenPassword) => {
  if (dbPassword === givenPassword) {
    return true;
  }
  return false;
};

module.exports = { isValidEmail, validatePassword, isEmpty, comparePassword };
