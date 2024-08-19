import Table from "react-bootstrap/Table";
import { useState } from "react";
import "./style/CarTable.css";

function CarTable({ data }) {
  const [currentBrand, setCurrentBrand] = useState("");
  const [sortKey, setSortKey] = useState("brand");
  const [sortDirection, setSortDirection] = useState("asc");
  const [modelSortKey, setModelSortKey] = useState("model");
  const [modelSortDirection, setModelSortDirection] = useState("asc");

  const handleSort = (key) => {
    const direction =
      sortKey === key && sortDirection === "asc" ? "desc" : "asc";
    setSortKey(key);
    setSortDirection(direction);
  };

  const handleModelSort = (key) => {
    const direction =
      modelSortKey === key && modelSortDirection === "asc" ? "desc" : "asc";
    setModelSortKey(key);
    setModelSortDirection(direction);
  };

  const sortedData = [...data].sort((a, b) => {
    if (a[sortKey] < b[sortKey]) return sortDirection === "asc" ? -1 : 1;
    if (a[sortKey] > b[sortKey]) return sortDirection === "asc" ? 1 : -1;
    return 0;
  });

  const sortedModelData = currentBrand
    ? [...data.find((brand) => brand.brand === currentBrand)?.valByModel].sort(
        (a, b) => {
          if (a[modelSortKey] < b[modelSortKey])
            return modelSortDirection === "asc" ? -1 : 1;
          if (a[modelSortKey] > b[modelSortKey])
            return modelSortDirection === "asc" ? 1 : -1;
          return 0;
        }
      )
    : [];

  return (
    <div className="table-container">
      <Table bordered hover variant="dark" className="table-main">
        <thead>
          <tr>
            <th className="column-brand" onClick={() => handleSort("brand")}>
              Car Brand{" "}
              {sortKey === "brand" ? (sortDirection === "asc" ? "↑" : "↓") : ""}
            </th>
            <th
              className="column-total-cars"
              onClick={() => handleSort("totalCars")}
            >
              Total Cars{" "}
              {sortKey === "totalCars"
                ? sortDirection === "asc"
                  ? "↑"
                  : "↓"
                : ""}
            </th>
            <th
              className="column-total-value"
              onClick={() => handleSort("totalValue")}
            >
              Total Value{" "}
              {sortKey === "totalValue"
                ? sortDirection === "asc"
                  ? "↑"
                  : "↓"
                : ""}
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedData.map((brand) => (
            <tr key={brand.brand} onClick={() => setCurrentBrand(brand.brand)}>
              <td>{brand.brand}</td>
              <td>{brand.totalCars}</td>
              <td>{brand.totalValue.toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      {currentBrand && (
        <Table
          striped
          bordered
          hover
          variant="dark"
          className="table-secondary"
        >
          <thead>
            <tr>
              <th
                className="column-model"
                onClick={() => handleModelSort("model")}
              >
                Model{" "}
                {modelSortKey === "model"
                  ? modelSortDirection === "asc"
                    ? "↑"
                    : "↓"
                  : ""}
              </th>
              <th
                className="column-total-cars"
                onClick={() => handleModelSort("totalModel")}
              >
                Total Cars{" "}
                {modelSortKey === "totalModel"
                  ? modelSortDirection === "asc"
                    ? "↑"
                    : "↓"
                  : ""}
              </th>
              <th
                className="column-total-value"
                onClick={() => handleModelSort("value")}
              >
                Total Value{" "}
                {modelSortKey === "value"
                  ? modelSortDirection === "asc"
                    ? "↑"
                    : "↓"
                  : ""}
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedModelData.map((model) => (
              <tr key={model.model}>
                <td>{model.model}</td>
                <td>{model.totalModel}</td>
                <td>{model.value.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
}

export default CarTable;
