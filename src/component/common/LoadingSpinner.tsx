import React from "react";
import classNames from "classnames";
import {
  Box,
  CircularProgress,
  createTheme,
  ThemeProvider,
} from "@mui/material";

type LoadingSpinnerPropsType = {
  className?: string;
};

const LoadingSpinner = ({ className }: LoadingSpinnerPropsType) => {
  const theme = createTheme({
    palette: {
      primary: {
        main: "#3f51b5",
      },
    },
  });
  return (
    <Box className={classNames(className)}>
      <ThemeProvider theme={theme}>
        <CircularProgress color={"primary"} size={"80px"} />
      </ThemeProvider>
    </Box>
  );
};

export default LoadingSpinner;
