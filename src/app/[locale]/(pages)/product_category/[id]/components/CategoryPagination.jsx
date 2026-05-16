import { ChevronLeft, ChevronRight } from "lucide-react";

const CategoryPagination = ({ pagination, currentPage, onPageChange }) => {
  if (!pagination || pagination.totalPages <= 1) return null;

  const pages = [];
  const maxVisiblePages = 5;
  let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
  let endPage = Math.min(pagination.totalPages, startPage + maxVisiblePages - 1);

  if (endPage - startPage + 1 < maxVisiblePages) {
    startPage = Math.max(1, endPage - maxVisiblePages + 1);
  }

  for (let i = startPage; i <= endPage; i += 1) {
    pages.push(i);
  }

  return (
    <div className="flex justify-center items-center mt-8 gap-2">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={!pagination.hasPrev}
        className={`p-2 rounded-lg border ${
          !pagination.hasPrev
            ? "bg-gray-100 dark:bg-gray-800 text-gray-400 cursor-not-allowed"
            : "bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-amber-50 dark:hover:bg-amber-900/20"
        }`}
      >
        <ChevronLeft className="w-4 h-4" />
      </button>

      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`w-10 h-10 rounded-lg border flex items-center justify-center ${
            currentPage === page
              ? "bg-amber-500 text-white border-amber-500"
              : "bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:bg-amber-50 dark:hover:bg-amber-900/20"
          }`}
        >
          {page}
        </button>
      ))}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={!pagination.hasNext}
        className={`p-2 rounded-lg border ${
          !pagination.hasNext
            ? "bg-gray-100 dark:bg-gray-800 text-gray-400 cursor-not-allowed"
            : "bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-amber-50 dark:hover:bg-amber-900/20"
        }`}
      >
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
};

export default CategoryPagination;
