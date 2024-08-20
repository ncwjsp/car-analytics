import { useEffect, useState } from "react";

import PieChart from "./components/PieChart";
import BarChart from "./components/BarChart";
import CarTable from "./components/CarTable";

import "./style/Dashboard.css";

function Dashboard({ data }) {
  const cars = data.Cars;

  let totalAllCars = 0;
  let totalCarsValue = 0;

  function findTotalCarAndValue(cars) {
    const carData = [];

    cars.forEach((car) => {
      const brandModel = car.NameMMT.split(" ").slice(0, 2).join(" ");
      const [brand, model] = brandModel.split(" ");

      const price = parseFloat(car.Prc.replace(/,/g, "").replace(/\*/g, ""));

      // Find the brand in the carData array
      let brandEntry = carData.find((entry) => entry.brand === brand);

      if (!brandEntry) {
        // If the brand does not exist, create a new entry
        brandEntry = {
          brand: brand,
          totalValue: 0,
          totalCars: 0,
          valByModel: [],
        };
        carData.push(brandEntry);
      }

      brandEntry.totalValue += price;
      totalCarsValue += price;

      // Add car count
      brandEntry.totalCars += 1;
      totalAllCars += 1;

      // Find the model in the valByModel array
      let modelEntry = brandEntry.valByModel.find(
        (entry) => entry.model === model
      );

      if (!modelEntry) {
        // If the model does not exist, create a new entry
        modelEntry = {
          model: model,
          value: 0,
          totalModel: 0,
        };
        brandEntry.valByModel.push(modelEntry);
      }

      // Add the price to the model's value
      modelEntry.value += price;

      // Add count to the model's
      modelEntry.totalModel += 1;
    });

    return carData;
  }

  const carData = findTotalCarAndValue(cars);

  console.log(JSON.stringify(carData, null, 2));

  return (
    <div className="container">
      <CarTable data={carData} className="item" />
      <div className="container-charts">
        <PieChart data={carData} className="item" />
        <BarChart data={carData} className="item" />
      </div>
    </div>
  );
}

export default Dashboard;
