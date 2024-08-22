import CarCard from "./components/CarCard";
import HighlightedCar from "./components/HighlightedCar";
import { useState, useEffect } from "react";

import "./style/Highlights.css";

function Highlights({ data }) {
  const carData = data.Cars;
  const [selectedCars, setSelectedCars] = useState(() => {
    const savedCars = localStorage.getItem("selectedCars");
    return savedCars ? JSON.parse(savedCars) : [];
  });
  const [remainingCars, setRemainingCars] = useState(() => {
    const savedCars = localStorage.getItem("selectedCars");
    if (savedCars) {
      const selectedCarsIds = JSON.parse(savedCars).map((car) => car.Cid);
      return carData.filter((car) => !selectedCarsIds.includes(car.Cid));
    }
    return carData;
  });

  const handleSelectCar = (car) => {
    const updatedSelectedCars = [...selectedCars, car];
    setSelectedCars(updatedSelectedCars);
    setRemainingCars(
      remainingCars.filter((remainingCar) => remainingCar.Cid !== car.Cid)
    );
    localStorage.setItem("selectedCars", JSON.stringify(updatedSelectedCars));
  };

  const handleRemoveCar = (car) => {
    const updatedSelectedCars = selectedCars.filter(
      (selectedCar) => selectedCar.Cid !== car.Cid
    );
    setSelectedCars(updatedSelectedCars);

    // Add the removed car back to the correct position in remainingCars
    const updatedRemainingCars = [...remainingCars, car].sort((a, b) => {
      return (
        carData.findIndex((originalCar) => originalCar.Cid === a.Cid) -
        carData.findIndex((originalCar) => originalCar.Cid === b.Cid)
      );
    });
    setRemainingCars(updatedRemainingCars);

    localStorage.setItem("selectedCars", JSON.stringify(updatedSelectedCars));
  };

  const handleClearHighlightedCars = () => {
    setRemainingCars(carData);
    setSelectedCars([]);
    localStorage.removeItem("selectedCars");
  };

  return (
    <div className="highlights-container">
      <button onClick={handleClearHighlightedCars}>
        Clear Highlighted Cars
      </button>
      <HighlightedCar data={selectedCars} onRemoveCar={handleRemoveCar} />
      <CarCard data={remainingCars} onSelectCar={handleSelectCar} />
    </div>
  );
}

export default Highlights;
