import "../layout/style.scss";
import "../layout/recommended.scss";
import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from "react-bootstrap";
import { Carousel } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import connection from "../services/connection";
import { Link } from "react-router-dom";
import Zdjecie from "../images/main.jpg";
import Zdjecie2 from "../images/beach1.jpg";
import Zdjecie3 from "../images/forest1.jpg";
import Zdjecie4 from "../images/light1.jpg";
import Zdjecie5 from "../images/mountain1.jpg";
import Zdjecie6 from "../images/forest2.jpg";



const Recomemended = () => {

  const [locations, setLocations] = useState(null);
  const dummyImages = [Zdjecie, Zdjecie2, Zdjecie3, Zdjecie4, Zdjecie5, Zdjecie6];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const locationsData = await connection.getAllLocations();
        const shuffledLocations = shuffleArray(locationsData);
        const selectedLocations = shuffledLocations.slice(0, 6);
        console.log(selectedLocations);
        setLocations(selectedLocations);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchData();
  }, []);

  const shuffleArray = (array) => {
    const shuffledArray = array.slice();
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
  };

  return (
    <section id="recommended" className="pad-page">
      <div className="header-page w-100" style={{padding: '0 10px'}}>Sprawdź <span>dostępne</span> nieruchomości</div>
    <Container fluid>
      <Row>
        {locations && locations.map((location, index) => (
            <Col key={index} xs={12} sm={6} md={4} xxl={2} className="recommended-element-container">
              <Link to={`/property/${location.property_id}`}>
                <div className="recommended-element shadow-lg d-flex flex-column justify-content-between">
                <div>
                  <Carousel indicators={false} interval={null}>
                    {dummyImages.map((image, i) => (
                      <Carousel.Item key={i}>
                        <img src={image} alt={`Image ${i + 1}`} />
                        <Carousel.Caption></Carousel.Caption>
                      </Carousel.Item>
                    ))}
                  </Carousel>
                  <div className="recommended-info">
                    <h4>{location.prop_name}</h4>
                    <p>{`${location.prop_country}, ${location.prop_town}`}</p>
                  </div>
                  <div className="d-flex justify-content-between align-items-end recommended-price-container">
                    <div className="recommended-price">
                      {`${location.price}zł  `}
                      <span>za noc</span>
                    </div>
                  </div>
                </div>
                </div>
              </Link>
            </Col>
          ))}
        </Row>
     </Container>
     </section>
     
  );
};

