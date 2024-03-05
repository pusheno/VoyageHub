import React, { useEffect, useState } from 'react';
import { Form, Field } from 'react-final-form';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { classNames } from 'primereact/utils';
import { Container, Row, Col } from "react-bootstrap";
import "../layout/formDemo.css";
import "../layout/userForm.scss";
import "../layout/style.scss";
import Footer from "../components/Footer";
import { InputTextarea } from 'primereact/inputtextarea';
import axios from 'axios'
import connection from '../services/connection';
import { Link } from "react-router-dom";

const User = () => {

  const [showMessage, setShowMessage] = useState(false);
  const [formData, setFormData] = useState({});
  const [files, setFiles] = useState([]);
  const [idUser, setIdUser] = useState(null);

  useEffect(() => {
    const user = async () => {
      let idUser = await connection.getCurrentID();
      setIdUser(idUser);
    }
    user();
  }, []);

  const upload = async (data, form) => {
    try {
      const formData = new FormData();
      Array.from(files).forEach((file, index) => {
        formData.append(`files`, file);
      });
      await axios.post('http://localhost:8000/upload', formData);

    } catch (error) {
      console.error(error);
    }

  };

  const validate = (data) => {
    let errors = {};
  
    if (!data.name) {
      errors.name = 'Nazwa jest wymagana';
    }

    if (!data.price) {
      errors.price = 'Cena jest wymagana';
    } else if (!/^\d+$/.connection(data.price)) {
      errors.price = 'Cena musi zawierać tylko cyfry';
    }
  
    if (!data.rooms) {
      errors.rooms = 'Liczba pokoi jest wymagana';
    } else if (!/^\d+$/.connection(data.rooms)) {
      errors.rooms = 'Liczba pokoi musi być liczbą';
    }

    if (!data.beds) {
      errors.beds = 'Liczba łóżek jest wymagana';
    } else if (!/^\d+$/.connection(data.beds)) {
      errors.beds = 'Liczba łóżek musi być liczbą';
    }

    if (!data.country) {
      errors.country = 'Kraj jest wymagany';
    }

    if (!data.town) {
      errors.town = 'Miejscowość jest wymagana';
    }

    if (!data.street) {
      errors.street = 'Dokładny adres jest wymagany';
    }

    if (!data.zip) {
      errors.zip = 'Kod pocztowy jest wymagany';
    }
    
    if (!data.description) {
      errors.description = 'Opis jest wymagany';
    } else if (data.description.length < 200) {
      errors.description = 'Opis musi zawierać co najmniej 200 znaków';
    }
    return errors;
  };

  const onSubmit = async (data, form) => {
    data.owner_id = idUser;

    setFormData(data);
    setShowMessage(true);

    try {
      console.log("idUser: ",idUser);
      console.log("data: ",data)
      const result = await connection.addProperty(data);
      console.log(result);
    } catch (error) {
      console.error(error);
    }

    try {
      console.log("data.name: ",data.name)
      const result = await connection.getPropertyId(data);
      console.log(result);
    } catch (error) {
      console.error(error);
    }

    form.restart();
  };

  const isFormFieldValid = (meta) => !!(meta.touched && meta.error);
  const getFormErrorMessage = (meta) => {
    return isFormFieldValid(meta) && <small className="p-error">{meta.error}</small>;
  };

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
    <section id="register" className='userForm d-flex align-items-center justify-content-center'>
      <Container className="h-100">
        <Row className="w-100 d-flex align-items-center justify-content-center">
          <Col md={12} lg={10} xl={7} className="userForm-container d-flex justify-content-center align-items-start minH-fit" style={{padding: "30px 20px"}}>
            <div className="form-demo w-100">
              <div>
                <h1 className="text-center mb-3 text-bold">Dodawanie nieruchomości</h1>
                <Form
                  onSubmit={onSubmit}
                  initialValues={{ name: '', price: '', rooms: '', beds: '', country: '', zip: '', town: '', street: '', description: '' }}
                  validate={validate}
                  render={({ handleSubmit }) => (
                    <form onSubmit={handleSubmit} className="p-fluid mt-0 w-100">

                      <Col xs={12} md={6} style={{display: "inline-block", padding: "0 5px"}}>
                        <Field
                          name="name"
                          render={({ input, meta }) => (
                            <div className="field mb-2">
                              <span className="p-input-icon-right">
                                <InputText placeholder={"Nazwa nieruchomości"}  id="name" {...input} className={classNames({ 'p-invalid': isFormFieldValid(meta) })} />
                              </span>
                              {getFormErrorMessage(meta)}
                            </div>
                          )}
                        />
                      </Col>

                      <Col xs={12} md={6} style={{display: "inline-block", padding: "0 5px"}}>
                      <Field
                        name="price"
                        render={({ input, meta }) => (
                          <div className="field mb-2">
                            <span className="p-input-icon-right">
                              <InputText placeholder={"Cena na noc (zł)"} id="price" {...input} className={classNames({ 'p-invalid': isFormFieldValid(meta) })} />
                            </span>
                            {getFormErrorMessage(meta)}
                          </div>
                        )}
                      />
                      </Col>

                      <Col xs={12} md={6} style={{display: "inline-block", padding: "0 5px"}}>
                      <Field
                        name="rooms"
                        render={({ input, meta }) => (
                          <div className="field mb-2">
                            <span className="p-input-icon-right">
                              <InputText placeholder={"Pokoje"} id="rooms" {...input} className={classNames({ 'p-invalid': isFormFieldValid(meta) })} />
                            </span>
                            {getFormErrorMessage(meta)}
                          </div>
                        )}
                      />
                      </Col>
                      
                      <Col xs={12} md={6} style={{display: "inline-block", padding: "0 5px"}}>
                      <Field
                        name="beds"
                        render={({ input, meta }) => (
                          <div className="field mb-2">
                            <span className="p-input-icon-right">
                              <InputText placeholder={"Łóżka"} id="beds" {...input} className={classNames({ 'p-invalid': isFormFieldValid(meta) })} />
                            </span>
                            {getFormErrorMessage(meta)}
                          </div>
                        )}
                      />
                      </Col>

                      <Col xs={12} md={6} style={{display: "inline-block", padding: "0 5px"}}>
                      <Field
                        name="country"
                        render={({ input, meta }) => (
                          <div className="field mb-2">
                            <span className="p-input-icon-right">
                              <InputText placeholder={"Kraj"} id="country" {...input} className={classNames({ 'p-invalid': isFormFieldValid(meta) })} />
                            </span>
                            {getFormErrorMessage(meta)}
                          </div>
                        )}
                      />
                      </Col>

                      <Col xs={12} md={6} style={{display: "inline-block", padding: "0 5px"}}>
                      <Field
                        name="zip"
                        render={({ input, meta }) => (
                          <div className="field mb-2">
                            <span className="p-input-icon-right">
                              <InputText placeholder={"Kod pocztowy"} id="zip" {...input} className={classNames({ 'p-invalid': isFormFieldValid(meta) })} />
                            </span>
                            {getFormErrorMessage(meta)}
                          </div>
                        )}
                      />
                      </Col>

                      <Col xs={12} md={6} style={{display: "inline-block", padding: "0 5px"}}>
                      <Field
                        name="town"
                        render={({ input, meta }) => (
                          <div className="field mb-2">
                            <span className="p-input-icon-right">
                              <InputText placeholder={"Miejscowość"} id="town" {...input} className={classNames({ 'p-invalid': isFormFieldValid(meta) })} />
                            </span>
                            {getFormErrorMessage(meta)}
                          </div>
                        )}
                      />
                      </Col>

                      <Col xs={12} md={6} style={{display: "inline-block", padding: "0 5px"}}>
                      <Field
                        name="street"
                        render={({ input, meta }) => (
                          <div className="field mb-2">
                            <span className="p-input-icon-right">
                              <InputText placeholder={"Adres"} id="street" {...input} className={classNames({ 'p-invalid': isFormFieldValid(meta) })} />
                            </span>
                            {getFormErrorMessage(meta)}
                          </div>
                        )}
                      />
                      </Col>

                      <Col xs={12} md={12} style={{display: "inline-block", padding: "0 5px"}}>
                      <Field
                        name="description"
                        render={({ input, meta }) => (
                          <div className="field mb-2">
                            <span className="p-input-icon-right">
                              <InputTextarea placeholder={"Opis"} id="description" {...input} className={classNames({ 'p-invalid': isFormFieldValid(meta) })} />
                            </span>
                            {getFormErrorMessage(meta)}
                          </div>
                        )}
                      />
                      </Col>
                      <Col xs={12} md={12} style={{ display: "inline-block", padding: "0 5px" }}>
                        <label htmlFor="file-upload" className="custom-file-upload">
                          Wybierz zdjęcia
                        </label>
                        <input id="file-upload" type="file" onChange={(event) => setFiles(event.target.files)} multiple />
                        {files.length > 0 && (
                          <div className='text-bold mt-1'>
                            {files.length === 1
                              ? `Wybrane zdjęcie: ${files[0].name}`
                              : Array.isArray(files)
                                ? `Wybrano ${files.length} zdjęć: ${files.map(file => file.name).join(', ')}`
                                : 'Zdjęcia zostały wybrane'
                            }
                          </div>
                        )}
                      </Col>
                      <Col xs={12} style={{padding: "0 5px"}}>
                        <Button type="submit" label="Dodaj" className="mt-2 w-100" onClick={upload}/>
                      </Col>
                    </form>
                  )}
                />
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
    <Footer/>
    </>
  );
    }
};

export default User;