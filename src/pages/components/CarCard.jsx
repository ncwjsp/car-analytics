import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

function CarCard({ data, onSelectCar }) {
  const handleCardClick = (car) => {
    onSelectCar(car);
  };

  return (
    <div>
      <Row xs={2} md={6} className="g-4">
        {data.map((car) => (
          <Col key={car.Cid}>
            <Card onClick={() => handleCardClick(car)}>
              <Card.Img src={car.Img300} />
              <Card.Body>
                <Card.Title>{car.NameMMT}</Card.Title>
                <Card.Text style={{ textAlign: "right" }}>{car.Prc}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default CarCard;
