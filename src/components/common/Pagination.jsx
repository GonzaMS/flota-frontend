import ReactPaginate from "react-paginate";

const Pagination = ({
  pageCount,
  onPageChange,
  marginPagesDisplayed = 2,
  pageRangeDisplayed = 3,
}) => {
  return (
    <ReactPaginate
      previousLabel={<span className="px-3 py-1">« Prev</span>}
      nextLabel={<span className="px-3 py-1">Next »</span>}
      breakLabel={<span className="px-3 py-1">...</span>}
      pageCount={pageCount}
      marginPagesDisplayed={marginPagesDisplayed}
      pageRangeDisplayed={pageRangeDisplayed}
      onPageChange={onPageChange}
      containerClassName="flex items-center space-x-2 text-sm font-medium"
      pageClassName="page-item"
      pageLinkClassName="page-link px-3 py-2 border border-gray-300 rounded-md hover:bg-indigo-200 hover:text-indigo-800 transition-colors"
      previousLinkClassName="page-link px-3 py-2 border border-gray-300 rounded-md hover:bg-indigo-200 hover:text-indigo-700 transition-colors"
      nextLinkClassName="page-link px-3 py-2 border border-gray-300 rounded-md hover:bg-indigo-200 hover:text-indigo-700 transition-colors"
      breakClassName="page-item"
      activeLinkClassName="bg-indigo-700 text-white"
      activeClassName="page-item"
    />
  );
};

export default Pagination;
