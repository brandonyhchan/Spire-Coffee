import LocalizedStrings from "react-localization";

const strings = new LocalizedStrings({
  en: {
    global: {
      title: "SpireCoffee",
      usernameLabel: "Username",
      firstNameLabel: "First Name",
      lastNameLabel: "Last Name",
      emailLabel: "Email Address",
      passwordLabel: "Password",
      verifyPasswordLabel: "Confirm Password",
    },
    login: {
      button: "Login",
      description: `Got that craving while studying? Can’t find a spot to do your work? 
      We’ve been there but have you BeanHere? Join now and discover new cafes.`,
      text: `Don't have an account? `,
      link: "Sign up",
      helmet: "Login",
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
      filter: {
        filterByDistance: "Distance (km)",
        filterByBusyness: "Busyness",
        filterByNoiseLevel: "Noise Level",
        filterByPrice: "Price",
        filterByAmenities: "Amenities",
        filterTitle: "Filters",
        clearFilters: "Clear Filters",
        applyFilters: "Apply Filters",
        sortBy: "Sort",
      },
      noResultsMessage:
        "No results found! Can't find the cafe you're looking for? ",
      seeMoreResults: "More Results",
      addCafe: "Add a cafe.",
      errorMessage: "Oops! There was a loading error, please try again later.",
      searchBarText: "Search...",
    },
    aboutUs: {
      title: "About us page",
      helmet: "Who we are",
    },
    account: {
      title: "Account Information",
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
      noisiness1: "Not too noisy",
      noisiness2: "A little noisy",
      noisiness3: "Very noisy",
      price1: "$",
      price2: "$$",
      price3: "$$$",
      amenities1: "Has outlets",
      amenities2: "Has tables",
      amenities3: "Has outdoor seating",
      sort1: "Alphabetical - (A-Z)",
      sort2: "Alphabetical - (Z-A)",
      sort3: "Price - Low to High",
      sort4: "Price - High to Low",
    },
    cafeCard: {
      busynessLabel: "Busyness",
      noisinessLabel: "Noisiness",
    },
  },
});

export default strings;
