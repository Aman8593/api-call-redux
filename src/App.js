import "./App.scss";
import { Input, Card, Pagination } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllDetailsApiCall } from "./features/slice";

const { Meta } = Card;
const { Search } = Input;

function App() {
  const dispatch = useDispatch();

  const [SearchQuery, setSearchQuery] = useState("");

  // useState for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 8;

  const { data, loading, isError, error } = useSelector(
    (state) => state.getAllDetailsApiCall
  );

  useEffect(() => {
    dispatch(getAllDetailsApiCall());
  }, [dispatch]);

  

  const onSearch = (value) => {
    setSearchQuery(value.toLowerCase());
  };

  const filterData =
    data?.filter(
      (item) =>
        item.fullName.toLowerCase().includes(SearchQuery) ||
        item.family.toLowerCase().includes(SearchQuery)
    ) || [];

    // Pagination logic

  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;

  const paginationData = filterData.slice(firstPostIndex,lastPostIndex);

  // handle page change logic
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  return (
    <div className="App">
      <div className="search">
        <Search
          placeholder="Search characters"
          onSearch={onSearch}
          style={{
            width: 200,
            marginBottom: 20,
          }}
        />
      </div>

      <div className="card-container">
        {loading && <p>Loading...</p>}
        {isError && <p>Error: {error}</p>}
        {paginationData && paginationData.length > 0
          ? paginationData.map((item) => (
              <Card
                className="card"
                key={item.id}
                style={{
                  width: 300,
                  margin: "5px",
                }}
                cover={<img alt={item.fullName} src={item.imageUrl} />}
              >
                <Meta className="card-content" title={item.fullName} description={item.family} />
              </Card>
            ))
          :  paginationData.length === 0 &&
            !loading &&
            !isError && <p>No data available.</p>}

             {/* Pagination Component */}
      
      </div>
      <div className="pagination">
        <Pagination
          current={currentPage}
          pageSize={postsPerPage}
          total={filterData.length} // Total items after filtering
          onChange={handlePageChange}
        />
      </div>
    </div>
  );
}

export default App;
