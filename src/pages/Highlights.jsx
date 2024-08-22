import CarCard from "./components/CarCard";
import { Button } from "react-bootstrap";
import HighlightedCar from "./components/HighlightedCar";
import { useState } from "react";

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
      {selectedCars.length > 0 && (
        <Button onClick={handleClearHighlightedCars} variant="danger">
          Clear
        </Button>
      )}
      <HighlightedCar
        data={selectedCars}
        onRemoveCar={handleRemoveCar}
        className="highlighted-car"
      />
      <h2>Car List</h2>
      <CarCard
        data={remainingCars}
        onSelectCar={handleSelectCar}
        className="car-card"
      />
    </div>
  );
}

export default Highlights;
