import React from "react";

const Pagination = ({
  usersPerPage,
  totalUsers,
  currentPage,
  setCurrentPage,
}) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalUsers / usersPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div id="pagination-page">
      <button
        className={currentPage === 1 ? "disabled" : ""}
        onClick={() => setCurrentPage(1)}
      >
        First
      </button>

      <button
        className={currentPage === 1 ? "disabled" : ""}
        onClick={() => setCurrentPage(currentPage - 1)}
      >
        Previous
      </button>

      {pageNumbers.map((number) => (
        <button
          key={number}
          className={currentPage === number ? "active" : ""}
          onClick={() => setCurrentPage(number)}
        >
          {number}
        </button>
      ))}
      <button
        className={currentPage === 5 ? "disabled" : ""}
        onClick={() => setCurrentPage(currentPage + 1)}
      >
        Next
      </button>

      <button
        className={currentPage === 5 ? "disabled" : ""}
        onClick={() => setCurrentPage(Math.ceil(totalUsers / usersPerPage))}
      >
        Last
      </button>
    </div>
  );
};

export default Pagination;
