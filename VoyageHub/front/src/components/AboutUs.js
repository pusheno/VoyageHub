import React from 'react';
import "../layout/style.scss";
import "../layout/information.scss";
import 'bootstrap/dist/css/bootstrap.min.css'; 
import { Container, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';

const AboutUs = () => {

  return (
    <section id="information">   
      <Container fluid className="p-0">
        <Row className="information-row m-0">
          <Col sm={12} lg={6} className="information-image information-grid p-0">
            <div className="information-img1"></div>
            <div className="information-img2"></div>
            <div className="information-img3"></div>
          </Col>
          <Col sm={12} lg={6} className="information-info information-info-right d-flex flex-column justify-content-center align-items-center">
            <div className="header-page w-100">Odkrywaj <span>unikalne</span> miejsca</div>
            <div className="information-info-text mt-4">Zanurz się w wyjątkowym doświadczeniu podróżowania, korzystając z naszej platformy rezerwacyjnej, gdzie marzenia o wymarzonych wakacjach stają się rzeczywistością. </div>
            <div className="information-info-text color-grey mt-4">Z nami odkryjesz miejsca, które spełnią oczekiwania i stworzą niezapomnianą atmosferę. Prosty proces rezerwacji i dbałość o detale zapewniają niezapomniane podróże. Odkryj nasze unikalne miejsca i zarezerwuj teraz, by rozpocząć podróż pełną niepowtarzalnych wrażeń!</div>
            <div className="information-check-container">
              <div className="information-info-check-element mt-3">
                <div className="information-info-check d-flex align-items-center w-100">
                  <div className="information-info-icon">
                    <FontAwesomeIcon icon={faCircleCheck} />
                  </div>
                  <p className="mb-0 pl-2 w-100">Różnorodność lokalizacji</p>
                </div>
              </div>
              <div className="information-info-check-element">
                <div className="information-info-check d-flex align-items-center w-100">
                  <div className="information-info-icon">
                    <FontAwesomeIcon icon={faCircleCheck} />
                  </div>
                  <p className="mb-0 pl-2 w-100">Wyjątkowe atrakcje</p>
                </div>
              </div>
              <div className="information-info-check-element">
                <div className="information-info-check d-flex align-items-center w-100">
                  <div className="information-info-icon">
                    <FontAwesomeIcon icon={faCircleCheck} />
                  </div>
                  <p className="mb-0 pl-2 w-100">Bezbłędne rezerwacje</p>
                </div>
              </div>
              <div className="information-info-check-element">
                <div className="information-info-check d-flex align-items-center w-100">
                  <div className="information-info-icon">
                    <FontAwesomeIcon icon={faCircleCheck} />
                  </div>
                  <p className="mb-0 pl-2 w-100">Satysfakcja gości</p>
                </div>
              </div>
              <div className="information-info-check-element">
                <div className="information-info-check d-flex align-items-center w-100">
                  <div className="information-info-icon">
                    <FontAwesomeIcon icon={faCircleCheck} />
                  </div>
                  <p className="mb-0 pl-2 w-100">Ekskluzywne oferty</p>
                </div>
              </div>
              <div className="information-info-check-element">
                <div className="information-info-check d-flex align-items-center w-100">
                  <div className="information-info-icon">
                    <FontAwesomeIcon icon={faCircleCheck} />
                  </div>
                  <p className="mb-0 pl-2 w-100">Dostępność na każdą kieszeń</p>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default AboutUs;
