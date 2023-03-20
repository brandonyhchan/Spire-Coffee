export default class RegexValidator {
  validUsername = new RegExp("^[a-zA-Z0-9_]{5,15}$");

  validFirstName = new RegExp("^[A-Za-z]+(?:[A-Za-z .-]+)+$");
  validLastName = new RegExp("^[A-Za-z]+(?:[A-Za-z .-]+)+$");

  validPassword = new RegExp(
    "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])"
  );
  validEmail = new RegExp("^[a-zA-Z0-9]+[a-zA-Z0-9-.]*@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$");
}
