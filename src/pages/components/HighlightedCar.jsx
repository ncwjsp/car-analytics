import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

function HighlightedCar({ data, onRemoveCar }) {
  return (
    <div>
      <Row xs={1} md={3} className="g-4">
        {data.map((car) => (
          <Col key={car.Cid}>
            <Card onClick={() => onRemoveCar(car)}>
              <Card.Img src={car.Img600} />
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

export default HighlightedCar;
