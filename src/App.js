import "./App.scss";
import { Input, Card } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllDetailsApiCall } from "./features/slice";

const { Meta } = Card;
const { Search } = Input;

function App() {
  const dispatch = useDispatch();

  const [SearchQuery, setSearchQuery] = useState("");

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

  return (
    <div className="App">
      <Search
        placeholder="Search characters"
        onSearch={onSearch}
        style={{
          width: 200,
          marginBottom: 20,
        }}
      />

      <div className="card-container">
        {loading && <p>Loading...</p>}
        {isError && <p>Error: {error}</p>}
        {filterData && filterData.length > 0
          ? filterData.map((item) => (
              <Card
                className="card"
                key={item.id}
                style={{
                  width: 300,
                  margin: "10px",
                }}
                cover={<img alt={item.fullName} src={item.imageUrl} />}
              >
                <Meta title={item.fullName} description={item.family} />
              </Card>
            ))
          : filterData.length === 0 && !loading && !isError && <p>No data available.</p>}
      </div>
    </div>
  );
}

export default App;
