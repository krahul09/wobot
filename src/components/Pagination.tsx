import React from "react";

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  itemsPerPage: number;
  onPageChange: React.Dispatch<React.SetStateAction<number>>;
  totalItems: number; // Optional or required, depending on use case
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  itemsPerPage,
  totalItems,
  onPageChange,
}) => {
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  const handleFirst = () => onPageChange(1);
  const handlePrevious = () => onPageChange(currentPage - 1);
  const handleNext = () => onPageChange(currentPage + 1);
  const handleLast = () => onPageChange(totalPages);

  return (
    <div className="flex items-center justify-end p-4 fixed bottom-0 right-0 w-full bg-white shadow-md">
      <span className="text-sm text-gray-600 mr-4">
        {startItem}-{endItem} of {totalItems}
      </span>

      <div className="flex items-center space-x-2">
        <button
          className="text-gray-500 hover:text-black disabled:text-gray-300"
          onClick={handleFirst}
          disabled={currentPage === 1}
        >
          &laquo;
        </button>

        <button
          className="text-gray-500 hover:text-black disabled:text-gray-300"
          onClick={handlePrevious}
          disabled={currentPage === 1}
        >
          &lt;
        </button>

        <button
          className="text-gray-500 hover:text-black disabled:text-gray-300"
          onClick={handleNext}
          disabled={currentPage === totalPages}
        >
          &gt;
        </button>

        <button
          className="text-gray-500 hover:text-black disabled:text-gray-300"
          onClick={handleLast}
          disabled={currentPage === totalPages}
        >
          &raquo;
        </button>
      </div>
    </div>
  );
};

export default Pagination;
