interface PaginationProps {
  currentPage: number;
  totalPages: number;
  pageSize: number;
  onPageChange: (newPage: number) => void;
  onPageSizeChange: (newSize: number) => void;
}

const Pagination = ({
  currentPage,
  totalPages,
  pageSize,
  onPageChange,
  onPageSizeChange,
}: PaginationProps) => {
  const maxVisiblePages = 5;

  const getPageNumbers = () => {
    let start = Math.max(currentPage - Math.floor(maxVisiblePages / 2), 1);
    let end = start + maxVisiblePages - 1;

    if (end > totalPages) {
      end = totalPages;
      start = Math.max(end - maxVisiblePages + 1, 1);
    }

    const pages = [];
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="flex flex-wrap items-center justify-center gap-2 mt-4">
      <button
        disabled={currentPage === 1}
        className="px-2 py-1 border rounded disabled:opacity-50"
        onClick={() => onPageChange(currentPage - 1)}
      >
        Previous
      </button>

      {pageNumbers.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          disabled={currentPage === page}
          className={`px-2 py-1 border rounded ${
            currentPage === page ? "bg-blue-500 text-white" : ""
          }`}
        >
          {page}
        </button>
      ))}

      <button
        disabled={currentPage === totalPages}
        className="px-2 py-1 border rounded disabled:opacity-50"
        onClick={() => onPageChange(currentPage + 1)}
      >
        Next
      </button>

      <label className="ml-4 flex items-center gap-2">
        Results per page:
        <select
          className="border p-1 rounded"
          value={pageSize}
          onChange={(e) => {
            onPageSizeChange(Number(e.target.value));
            onPageChange(1); // reset to page 1 when changing size
          }}
        >
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="50">50</option>
        </select>
      </label>
    </div>
  );
};

export default Pagination;
