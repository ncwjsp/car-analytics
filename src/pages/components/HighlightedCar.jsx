import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

import "./style/HighlightedCar.css";

function HighlightedCar({ data, onRemoveCar }) {
  return (
    <div className="highlighted-card-container">
      <Row xs={1} md={3} className="g-4">
        {data.map((car) => (
          <Col key={car.Cid}>
            <Card onClick={() => onRemoveCar(car)} className="highlighted-card">
              <Card.Img src={car.Img600} className="highlighted-card-img" />
              <Card.Body className="highlighted-card-body">
                <Card.Title className="highlighted-card-title">
                  {car.NameMMT}
                </Card.Title>
                <Card.Text className="highlighted-card-text">
                  {car.Prc}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default HighlightedCar;
