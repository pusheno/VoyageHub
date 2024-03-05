import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import connection from '../services/connection';
import { Container, Row, Col} from "react-bootstrap";
import "../layout/style.scss";
import "../layout/property.scss";
import Footer from "../components/Footer";
import Recommended from "../components/Recommended";
import Zdjecie from "../images/main.jpg";
import Zdjecie2 from "../images/main2.jpg";
import { Carousel } from 'react-bootstrap';
import "../layout/datePicker.css";
import { DateRangePicker } from 'rsuite';
import { Button } from 'primereact/button';
import { Form, Field } from 'react-final-form';
import { InputText } from 'primereact/inputtext';
import { Divider } from 'primereact/divider';
import { classNames } from 'primereact/utils';
import { Toast } from 'primereact/toast';

const Property = () => {
  
  const { id } = useParams();
  const [propertyData, setPropertyData] = useState(null);
  const [showMessage, setShowMessage] = useState(false);
  const [formData, setFormData] = useState({});
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [isDateValid, setIsDateValid] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const propertyDetails = await connection.getLocationById(id);
        setPropertyData(propertyDetails);
      } catch (error) {
        console.error('Error fetching property data:', error);
      }
    };
    const fetchData2 = async () => {
      try {
        const propertyDetails = await connection.getReservationById(id);
        setPropertyData(propertyDetails);
      } catch (error) {
        console.error('Error fetching property data:', error);
      }
    };
    fetchData();
    fetchData2();
  }, [id]);

  const handleDateRangePickerClick = () => {

    setTimeout(() => {

      const allDateElements = document.querySelectorAll('.rs-calendar-table-cell-content');

      allDateElements.forEach(dateElement => {
        const dateTitle = dateElement.getAttribute('title');
        
        const isReserved = propertyData.some(reservation => {
          const startDate = new Date(reservation.res_start);
          const endDate = new Date(reservation.res_end);
          const currentDate = new Date(dateTitle);
      
          return currentDate >= startDate && currentDate <= endDate;
        });
      
        if (isReserved) {
          dateElement.style.backgroundColor = '#d4d4d4';
          dateElement.style.color = 'white';
          dateElement.style.pointerEvents = 'none';
          dateElement.style.cursor = 'not-allowed';
        }
      });
      
    }, 200);


  };
  const validate = (data) => {
    let errors = {};
  
    if (!data.firstName) {
      errors.firstName = 'Imię jest wymagane';
    }
  
    if (!data.lastName) {
      errors.lastName = 'Nazwisko jest wymagane';
    }
  
    if (!data.email) {
      errors.email = 'Email jest wymagany';
    } else if (!data.email.includes('@') || !data.email.includes('.') || data.email.includes(' ')) {
      errors.email = 'Nieprawidłowy format adresu email';
    }

    if (!data.phone) {
      errors.phone = 'Numer telefonu jest wymagany';
    }
  
    return errors;
  };

  const isFormFieldValid = (meta) => !!(meta.touched && meta.error);
  const getFormErrorMessage = (meta) => {
    return isFormFieldValid(meta) && <small className="p-error">{meta.error}</small>;
  };

  const onSubmit = async (data, form) => {

    const prop_id = propertyData[0].property_id;

    const bookData = {
      ...data,
      prop_id
    };

    console.log(bookData)
    setFormData(bookData);
    setShowMessage(true);

    try {
      const result = await connection.book(bookData);
      console.log(result);
    } catch (error) {
      console.error(error);
    }

    form.restart();
  };

  let toast;

  const checkDate = () => {
    const inputElement = document.querySelector('.rs-picker-toggle-textbox');
    if (inputElement) {
      const inputValue = inputElement.value.trim();
      const isValid = inputValue !== '';

      setIsDateValid(isValid);

      if (!isValid) {
        toast.show({ severity: 'error', summary: 'Błąd', detail: 'Proszę wybrać datę rezezerwacji' });
      } else {
        const [start, end] = inputValue.split(' ~ ');

        const formattedStartDate = start.split('.').reverse().join('-');
        const formattedEndDate = end.split('.').reverse().join('-');

        setStartDate(formattedStartDate);
        setEndDate(formattedEndDate);
      }
    } else {
      setIsDateValid(false);
    }
  };

  return (
    <>
    <Toast ref={(el) => (toast = el)} />
    {propertyData && (
    <section id="property">
      <Container fluid className="d-flex justify-content-center align-items-center">
        <Row className="d-flex justify-content-center align-items-start">
        
        <Col xxl={2}></Col>
        <Col md={12} sm={10} xxl={8}>
              <p>{propertyData[0].prop_country}, {propertyData[0].prop_town} {propertyData[0].prop_zip} {propertyData[0].prop_street}</p>
            </Col>
        <Col xxl={2}></Col>

        <Col xxl={2}></Col>
        <Col sm={12} md={12} xxl={5} className="property-element">
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
          </Carousel>
        </div>
        </Col>
        <Col sm={12} md={12} xxl={3} className="property-element" style={{marginBottom: "70px"}}>
          <div  className="d-flex align-items-between flex-column">
          <div className="mb-3 property-name">{propertyData[0].prop_name}</div>
            <div className="property-info">
              <h4>Cena za noc <span>{propertyData[0].price}zł</span></h4>
              <h5>Pokoje <span>{propertyData[0].rooms}</span></h5>
              <h5>Ilość łóżek <span>{propertyData[0].beds}</span></h5>
              <p className="mt-4">{propertyData[0].description}</p>
            </div>
            <DateRangePicker
            className="browser-dataPicker w-100"
            separator={" - "}
            format={"dd.MM.yyyy"}
            placeholder="Data zameldowania"
            onClick={handleDateRangePickerClick}
          />
          </div>
        </Col>
        <Col xxl={2}></Col>

        <Col md={12} xxl={7}></Col>
        <Col md={12} xxl={3}><Button type="submit" label="Przejdź do uzupełnienia danych" onClick={checkDate}></Button></Col>
        <Col md={12} xxl={2}></Col>
        {isDateValid && (
          <>
        <Col xxl={2}></Col>
        <Col md={12} sm={10} xxl={8} className='property-data'>
            <div className="form-demo w-100">
              <div>
                <h1 className="text-center mb-3 text-bold">Dane do rezerwacji</h1>
                <Form
  onSubmit={onSubmit}
  initialValues={{ 
    firstName: '', 
    lastName: '', 
    email: '', 
    phone: '', 
    startDate: startDate,
    endDate: endDate
  }}
  validate={validate}
  render={({ handleSubmit }) => (
                    <form onSubmit={handleSubmit} className="p-fluid mt-0 w-100">
                      
                      <Field
                        name="firstName"
                        render={({ input, meta }) => (
                          <div className="field mb-2">
                            <span className="p-input-icon-right">
                              <InputText placeholder={"Imię"}  id="firstName" {...input} className={classNames({ 'p-invalid': isFormFieldValid(meta) })} />
                            </span>
                            {getFormErrorMessage(meta)}
                          </div>
                        )}
                      />

                      <Field
                        name="lastName"
                        render={({ input, meta }) => (
                          <div className="field mb-2">
                            <span className="p-input-icon-right">
                              <InputText placeholder={"Nazwisko"} id="lastName" {...input} className={classNames({ 'p-invalid': isFormFieldValid(meta) })} />
                            </span>
                            {getFormErrorMessage(meta)}
                          </div>
                        )}
                      />
                      
                      <Field
                        name="email"
                        render={({ input, meta }) => (
                          <div className="field mb-2">
                            <span className="p-input-icon-right">
                              <InputText placeholder={"Email"} id="email" {...input} className={classNames({ 'p-invalid': isFormFieldValid(meta) })} />
                            </span>
                            {getFormErrorMessage(meta)}
                          </div>
                        )}
                      />

                      <Field
                        name="phone"
                        render={({ input, meta }) => (
                          <div className="field mb-2">
                            <span className="p-input-icon-right">
                              <InputText placeholder={"Numer telefonu"} id="phone" {...input} className={classNames({ 'p-invalid': isFormFieldValid(meta) })} />
                            </span>
                            {getFormErrorMessage(meta)}
                          </div>
                        )}
                      />
                    <Button type="submit" label="Zarezerwuj" className="w-100" style={{marginTop: "60px"}}/>
                    </form>
                  )}
                />
              </div>
            </div>
          </Col>

        <Col xxl={2}></Col>
        </>
        )}

        <Col sm={12} md={12} xxl={8} className='property-attraction-container'>
        <Col xs={12} sm={6} md={6} lg={4} xl={2} className='property-attraction'>
          <h5 className='text-bold'>Łazienka</h5>
          {propertyData[0].shower === 1 && <p>Prysznic</p>}
          {propertyData[0].bath === 1 && <p>Wanna</p>}
          {propertyData[0].washing_mach === 1 && <p>Pralka</p>}
          {propertyData[0].iron === 1 && <p>Żelazko</p>}
          {propertyData[0].towels === 1 && <p>Ręczniki</p>}
          {propertyData[0].cosmetics === 1 && <p>Kosmetyki</p>}
          {propertyData[0].bidet === 1 && <p>Bidet</p>}
        </Col>

        <Col xs={12} sm={6} md={6} lg={4} xl={2} className='property-attraction'>
          <h5 className='text-bold'>Pokój</h5>
          {propertyData[0].sofa === 1 && <p>Sofa</p>}
          {propertyData[0].lamp === 1 && <p>Lampa</p>}
          {propertyData[0].wardrobe === 1 && <p>Szafa</p>}
          {propertyData[0].hanger === 1 && <p>Wieszak</p>}
          {propertyData[0].armchair === 1 && <p>Fotele</p>}
        </Col>

        <Col xs={12} sm={6} md={6} lg={4} xl={2} className='property-attraction'>
          <h5 className='text-bold'>Ogród</h5>
          {propertyData[0].fireplace === 1 && <p>Ognisko</p>}
          {propertyData[0].grill === 1 && <p>Grill</p>}
          {propertyData[0].deckchairs === 1 && <p>Leżaki</p>}
          {propertyData[0].furniture === 1 && <p>Meble ogrodowe</p>}
          {propertyData[0].parking === 1 && <p>Parking</p>}
          {propertyData[0].picnic === 1 && <p>Miejsce na piknik</p>}
          {propertyData[0].tarrace === 1 && <p>Taras</p>}
        </Col>

        <Col xs={12} sm={6} md={6} lg={4} xl={2} className='property-attraction'>
          <h5 className='text-bold'>Atrakcje</h5>
          {propertyData[0].cinema === 1 && <p>Kino domowe</p>}
          {propertyData[0].gym === 1 && <p>Siłownia</p>}
          {propertyData[0].field === 1 && <p>Boisko</p>}
          {propertyData[0].sauna === 1 && <p>Sauna</p>}
          {propertyData[0].pool === 1 && <p>Basen</p>}
          {propertyData[0].jacuzzi === 1 && <p>Jacuzzi</p>}
        </Col>

        <Col xs={12} sm={6} md={6} lg={4} xl={2} className='property-attraction'>
          <h5 className='text-bold'>Kuchnia</h5>
          {propertyData[0].cooker === 1 && <p>Piekarnik</p>}
          {propertyData[0].microwave === 1 && <p>Mikrofala</p>}
          {propertyData[0].coffe_mach === 1 && <p>Ekspres do kawy</p>}
          {propertyData[0].fridge === 1 && <p>Lodówka</p>}
          {propertyData[0].kettle === 1 && <p>Czajnik</p>}
          {propertyData[0].stove === 1 && <p>Kuchenka</p>}
          {propertyData[0].toaster === 1 && <p>Toster</p>}
          {propertyData[0].freezer === 1 && <p>Zamrażalka</p>}
        </Col>

        <Col xs={12} sm={6} md={6} lg={4} xl={2} className='property-attraction'>
          <h5 className='text-bold'>Udogodnienia</h5>
          {propertyData[0].wifi === 1 && <p>WiFi</p>}
          {propertyData[0].air_cond === 1 && <p>Klimatyzacja</p>}
          {propertyData[0].streamings === 1 && <p>Portale streamingowe</p>}
          {propertyData[0].tv === 1 && <p>Telewizor</p>}
          {propertyData[0].console === 1 && <p>Konsola</p>}
          {propertyData[0].speakers === 1 && <p>Głośniki</p>}
          {propertyData[0].video_games === 1 && <p>Gry</p>}
        </Col>
        </Col>

        </Row>
      </Container>
    </section>)}
    <Recommended/>
    <Footer/>
    </>
  );
};

export default Property;