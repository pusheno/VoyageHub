import React from "react";
import "../layout/main.scss";
import { Container, Row, Col } from "react-bootstrap";

const Test = () => {

  return (
    <Container fluid>
      <Row>

      <Col sm={12} md={4} style={{height: "200px", backgroundColor: "red"}}>
      </Col>

      <Col sm={12} md={4} style={{height: "200px", backgroundColor: "blue"}}>
      </Col>

      <Col sm={12} md={4} style={{height: "200px", backgroundColor: "lime"}}>
      </Col>

      </Row>
    </Container>
  );
};

export default Test;
