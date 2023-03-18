export const validUsername = new RegExp("^[a-zA-Z0-9_]{5,15}$"); // lower upper number underscore min 5 max 15

export const validFirstName = new RegExp("^[A-Za-z]+$");
export const validLastName = new RegExp("^[A-Za-z]+$");

export const validPassword = new RegExp(
  "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])" // ^starts with at least 1 lowercase at least 1 uppercase at least 1 number at least one of the given special characters minimum length 8 max 20 $end string
);

export const validEmail = new RegExp("[a-z0-9]+@[a-z]+.[a-z]{2,3}");
