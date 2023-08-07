import React from 'react'
import { useState } from 'react';
import axios from 'axios'



// export default function Register() {
//   return (
//     <div>
//         import React from 'react';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
    const [values, setValues] = useState({
        name: '',
        email: '',
        password: ''
    });

    let navigate = useNavigate()
    let handleSubmit = event => {
        event.preventDefault()
        axios.post('http://localhost:8081/register', values)
        .then(res => {
            if(res.data.Status === "Success"){
                navigate('/login')
            } else{
                alert("Error")
            }
        })
        .then(err = console.log(err))
    }
  return (
    <section className="vh-100" style={{ backgroundColor: '#eee' }}>
      <Container className="h-100">
        <Row className="d-flex justify-content-center align-items-center h-100">
          <Col lg={12} xl={11}>
            <Card text="black" style={{ borderRadius: '25px' }}>
              <Card.Body className="p-md-5">
                <Row className="justify-content-center">
                  <Col md={10} lg={6} xl={5} order={{ md: 2, lg: 1 }}>

                    <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign up</p>

                    <Form className="mx-1 mx-md-4" onSubmit={handleSubmit}>

                      <Form.Group className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                        <Form.Control type="text" id="form3Example1c" placeholder="Your Name" 
                            onChange={e => setValues({...values, name: e.target.value})}
                        />
                      </Form.Group>

                      <Form.Group className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                        <Form.Control type="email" id="form3Example3c" placeholder="Your Email" 
                            onChange={e => setValues({...values, email: e.target.value})}
                        />
                      </Form.Group>

                      <Form.Group className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                        <Form.Control type="password" id="form3Example4c" placeholder="Password" 
                            onChange={e => setValues({...values, password: e.target.value})}
                        />
                      </Form.Group>

                      {/* <Form.Group className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-key fa-lg me-3 fa-fw"></i>
                        <Form.Control type="password" id="form3Example4cd" placeholder="Repeat your password" />
                      </Form.Group> */}

                      <Form.Group className="form-check d-flex justify-content-center mb-5">
                        <Form.Check type="checkbox" className="form-check-input me-2" id="form2Example3c" />
                        <Form.Label className="form-check-label" htmlFor="form2Example3">
                          I agree all statements in <a href="#!">Terms of service</a>
                        </Form.Label>
                      </Form.Group>

                      <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                        <Button type="submit" variant="primary" size="lg">Register</Button>
                      </div>
                      <p className='d-flex justify-content-center'>If you already have an account</p>
                      <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                        <Link to="/login">
                            <Button type="button"  variant="dark" size="lg">Login</Button>
                        </Link>
                      </div>
                      

                    </Form>

                  </Col>
                  <Col md={10} lg={6} xl={7} className="d-flex align-items-center" order={{ md: 1, lg: 2 }}>

                    <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                      className="img-fluid" alt="Sample image" />

                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Register;

