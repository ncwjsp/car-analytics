import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

function Highlights({ data }) {
  const carData = data.Cars;

  return (
    <div>
      <Row xs={2} md={6} className="g-4">
        {carData.map((car) => (
          <Col key={car.Cid}>
            <Card>
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

export default Highlights;
