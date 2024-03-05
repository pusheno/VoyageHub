import "../layout/style.scss";
import "../layout/information.scss";
import React from 'react';
import { Container, Row, Col } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css'; 
import { Button } from 'primereact/button';
import { Link } from "react-router-dom";


const Instruction = () => {

  return (
    <section id="information">   
      <Container fluid className="p-0">
          <Row className="information-row m-0 flex-reverse-md">
            <Col sm={12} lg={6} className="information-info information-info-left d-flex flex-column justify-content-center align-items-center">
              <div className="header-page w-100">Zarejestruj Się, <span>Dziel</span>, Odkrywaj!</div>
              <div className="information-info-text mt-4">Zarejestruj się i dołącz do społeczności podróżnych, gotowych odkrywać najpiękniejsze zakątki świata. Wystaw swoje nieruchomości, dzieląc się unikalnymi miejscami z podróżnymi z całego świata.</div>
              <div className="information-info-text color-grey mt-4">Twoje nieruchomości są jak klejnoty, czekające na odkrycie przez podróżnych. Wystaw je na naszej platformie i zaprezentuj piękno oraz unikalny charakter swojego miejsca. Dołącz do społeczności gospodarzy, których goście cenią za wyjątkowość i gościnność.</div>
                <div className="information-button-container w-100 mt-4">
                  <Link to="/register" className=''>
                    <Button type="submit" label="Przejdź do rejestracji" className='mt-2'/>
                  </Link>
                </div>
            </Col>
            <Col sm={12} lg={6} className="information-steps-container information-image information-otherImage p-0 d-flex justify-content-center align-items-start flex-column" >
              <div className="information-step shadow-lg"> 
                <div className="information-step-number fw-bold d-flex justify-content-center align-items-center">01</div>
                <div className="information-step-info d-flex justify-content-center align-items-start flex-column">
                  <h5 className="fw-bold">Zarejestruj się</h5>
                  <p className="m-0">Utwórz konto, dostarczając niezbędne informacje, które umożliwią Ci wystawienie nieruchomość na wynajem</p>
                </div>
              </div>
              <div className="information-step shadow-lg"> 
                <div className="information-step-number fw-bold d-flex justify-content-center align-items-center">02</div>
                <div className="information-step-info d-flex justify-content-center align-items-start flex-column">
                  <h5 className="fw-bold">Wystaw</h5>
                  <p className="m-0">Przejdź do panelu użytkownika i wypełnij szczegółowe informacje o nieruchomości, którą chcesz wystawić</p>
                </div>
              </div>
              <div className="information-step shadow-lg"> 
                <div className="information-step-number fw-bold d-flex justify-content-center align-items-center">03</div>
                <div className="information-step-info d-flex justify-content-center align-items-start flex-column">
                  <h5 className="fw-bold">Oczekuj</h5>
                  <p className="m-0">Po wystawieniu nieruchomości, cierpliwie oczekuj, aż ktoś zainteresowany zarezerwuje nocleg</p>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
    </section>
  );
};

export default Instruction;
