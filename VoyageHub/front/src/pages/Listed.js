import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from "react-bootstrap";
import "../layout/listed.scss";
import "../layout/style.scss";
import Footer from "../components/Footer";
import { Button } from 'primereact/button';
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import connection from '../services/connection';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

const Listed = () => {
  
  const [userLocations, setLocations] = useState(null);
  const [idUser, setIdUser] = useState(null);

  useEffect(() => {
    const user = async () => {
      let idUser = await connection.getCurrentID();
      setIdUser(idUser);
    }
    user();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userLocations = await connection.getUserLocationsById(idUser);
        setLocations(userLocations);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [idUser]);


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
  } else if (userLocations) {
    return (
      <>
      <section id="listed" className="d-flex align-items-center justify-content-center">   
        <Container fluid>
          <Row className="d-flex align-items-center justify-content-center">               
            <Col sm={12} md={11} lg={10} xxl={9}> 
                <DataTable value={userLocations}>
                  <Column field="prop_name" header="Nazwa budynku" />
                  <Column field="prop_country" header="Kraj" />
                  <Column field="prop_town" header="Miasto" />
                  <Column field="prop_zip" header="Kod pocztowy" />
                  <Column field="prop_street" header="Ulica" />
                  <Column field="rooms" header="Liczba pokoi" />
                  <Column field="beds" header="Liczba łóżek" />
                  <Column field="price" header="Cena za noc" />
                </DataTable>
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
      <section id="listed" className="d-flex align-items-center justify-content-center">   
        <Container fluid>
          <Row className="d-flex align-items-center justify-content-center">               
            <Col xs={12} sm={6} lg={4} xxl={2} className="listed-element-container"> 
            </Col>
          </Row>
        </Container>
      </section>
      <Footer/>
      </>
    );
  }
};

export default Listed;