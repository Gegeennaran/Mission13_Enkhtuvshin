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
  // const maxVisiblePages = 5;

  // const getPageNumbers = () => {
  //   let start = Math.max(currentPage - Math.floor(maxVisiblePages / 2), 1);
  //   let end = start + maxVisiblePages - 1;

  //   if (end > totalPages) {
  //     end = totalPages;
  //     start = Math.max(end - maxVisiblePages + 1, 1);
  //   }

  //   const pages = [];
  //   for (let i = start; i <= end; i++) {
  //     pages.push(i);
  //   }
  //   return pages;
  // };

  // const pageNumbers = getPageNumbers();

  return (
    <>
      <div className="flex item-center justify-center mt-4">
        <button
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
        >
          Previous
        </button>

        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i + 1}
            onClick={() => onPageChange(i + 1)}
            disabled={currentPage === i + 1}
          >
            {i + 1}
          </button>
        ))}

        <button
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
        >
          Next
        </button>
        <br />
        <label>
          Result Per Page:
          <select
            value={pageSize}
            onChange={(p) => {
              onPageSizeChange(Number(p.target.value));
              onPageChange(1);
            }}
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
          </select>
        </label>
      </div>
    </>
  );
};

export default Pagination;
