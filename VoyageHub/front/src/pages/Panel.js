import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from "react-bootstrap";
import "../layout/panel.scss";
import "../layout/style.scss";
import Footer from "../components/Footer";
import { Button } from 'primereact/button';
import { Link } from "react-router-dom";
import connection from '../services/connection';

const Panel = () => {

  const [idUser, setIdUser] = useState(null);

  useEffect(() => {
    const user = async () => {
      let idUser = await connection.getCurrentID();
      setIdUser(idUser);
    }
    user();
  }, []);
  
  if (idUser == null) {
    return (
      <>
        <section id="panel" className='d-flex align-items-center justify-content-center'>
          <Container className="h-100">
          <Row className="w-100 d-flex align-items-center justify-content-center">
            <Col sm={12} md={6} lg={4} xl={4} className='panel-element-container'>
              <Link to="/login">
                <Button className='panel-element w-100' type="submit" label="Zaloguj się" />
              </Link>
            </Col>
          </Row>
          </Container>
        </section>
        <Footer/>
      </>
    );
  } else {
  return (
    <>
      <section id="panel" className='d-flex align-items-center justify-content-center'>
        <Container className="h-100">
          <Row className="w-100 d-flex align-items-center justify-content-center">
            {/* <Col sm={12} md={6} lg={4} xl={4} className='panel-element-container'>
              <Link to="/user">
                <Button className='panel-element w-100 btn-white' type="submit" label="Dane użytkownika" />
              </Link>
            </Col> */}
            <Col sm={12} md={6} lg={4} xl={4} className='panel-element-container'>
              <Link to="/add">
                <Button className='panel-element w-100' type="submit" label="Dodaj nieruchomość" />
              </Link>
            </Col>
            <Col sm={12} md={6} lg={4} xl={4} className='panel-element-container'>
              <Link to="/listed">
                <Button className='panel-element w-100 btn-white' type="submit" label="Moje nieruchomości" />
              </Link>
            </Col>
          </Row>
        </Container>
      </section>
      <Footer/>
    </>
  );}
};

export default Panel;