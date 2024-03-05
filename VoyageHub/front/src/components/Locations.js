import "../layout/style.scss";
import "../layout/locations.scss";
import "../layout/filter.scss";
import React, { useState, useEffect } from 'react';
import { Container, Row, Nav, Navbar, Col } from "react-bootstrap";
import Zdjecie from "../images/main.jpg";
import Zdjecie2 from "../images/beach1.jpg";
import Zdjecie3 from "../images/forest1.jpg";
import Zdjecie4 from "../images/light1.jpg";
import Zdjecie5 from "../images/mountain1.jpg";
import Zdjecie6 from "../images/forest2.jpg";
import { Carousel } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import connection from "../services/connection";
import { Link } from 'react-router-dom';
import { Button } from 'primereact/button';
import { Checkbox } from 'primereact/checkbox';
import { Dialog } from 'primereact/dialog';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter } from '@fortawesome/free-solid-svg-icons';
import { useLocation } from 'react-router-dom';


const Locations = () => {
  const dummyImages = [Zdjecie, Zdjecie2, Zdjecie3, Zdjecie4, Zdjecie5, Zdjecie6];
  const [originalLocations, setOriginalLocations] = useState([]);
  const [locations, setLocations] = useState([]);
  const [reservations, setReservations] = useState([]);


  const [visible, setVisible] = useState(false);
  const [options, setOptions] = useState([]);

  const location = useLocation();
  const searchData = location.state;
  const searchDataAttraction = location.state;

  const [locationInput, setLocationInput] = useState('');
  const [dateInput, setDateInput] = useState([]);
  const [guestsInput, setGuestsInput] = useState('');


    const polishToEnglishMap = {
      'Basen': 'pool',
      'Jacuzzi': 'jacuzzi',
      'Siłownia': 'gym',
      'Sauna': 'sauna',
      'Sala kinowa': 'cinema',
      'Boisko': 'field',
      'Klimatyzacja': 'air_cond',
      'Telewizja': 'tv',
      'Konsola': 'console',
      'Nagłośnienie': 'speakers',
      'Gry': 'video_games',
      'Portale streamingowe': 'streamings',
      'Wi-Fi': 'wifi',
      'Mable ogrodowe': 'furniture',
      'Grill': 'grill',
      'Leżaki': 'deckchairs',
      'Ognisko': 'fireplace',
      'Miejsce na piknik': 'picnic',
      'Taras': 'tarrace',
      'Parking': 'parking',
      'Szafa': 'wardrobe',
      'Kanapa': 'sofa',
      'Lampy': 'lamp',
      'Fotele': 'armchair',
      'Wieszaki': 'hanger',
      'Prysznik': 'shower',
      'Wanna': 'bath',
      'Bidet': 'bidet',
      'Pralka': 'washing_mach',
      'Żelazko': 'iron',
      'Ręczniki': 'towels',
      'Kosmetyki': 'cosmetics',
      'Ekspres do kawy': 'coffe_mach',
      'Mikrofalówka': 'microwave',
      'Lodówka': 'fridge',
      'Czajnik': 'kettle',
      'Kuchenka': 'cooker',
      'Piekarnik': 'stove',
      'Toster': 'toaster',
      'Zamrażalka': 'freezer',
    };

    const categories = [
        { title: 'Rozrywka', items: ['Basen', 'Jacuzzi', 'Siłownia', 'Sauna', 'Sala kinowa', 'Boisko'] },
        { title: 'Udogodnienia', items: ['Klimatyzacja', 'Telewizja', 'Konsola', 'Nagłośnienie', 'Gry', 'Portale streamingowe', 'Wi-Fi'] },
        { title: 'Ogród', items: ['Mable ogrodowe', 'Grill', 'Leżaki', 'Ognisko', 'Miejsce na piknik', 'Taras', 'Parking'] },
        { title: 'Pokoje', items: ['Szafa', 'Kanapa', 'Lampy', 'Fotele', 'Wieszaki'] },
        { title: 'Łazienka', items: ['Prysznik', 'Wanna', 'Bidet', 'Pralka', 'Żelazko', 'Ręczniki', 'Kosmetyki'] },
        { title: 'Kuchnia', items: ['Ekspres do kawy', 'Mikrofalówka', 'Lodówka', 'Czajnik', 'Kuchenka', 'Piekarnik', 'Toster', 'Zamrażalka'] },
    ];

    const onOptionsChange = (e) => {
      let _options = [...options];
      const englishOption = polishToEnglishMap[e.value];
    
      if (e.checked) {
        _options.push(englishOption);
      } else {
        _options = _options.filter(option => option !== englishOption);
      }
    
      setOptions(_options);
    };
  
    useEffect(() => {
      console.log(searchDataAttraction.attraction);
      const fetchData2 = async () => {
        try {
          const reservationsData = await connection.getAllreservations();
          setReservations(reservationsData);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
      
      const fetchData = async () => {
        try {
          const locationsData = await connection.getAllLocations();
          console.log(locationsData);
      
          let filteredLocations = locationsData;

          if (searchDataAttraction.attraction) {
            const attractionKey = searchDataAttraction.attraction.toLowerCase();
            filteredLocations = filteredLocations.filter(
              (location) => location[attractionKey] === 1
            );
          }
      
          if (locationInput && locationInput !== 'Dowolna') {
            filteredLocations = filteredLocations.filter(
              (location) => location.prop_town.toLowerCase() === locationInput.toLowerCase()
            );
          }
      
          if (guestsInput && guestsInput !== 'Dowolna') {
            filteredLocations = filteredLocations.filter(
              (location) => location.beds >= parseInt(guestsInput, 10)
            );
          }

          if (dateInput.length > 0) {
            const startDate = new Date(dateInput[0]);
            const endDate = new Date(dateInput[1]);
            filteredLocations = filteredLocations.filter(
              (location) => !isLocationReserved(location.property_id, startDate, endDate)
            );
          }

          
      
          if (options.length > 0) {
            filteredLocations = filteredLocations.filter((location) =>
              options.every((option) => location[option] === 1)
            );
          }
          
      
          setLocations(filteredLocations);
          setOriginalLocations(filteredLocations);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
      
    
      if (searchData) {
        setLocationInput(searchData.location || 'Dowolna');
        setDateInput(searchData.date || []);
        setGuestsInput(searchData.guests || 'Dowolna');
      }

      fetchData2();
      fetchData();
    }, [searchData, searchDataAttraction, locationInput, guestsInput, options]);
  
    const filterLocations = () => {
      let filteredLocations;
  
      if (options.length === 0) {
        filteredLocations = originalLocations;
      } else {
        filteredLocations = originalLocations.filter(location => {
          return options.every(option => location[option] === 1);
        });
      }
  
      setLocations(filteredLocations);
      setVisible(false);
    };

    const isLocationReserved = (locationId, startDate, endDate) => {
      
      const reservationsForLocation = reservations.filter(
        (reservation) => reservation.property_id === locationId
      );

      for (const reservation of reservationsForLocation) {
        
        const resStart = new Date(reservation.res_start);
        const resEnd = new Date(reservation.res_end);
    
        if (
          (resStart <= startDate && startDate <= resEnd) ||
          (resStart <= endDate && endDate <= resEnd) ||
          (startDate <= resStart && resEnd <= endDate)
        ) {
          return true;
        }
      }
    
      return false;
    };
        
  
    return (
    <>
    <section id="search">
      <div className="search-container d-flex justify-content-center align-items-center">
        <div className="search-element">Miejscowość: {locationInput}</div>
        <div className="search-element">Goście: {guestsInput}</div>
        {dateInput.length > 0 && (
          <>
            <div className="search-element">Data przyjazdu: {dateInput[0].toLocaleDaconnectionring()}</div>
            <div className="search-element">Data wyjazdu: {dateInput[1].toLocaleDaconnectionring()}</div>
          </>
        )}
        {dateInput.length <= 0 && (
          <>
            <div className="search-element">Data przyjazdu: Dowolna</div>
            <div className="search-element">Data wyjazdu: Dowolna</div>
          </>
        )}

        <div>
      </div>
      </div>
    </section>
    <section id="filter">
      
            <Button type="submit" label="Filtry" className="filter-btn" onClick={() => setVisible(true)}>
                <FontAwesomeIcon icon={faFilter} />
            </Button>
            
            <Dialog className="filter-dialog" header="Wybierz co cie interesuje" visible={visible} onHide={() => setVisible(false)}>
                <Container>
                    <Row>
                      {categories.map((category, index) => (
                        <React.Fragment key={index}>
                          <Col sm={12}>
                            <h4>{category.title}</h4>
                          </Col>
                          {category.items.map((item, itemIndex) => (
                            <Col xs={12} sm={6} md={4} xxl={3} className="filter-cb" key={itemIndex}>
                              <Checkbox inputId={`option${index + 1}_${itemIndex + 1}`} value={item} onChange={onOptionsChange} checked={options.includes(polishToEnglishMap[item])} />
                              <label htmlFor={`option${index + 1}_${itemIndex + 1}`}>{item}</label>
                            </Col>
                          ))}
                        </React.Fragment>
                      ))}
                          <Col sm={12}>
                            <Button type="button" label="Filtruj" className="mt-3 w-100" onClick={filterLocations}>
                              <FontAwesomeIcon icon={faFilter} />
                            </Button>
                        </Col>
                    </Row>
                </Container>
            </Dialog>
        </section>
    <section id="locations" className="pad-page">
      <Container fluid>
        <Row>
          {locations.map((location, index) => (
            <Col key={index} xs={12} sm={6} md={4} xxl={2} className="locations-element-container">
              <Link to={`/property/${location.property_id}`}>
                <div className="locations-element shadow-lg d-flex flex-column justify-content-between">
                  <Carousel indicators={false} interval={null}>
                    {dummyImages.map((image, i) => (
                      <Carousel.Item key={i}>
                        <img src={image} alt={`Image ${i + 1}`} />
                        <Carousel.Caption></Carousel.Caption>
                      </Carousel.Item>
                    ))}
                  </Carousel>
                  <div className="locations-info">
                    <h4>{location.prop_name}</h4>
                    <p>{`${location.prop_country}, ${location.prop_town}`}</p>
                  </div>
                  <div className="d-flex justify-content-between align-items-end locations-price-container">
                    <div className="locations-price">
                      {`${location.price}zł  `}
                      <span>za noc</span>
                    </div>
                  </div>
                </div>
              </Link>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
    </>
  );
};

export default Locations;