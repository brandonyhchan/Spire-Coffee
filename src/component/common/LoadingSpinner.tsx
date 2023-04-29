import React from "react";
import classNames from "classnames";
import styles from "./LoadingSpinner.module.scss";

import {
  Box,
  CircularProgress,
  createTheme,
  ThemeProvider,
} from "@mui/material";

const LoadingSpinner = () => {
  const theme = createTheme({
    palette: {
      primary: {
        main: "#3f51b5",
      },
    },
  });
  return (
    <Box className={classNames(styles.loadingSpinnerContainer)}>
      <ThemeProvider theme={theme}>
        <CircularProgress color={"primary"} size={"80px"} />
      </ThemeProvider>
    </Box>
  );
};

export default LoadingSpinner;
