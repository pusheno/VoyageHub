import React, { useEffect, useState } from 'react';
import { Form, Field } from 'react-final-form';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Password } from 'primereact/password';
import { Checkbox } from 'primereact/checkbox';
import { Dialog } from 'primereact/dialog';
import { Divider } from 'primereact/divider';
import { classNames } from 'primereact/utils';
import { Container, Row, Col } from "react-bootstrap";
import "../layout/formDemo.css";
import "../layout/userForm.scss";
import "../layout/style.scss";
import Footer from "../components/Footer";
import accountService from "../services/accountService";


const User = () => {
  const [showMessage, setShowMessage] = useState(false);
  const [formData, setFormData] = useState({});

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
  
    if (!data.password) {
      errors.password = 'Hasło jest wymagane';
    } else if (!/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/.test(data.password)) {
      errors.password = 'Hasło powinno zawierać co najmniej 8 znaków, jedną małą literę, jedną dużą literę i cyfrę';
    }
  
    if (data.password !== data.confirmPassword) {
      errors.confirmPassword = 'Hasła się nie zgadzają';
    }
  
    return errors;
  };

  const onSubmit = async (data, form) => {
    setFormData(data);
    setShowMessage(true);

    try {
      const result = await accountService.createAccount(data);
      console.log(result);
    } catch (error) {
      console.error(error);
    }

    form.restart();
  };

  const passwordHeader = <h5 className="text-bold">Siła hasła</h5>;
    const passwordFooter = (
        <React.Fragment>
            <Divider />
            <p className="mt-2">Wymagania dotyczące hasła</p>
            <ul className="pl-2 ml-2 mt-0" style={{ lineHeight: '1.5' }}>
                <li>Przynajmniej 1 mała litera</li>
                <li>Przynajmniej 1 duża litera</li>
                <li>Przynajmniej 1 liczba</li>
                <li>Minimalna długość 8</li>
            </ul>
        </React.Fragment>
    );

  const isFormFieldValid = (meta) => !!(meta.touched && meta.error);
  const getFormErrorMessage = (meta) => {
    return isFormFieldValid(meta) && <small className="p-error">{meta.error}</small>;
  };

  return (
    <>
    <section id="register" className='userForm d-flex align-items-center justify-content-center'>
      <Container className="h-100">
        <Row className="w-100 d-flex align-items-center justify-content-center">
          <Col md={12} lg={10} xl={7} className="userForm-container d-flex justify-content-center align-items-start minH-fit" style={{padding: "30px 20px"}}>
            <div className="form-demo w-100">
              <div>
                <h1 className="text-center mb-3 text-bold">Twoje dane</h1>
                <Form
                  onSubmit={onSubmit}
                  initialValues={{ firstName: '', lastName: '', email: '', password: '', confirmPassword: '' }}
                  validate={validate}
                  render={({ handleSubmit }) => (
                    <form onSubmit={handleSubmit} className="p-fluid mt-0 w-100">
                      <Col xs={12} md={6} style={{display: "inline-block", padding: "0 5px"}}>
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
                      </Col>

                      <Col xs={12} md={6} style={{display: "inline-block", padding: "0 5px"}}>
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
                      </Col>
                      
                      <Col xs={12} md={6} style={{display: "inline-block", padding: "0 5px"}}>
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
                      </Col>

                      <Col xs={12} md={6} style={{display: "inline-block", padding: "0 5px"}}>
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
                      </Col>

                      <Col xs={12} md={6} style={{display: "inline-block", padding: "0 5px"}}>
                      <Field
                        name="password"
                        render={({ input, meta }) => (
                          <div className="field mb-2">
                            <span className="p-input-icon-right">
                              <Password placeholder={"Hasło"} id="password" {...input} toggleMask className={classNames({ 'p-invalid': isFormFieldValid(meta) })} header={passwordHeader} footer={passwordFooter}/>
                            </span>
                            {getFormErrorMessage(meta)}
                          </div>
                        )}
                      />
                      </Col>
                      <Col xs={12} md={6} style={{display: "inline-block", padding: "0 5px"}}>
                      <Field
                        name="confirmPassword"
                        render={({ input, meta }) => (
                          <div className="field mb-2">
                            <span className="p-input-icon-right">
                            <Password placeholder={"Potwierdź hasło"} id="confirmPassword" {...input} toggleMask feedback={false} className={classNames({ 'p-invalid': isFormFieldValid(meta) })} />
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
                              <InputText placeholder={"Miasto"} id="town" {...input} className={classNames({ 'p-invalid': isFormFieldValid(meta) })} />
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
                      <Col xs={12} style={{padding: "0 5px"}}>
                        <Button type="submit" label="Edytuj dane" className="mt-2 w-100"/>
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
};

export default User;