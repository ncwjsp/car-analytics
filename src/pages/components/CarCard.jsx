import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

import "./style/CarCard.css";

function CarCard({ data, onSelectCar }) {
  const handleCardClick = (car) => {
    onSelectCar(car);
  };

  return (
    <div>
      <Row xs={2} md={6} className="g-4">
        {data.map((car) => (
          <Col key={car.Cid} className="d-flex align-items-stretch">
            <Card onClick={() => handleCardClick(car)} className="card">
              <Card.Img src={car.Img300} />
              <Card.Body className="card-body">
                <Card.Title>{car.NameMMT}</Card.Title>
                <Card.Text className="card-body-text">{car.Prc}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default CarCard;
