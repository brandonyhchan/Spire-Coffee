import LocalizedStrings from "react-localization";

const strings = new LocalizedStrings({
  en: {
    login: {
      title: "Login",
      description: `Got that craving while studying? Can’t find a spot to do your work? 
      We’ve been there but have you BeanHere? Join now and discover new cafes.`,
      text: `Don't have an account? `,
      link: "Sign up.",
      helmet: "Login",
      usernameLabel: "Username",
      passwordLabel: "Password",
    },
    signUp: {
      title: "Create an account",
      helmet: "Sign Up",
      buttonText: "Create account",
      usernameLabel: "Username",
      firstNameLabel: "First Name",
      lastNameLabel: "Last Name",
      emailLabel: "Email Address",
      passwordLabel: "Password",
      verifyPasswordLabel: "Confirm Password",
      errorMessage: {
        username:
          "Username must be between 5-15 characters, only alphanumeric and _ are allowed",
        firstName: "First name is required",
        lastName: "Last name is required",
        email: "Please enter a valid email address",
        password:
          "Password must be 8-20 characters with 1 uppercase, 1 number, 1 special character",
        confPassword: "Please re-enter your password",
        passwordMatch: "Passwords do not match",
      },
    },
  },
});

export default strings;
