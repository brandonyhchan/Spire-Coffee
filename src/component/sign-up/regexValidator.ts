export default class RegexValidator {
  validUsername = new RegExp("^[a-zA-Z0-9_]{5,15}$"); // lower upper number underscore min 5 max 15

  validFirstName = new RegExp("^[A-Za-z]+$"); //include spaces in names, hyphens periods
  validLastName = new RegExp("^[A-Za-z]+$"); //include spaces, hyphens periods

  validPassword = new RegExp(
    "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])" // ^starts with at least 1 lowercase at least 1 uppercase at least 1 number at least one of the given special characters minimum length 8 max 20 $end string
  );

  validEmail = new RegExp("[a-z0-9]+@[a-z]+.[a-z]{2,3}"); //cannot end in trailing period
}
