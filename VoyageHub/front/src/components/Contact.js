import React, { useState } from 'react';
import "../layout/main.scss";
import "../layout/contact.scss";
import { Container, Row, Form, Col } from 'react-bootstrap';
import emailjs from '@emailjs/browser';
import { Button } from 'primereact/button';

import 'bootstrap/dist/css/bootstrap.min.css';

const Contact = () => {
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const form = e.target;

    emailjs
      .sendForm('service_hzyua2j', 'template_co77che', form, 'pAGPFLOvKr_8sgSd0')
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );

    setFormData({
      name: '',
      email: '',
      subject: '',
      message: '',
    });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section id="contact" className="pad-page">
      <Container fluid>
        <Row>
          <Col sm={12} lg={6} className="information-image information-grid p-0">
            <div  className="information-img1"> </div>
            <div  className="information-img2"> </div>
            <div  className="information-img3"> </div>
          </Col>
          <Col md={12} lg={6} className="contact-form">
            
            <Form onSubmit={handleSubmit} className='shadow-lg'>
            <h2 xs={12} className="contact-header p-0 w-100 fw-bold mb-4">Formularz kontaktowy</h2>
              <Form.Group controlId="formName">
                <Form.Label className="mb-0 fw-bold">Nazwa</Form.Label>
                <Form.Control className="p-inputtext mb-3" type="text" placeholder="Wpisz wybraną nazwę użytkownika" name="name" value={formData.name} onChange={handleChange} required />
              </Form.Group>
              <Form.Group controlId="formEmail">
                <Form.Label className="mb-0 fw-bold">Kontakt</Form.Label>
                <Form.Control className="p-inputtext mb-3" type="email" placeholder="Może to być email lub numer telefonu" name="email" value={formData.email} onChange={handleChange} required />
              </Form.Group>
              <Form.Group controlId="forSubject">
                <Form.Label className="mb-0 fw-bold">Temat</Form.Label>
                <Form.Control className="p-inputtext mb-3" type="subject" placeholder="Temat" name="subject" value={formData.subject} onChange={handleChange} required />
              </Form.Group>
              <Form.Group controlId="formMessage">
                <Form.Label className="mb-0 fw-bold">Wiadomości</Form.Label>
                <Form.Control className="p-inputtext mb-3" as="textarea" rows={4} placeholder="Treść wiadomości" name="message" value={formData.message} onChange={handleChange} required />
              </Form.Group>
              <Button label="Wyślij" className="btn p-button w-100" />
            </Form>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Contact;