import "../layout/style.scss";
import "../layout/attractions.scss";
import React, { useEffect } from 'react';
import { Container, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHotTubPerson, faWaterLadder, faDumbbell, faWifi, faGamepad, faFilm, faFootball, faSnowflake} from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'primereact/button';
import { Link, useNavigate } from "react-router-dom";


class Attractions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        attraction: "",
    };
}


handleSearch = (event, attractionType) => {
  event.preventDefault();

  this.setState({
    attraction: attractionType,
  });

  const searchDataAttraction = {
    attraction: attractionType,
  };

  const navigate = this.props.navigate;
  if (navigate) {
    console.log(this.props.navigate);
    navigate('/list', { state: searchDataAttraction });
  }
};

  render() {
    return (
    <section id="attractions" className="pad-page">   
      <Container>
        <Row className="d-flex justify-content-center align-items-center">

          <Col xs={12} className="header-page p-0 w-100 text-center mb-2">Znajdź coś <span>dla</span> siebie</Col>
          
          <Col xs={6} md={3} className="attractions-element ">
          <Button
            className="attractions-icon d-flex justify-content-center align-items-center"
            onClick={(event) => this.handleSearch(event, "field")}
          >
                <FontAwesomeIcon icon={faFootball} />
              </Button>
            <div className="attractions-block shadow-lg">
              <h5 className="fw-bold text-center">Boisko</h5>
              <p className="m-0 text-center">Przestrzeń dla sportu i rekreacji, doskonałe warunki do aktywności fizycznej dla wszystkich</p>
            </div>
          </Col>

          <Col xs={6} md={3} className="attractions-element ">
          <Button
            className="attractions-icon d-flex justify-content-center align-items-center"
            onClick={(event) => this.handleSearch(event, "cinema")}
          >
                <FontAwesomeIcon icon={faFilm} />
              </Button>
            <div className="attractions-block shadow-lg">
              <h5 className="fw-bold text-center">Kino domowe</h5>
              <p className="m-0 text-center">Kinowe doznania w zaciszu domu, filmy w najlepszej jakości dźwięku i obrazu</p>
            </div>
          </Col>

          <Col xs={6} md={3} className="attractions-element ">
          <Button
            className="attractions-icon d-flex justify-content-center align-items-center"
            onClick={(event) => this.handleSearch(event, "air_cond")}
          >
                <FontAwesomeIcon icon={faSnowflake} />
              </Button>
            <div className="attractions-block shadow-lg">
              <h5 className="fw-bold text-center">Klimatyzacja</h5>
              <p className="m-0 text-center">Idealna temperatura zawsze na Twoje życzenie, komfort w każdym pomieszczeniu</p>
            </div>
          </Col>
          
          <Col xs={6} md={3} className="attractions-element ">
          <Button
            className="attractions-icon d-flex justify-content-center align-items-center"
            onClick={(event) => this.handleSearch(event, "console")}
          >
                <FontAwesomeIcon icon={faGamepad} />
              </Button>
            <div className="attractions-block shadow-lg">
              <h5 className="fw-bold text-center">Konsola</h5>
              <p className="m-0 text-center"> Przyjemność rozrywki na wyciągnięcie ręki, bogaty wybór gier dla każdego</p>
            </div>
          </Col>

          <Col xs={6} md={3} className="attractions-element ">
          <Button
            className="attractions-icon d-flex justify-content-center align-items-center"
            onClick={(event) => this.handleSearch(event, "jacuzzi")}
          >
                <FontAwesomeIcon icon={faHotTubPerson} />
              </Button>
            <div className="attractions-block shadow-lg">
              <h5 className="fw-bold text-center">Jacuzzi</h5>
              <p className="m-0 text-center">Ekskluzywna strefa relaksu z hydromasażem, zapewniająca błogi odpoczynek i odprężenie</p>
              </div>
          </Col>

          <Col xs={6} md={3} className="attractions-element ">
          <Button
            className="attractions-icon d-flex justify-content-center align-items-center"
            onClick={(event) => this.handleSearch(event, "pool")}
          >
              <FontAwesomeIcon icon={faWaterLadder} />
            </Button>
            <div className="attractions-block shadow-lg">
              <h5 className="fw-bold text-center">Basen</h5>
              <p className="m-0 text-center">Baseny o różnych głębokościach, idealne zarówno dla rodzin z dziećmi, jak i entuzjastów pływania</p>
            </div>
          </Col>

          <Col xs={6} md={3} className="attractions-element ">
          <Button
            className="attractions-icon d-flex justify-content-center align-items-center"
            onClick={(event) => this.handleSearch(event, "gym")}
          >
                <FontAwesomeIcon icon={faDumbbell} />
              </Button>
            <div className="attractions-block shadow-lg">
              <h5 className="fw-bold text-center">Siłownia</h5>
              <p className="m-0 text-center">Wyposażenie do treningów, umożliwiające utrzymanie kondycji fizycznej nawet podczas wakacji</p>
            </div>
          </Col>

          <Col xs={6} md={3} className="attractions-element ">
          <Button
            className="attractions-icon d-flex justify-content-center align-items-center"
            onClick={(event) => this.handleSearch(event, "wifi")}
          >
                <FontAwesomeIcon icon={faWifi} />
              </Button>
            <div className="attractions-block shadow-lg">
              <h5 className="fw-bold text-center">Wi-fi</h5>
              <p className="m-0 text-center">Stabilne połączenie internetowe, umożliwiające łatwy dostęp do informacji, czy pracy zdalnej</p>
            </div>
          </Col>

        </Row>
      </Container>
      </section>
    );
  }
}

export default function BrowserWithRouter(props) {
  const navigate = useNavigate();
  return <Attractions {...props} navigate={navigate} />;
}
