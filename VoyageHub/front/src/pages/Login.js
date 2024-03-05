import React, { useEffect, useState } from 'react';
import { Form, Field } from 'react-final-form';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Password } from 'primereact/password';
import { Dialog } from 'primereact/dialog';
import { classNames } from 'primereact/utils';
import { Container, Row, Col } from "react-bootstrap";
import "../layout/formDemo.css";
import "../layout/userForm.scss";
import "../layout/style.scss";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import connection from '../services/connection';

const Login = () => {
    const [showMessage, setShowMessage] = useState(false);
    const [formData, setFormData] = useState({});

    const validate = (data) => {
        let errors = {};

        if (!data.email) {
            errors.email = 'Email jest wymagany';
        }

        if (!data.password) {
            errors.password = 'Hasło jest wymagane';
        }

        return errors;
    };

    const dialogFooter = <div className="flex justify-content-center"><Button label="OK" className="p-button-text" autoFocus onClick={() => setShowMessage(false) } /></div>;

    const onSubmit = async (data, form) => {
        setFormData(data);
        setShowMessage(true);
    
        let result;
    
        try {
            result = await connection.login(data);
            if (result.sql === "00000") {
                result = await connection.session({
                    id: result.id
                });
            }
        } catch (error) {
            console.error(error);
        }
    
        form.restart();
    };

    const isFormFieldValid = (meta) => !!(meta.touched && meta.error);
    const getFormErrorMessage = (meta) => {      
        return isFormFieldValid(meta) && <small className="p-error">{meta.error}</small>;
    };

    return (
        <>
        <section id="login" className='userForm d-flex align-items-center justify-content-center'>
            <Container className="h-100">
                <Row className="w-100 d-flex align-items-center justify-content-center">
        
                <Col sm={12} md={6} lg={5} className="userForm-container d-flex justify-content-center align-items-center h-500px">
                <div className="form-demo w-100">
                    <Dialog visible={showMessage} onHide={() => setShowMessage(false)} position="top" footer={dialogFooter} showHeader={false} style={{ minWidth: '300px' }}>
                        <div className="d-flex align-items-center flex-column pt-6 px-3" >

                            <h5 style={{ marginTop: '32px' }}>Logowanie pomyślne</h5>
                            <p style={{ lineHeight: 1.5, textIndent: '1rem' }}>
                                Zalogowano jako <b>{formData.email}</b>
                            </p>
                        </div>
                    </Dialog>

                    <div>
                            <h1 className="text-center mb-3 text-bold">Logowanie</h1>
                            <Form  onSubmit={onSubmit} initialValues={{ email: '', password: '', accept: false }} validate={validate} render={({ handleSubmit }) => (
                                <form onSubmit={handleSubmit} className="p-fluid mt-0 w-100">
                                
                                    <Field name="email" render={({ input, meta }) => (
                                        <div className="field mb-3">
                                            <span className="p-float-label p-input-icon-right">
                                                <InputText id="email" {...input} className={classNames({ 'p-invalid': isFormFieldValid(meta) })} />   
                                            </span>
                                            {getFormErrorMessage(meta)}
                                        </div>
                                    )} />

                                    <Field name="password" render={({ input, meta }) => (
                                        <div className="field mb-3">
                                            <span className="p-float-label">
                                                <Password id="password" {...input} toggleMask feedback={false} className={classNames({ 'p-invalid': isFormFieldValid(meta) })} />
                                            </span>
                                            {getFormErrorMessage(meta)}
                                        </div>
                                    )} />

                                    <Button type="submit" label="Zaloguj" className='mt-2' />
                                </form>
                            )} />
                    </div>
                </div>
                </Col>
        
        
                <Col sm={12} md={6} lg={5} className="userForm-info d-flex justify-content-center align-items-center flex-column h-500px">
                    <h2 className="text-center mb-2 text-bold color-white">Rejestracja</h2>
                    <p className='mt-3 text-center'>Jeśli nie posiadasz jeszcze konta, serdecznie zachęcamy do rejestracji, abyś mógł korzystać z pełnej gamy funkcji i doświadczyć wszystkich możliwości naszej platformy.</p>
                    <Link to="/register" className='w-100 d-flex justify-content-center align-items-center'>
                        <Button type="submit" label="Zarejestruj się" className='mt-2 w-75'/>
                    </Link>
                </Col>
        
                </Row>
            </Container>
        </section>
        <Footer/>
    </>     
    );
}

export default Login;