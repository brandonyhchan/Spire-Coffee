import LocalizedStrings from "react-localization";

const strings = new LocalizedStrings({
  en: {
    login: {
      title: "Login",
      text: `Don't have an account? `,
      link: "Sign up.",
      helmet: "Login Page",
    },
    signUp: {
      title: "Create an account",
      helmet: "Sign Up Page",
      buttonText: "Create account",
      // firstNameLabel: "First Name",
      // lastNameLabel: "Last Name",
      // emailLabel: "Email Address",
      // passwordLabel: "Password",
      // verifyPasswordLabel: "Confirm Password",
    },
  },
});

export default strings;
