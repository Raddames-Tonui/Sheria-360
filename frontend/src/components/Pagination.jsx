// Pagination.jsx
import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pageNumbers = [...Array(totalPages).keys()].map(num => num + 1);

  return (
    <div className="flex justify-center mt-4">
      {currentPage > 1 && (
        <button
          onClick={() => onPageChange(currentPage - 1)}
          className="px-3 py-1 mx-1 bg-gray-300 text-gray-700 rounded-md"
        >
          Previous
        </button>
      )}
      {pageNumbers.map((number) => {
        if (number < currentPage - 1 || number > currentPage + 2) return null;
        return (
          <button
            key={number}
            onClick={() => onPageChange(number)}
            className={`px-3 py-1 mx-1 ${currentPage === number ? 'bg-lime-500 text-white' : 'bg-gray-300 text-gray-700'} rounded-md`}
          >
            {number}
          </button>
        );
      })}
      {currentPage < totalPages && (
        <button
          onClick={() => onPageChange(currentPage + 1)}
          className="px-3 py-1 mx-1 bg-gray-300 text-gray-700 rounded-md"
        >
          Next
        </button>
      )}
    </div>
  );
};

export default Pagination;
