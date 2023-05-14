import React from "react";
import Pagination from "@mui/material/Pagination";

type PaginationPropsType = {
  currentPage: number;
  itemCount: number;
  setCurrentPage(data: number): void;
};

const paginationComponent = ({
  currentPage,
  itemCount,
  setCurrentPage,
}: PaginationPropsType) => {
  const numPages = itemCount / 12;

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
  };
  return (
    <Pagination page={currentPage} count={numPages} onChange={handleChange} />
  );
};

export default paginationComponent;
