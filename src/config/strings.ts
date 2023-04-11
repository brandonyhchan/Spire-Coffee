import LocalizedStrings from "react-localization";

const strings = new LocalizedStrings({
  en: {
    global: {
      title: "SpireCoffee",
    },
    login: {
      button: "Login",
      description: `Got that craving while studying? Can’t find a spot to do your work? 
      We’ve been there but have you BeanHere? Join now and discover new cafes.`,
      text: `Don't have an account? `,
      link: "Sign up",
      helmet: "Login",
      usernameLabel: "Username",
      passwordLabel: "Password",
      errorMessage: {
        invalid: "Username or password is incorrect",
        username: "Username is required",
        password: "Password is required",
      },
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
        username: "Length must be 5-15 characters, letters and '_' allowed",
        firstName: "First name is required",
        lastName: "Last name is required",
        email: "Please enter a valid email address",
        password: "Length must be 8-20 characters",
        passwordChar: "Include 1 uppercase, 1 number, 1 special character",
        confPassword: "Please re-enter your password",
        passwordMatch: "Passwords do not match",
        message: "Please fill in all required fields",
      },
    },
    explore: {
      title: "Explore",
      helmet: "Explore",
      filterByDistance: "Distance (km)",
      filterByBusyness: "Busyness",
      filterByNoiseLevel: "Noise Level",
      filterByPrice: "Price",
      filterByAmenities: "Amenities",
    },
    aboutUs: {
      title: "About us page",
      helmet: "Who we are",
    },
    account: {
      title: "Account Page",
      helmet: "Account",
    },
    addCafe: {
      title: "Add Cafe Page",
      helmet: "Add a Cafe",
    },
    faq: {
      title: "FAQ Page",
      helmet: "FAQ",
    },
    favourites: {
      title: "Favourites Page",
      helmet: "Favourites",
    },
    footer: {
      copyright: "Copyright © 2023 SpireTech, Inc",
      email: "spiretechconsulting@gmail.com",
      about: "About",
      like: "Like us?",
      help: "Help us out",
      connect: "Let's Connect",
    },
    list: {
      busyness1: "Not too busy",
      busyness2: "A little busy",
      busyness3: "Very Busy",
      quietness1: "Quiet",
      quietness2: "A little nosy",
      quietness3: "Very loud",
      amenities1: "Has outlets",
      amenities2: "Has tables",
      amenities3: "Has outdoor seating",
      price1: "$",
      price2: "$$",
      price3: "$$$",
    },
    cafeCard: {
      busynessLabel: "Busyness",
      noisinessLabel: "Noisiness",
      seeMore: "See more",
    },
  },
});

export default strings;
