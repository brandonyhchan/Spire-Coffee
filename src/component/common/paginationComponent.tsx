import React from "react";
import Pagination from "@mui/material/Pagination";

type PaginationPropsType = {
  currentPage: number;
  itemCount: number;
  setCurrentPage(data: number): void;
};

const PaginationComponent = ({
  currentPage,
  itemCount,
  setCurrentPage,
}: PaginationPropsType) => {
  const numPages = Math.round(itemCount / 12) + 1;

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    event.preventDefault();
    setCurrentPage(value);
  };
  return (
    <Pagination
      page={currentPage}
      count={numPages}
      onChange={handleChange}
      size="large"
    />
  );
};

export default PaginationComponent;