export default Recomemended;

        {/*  <Container fluid >
            <Row>
                <Col xs={12} className="header-page">Najlepiej <span>oceniane</span> lokacje</Col>
                
                <Col xs={12} sm={6} md={4} xxl={2} className="recommended-element-container"> 
                   <div className="recommended-element shadow-lg d-flex flex-column justify-content-between">
                   <div>
                   <Carousel 
                    indicators={false}
                    interval={null}
                    >
                    <Carousel.Item>
                      <img src={Zdjecie} />
                      <Carousel.Caption>
                      </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                      <img src={Zdjecie2} />
                      <Carousel.Caption>
                      </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                      <img src={Zdjecie} />
                      <Carousel.Caption>
                      </Carousel.Caption>
                    </Carousel.Item>
                  </Carousel>
                    <div className="recommended-info">
                      <h4>Nazwa budynku</h4>
                      <p>Polska, Chełmno</p>
                    </div>
                    </div>
                    <div className="d-flex justify-content-between align-items-end recommended-price-container">
                        <div className="recommended-price">
                          1000zł&nbsp;<span>za noc</span>
                        </div>
                        <div>aa</div>
                      </div>
                  </div>
                </Col>
                </Row>
              </Container>
            </section>

                <Col xs={12} sm={6} md={4} xxl={2} className="recommended-element-container"> 
                   <div className="recommended-element shadow-lg d-flex flex-column justify-content-between">
                   <div>
                   <Carousel 
                    indicators={false}
                    interval={null}
                    >
                    <Carousel.Item>
                      <img src={Zdjecie} />
                      <Carousel.Caption>
                      </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                      <img src={Zdjecie2} />
                      <Carousel.Caption>
                      </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                      <img src={Zdjecie} />
                      <Carousel.Caption>
                      </Carousel.Caption>
                    </Carousel.Item>
                  </Carousel>
                    <div className="recommended-info">
                      <h4>Nazwa budynku</h4>
                      <p>Polska, Chełmno</p>
                    </div>
                    </div>
                    <div className="d-flex justify-content-between align-items-end recommended-price-container">
                        <div className="recommended-price">
                          1000zł&nbsp;<span>za noc</span>
                        </div>
                        <div>aa</div>
                      </div>
                  </div>
                </Col>

                <Col xs={12} sm={6} md={4} xxl={2} className="recommended-element-container"> 
                   <div className="recommended-element shadow-lg d-flex flex-column justify-content-between">
                   <div>
                   <Carousel 
                    indicators={false}
                    interval={null}
                    >
                    <Carousel.Item>
                      <img src={Zdjecie} />
                      <Carousel.Caption>
                      </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                      <img src={Zdjecie2} />
                      <Carousel.Caption>
                      </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                      <img src={Zdjecie} />
                      <Carousel.Caption>
                      </Carousel.Caption>
                    </Carousel.Item>
                  </Carousel>
                    <div className="recommended-info">
                      <h4>Nazwa budynku</h4>
                      <p>Polska, Chełmno</p>
                    </div>
                    </div>
                    <div className="d-flex justify-content-between align-items-end recommended-price-container">
                        <div className="recommended-price">
                          1000zł&nbsp;<span>za noc</span>
                        </div>
                        <div>aa</div>
                      </div>
                  </div>
                </Col>

                <Col xs={12} sm={6} md={4} xxl={2} className="recommended-element-container"> 
                   <div className="recommended-element shadow-lg d-flex flex-column justify-content-between">
                   <div>
                   <Carousel 
                    indicators={false}
                    interval={null}
                    >
                    <Carousel.Item>
                      <img src={Zdjecie} />
                      <Carousel.Caption>
                      </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                      <img src={Zdjecie2} />
                      <Carousel.Caption>
                      </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                      <img src={Zdjecie} />
                      <Carousel.Caption>
                      </Carousel.Caption>
                    </Carousel.Item>
                  </Carousel>
                    <div className="recommended-info">
                      <h4>Nazwa budynku</h4>
                      <p>Polska, Chełmno</p>
                    </div>
                    </div>
                    <div className="d-flex justify-content-between align-items-end recommended-price-container">
                        <div className="recommended-price">
                          1000zł&nbsp;<span>za noc</span>
                        </div>
                        <div>aa</div>
                      </div>
                  </div>
                </Col>

                <Col xs={12} sm={6} md={4} xxl={2} className="recommended-element-container"> 
                   <div className="recommended-element shadow-lg d-flex flex-column justify-content-between">
                   <div>
                   <Carousel 
                    indicators={false}
                    interval={null}
                    >
                    <Carousel.Item>
                      <img src={Zdjecie} />
                      <Carousel.Caption>
                      </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                      <img src={Zdjecie2} />
                      <Carousel.Caption>
                      </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                      <img src={Zdjecie} />
                      <Carousel.Caption>
                      </Carousel.Caption>
                    </Carousel.Item>
                  </Carousel>
                    <div className="recommended-info">
                      <h4>Nazwa budynku</h4>
                      <p>Polska, Chełmno</p>
                    </div>
                    </div>
                    <div className="d-flex justify-content-between align-items-end recommended-price-container">
                        <div className="recommended-price">
                          1000zł&nbsp;<span>za noc</span>
                        </div>
                        <div>aa</div>
                      </div>
                  </div>
                </Col>

                <Col xs={12} sm={6} md={4} xxl={2} className="recommended-element-container"> 
                   <div className="recommended-element shadow-lg d-flex flex-column justify-content-between">
                   <div>
                   <Carousel 
                    indicators={false}
                    interval={null}
                    >
                    <Carousel.Item>
                      <img src={Zdjecie} />
                      <Carousel.Caption>
                      </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                      <img src={Zdjecie2} />
                      <Carousel.Caption>
                      </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                      <img src={Zdjecie} />
                      <Carousel.Caption>
                      </Carousel.Caption>
                    </Carousel.Item>
                  </Carousel>
                    <div className="recommended-info">
                      <h4>Nazwa budynku</h4>
                      <p>Polska, Chełmno</p>
                    </div>
                    </div>
                    <div className="d-flex justify-content-between align-items-end recommended-price-container">
                        <div className="recommended-price">
                          1000zł&nbsp;<span>za noc</span>
                        </div>
                        <div>aa</div>
                      </div>
                  </div>
                </Col>

                

            </Row>
        </Container> */}

