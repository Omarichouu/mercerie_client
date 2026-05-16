const HistoryPagination = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-center mt-6">
      {Array.from({ length: totalPages }, (_, index) => {
        const page = index + 1;
        return (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`mx-1 px-3 py-1 border rounded ${
              currentPage === page
                ? "bg-or_color text-white"
                : "bg-white dark:bg-gray-800 dark:text-white"
            }`}
          >
            {page}
          </button>
        );
      })}
    </div>
  );
};

export default HistoryPagination;
