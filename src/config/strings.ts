import LocalizedStrings from "react-localization";

const strings = new LocalizedStrings({
  en: {
    login: {
      title: "Login",
      text: `Don't have an account? `,
      link: "Sign Up.",
    },
    signUp: {
      title: "Sign Up",
    },
  },
});

export default strings;
