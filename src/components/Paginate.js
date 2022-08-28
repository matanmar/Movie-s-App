import Pagination from "react-js-pagination";
import { useState, useEffect } from "react";

const Paginate = (props) => {
  const [currentPage, setCurrentPage] = useState(1);
  // total records per page to display
  const recordPerPage = props.postsPerPage;
  // total number of the records
  const totalRecords = props.totalPosts;
  // range of pages in paginator
  const pageRange = 3;

  // set currentPage back to 1 when searching a new movie
  useEffect(() => {
    setCurrentPage(props.currentPage);
  }, [props.movieName, props.currentPage]);

  // handle change event
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    props.onChangepage(pageNumber);
    window.scrollTo(0, 0);
  };

  return (
    <div className="pagination">
      <Pagination
        prevPageText="Prev"
        nextPageText="Next"
        activePage={currentPage}
        itemsCountPerPage={recordPerPage}
        totalItemsCount={totalRecords}
        pageRangeDisplayed={pageRange}
        onChange={handlePageChange}
      />
    </div>
  );
};
export default Paginate;
