type PaginationProps = {
  currentPage: number;
  totalRecords: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({ currentPage, totalRecords, onPageChange }: PaginationProps) => {
  const totalPages = Math.ceil(totalRecords / 2);
  console.log(totalPages, totalRecords)

  return (
    <div className="flex items-center justify-center space-x-2">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="p-2 border border-gray-300 rounded-md"
      >
        Previous
      </button>
      <span>{`Page ${currentPage} of ${totalPages}`}</span>
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="p-2 border border-gray-300 rounded-md"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
