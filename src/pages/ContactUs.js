import React from "react";
import { Container, Col, Row, Form, Button } from "react-bootstrap";
import GoogleMapReact from 'google-map-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { Link } from "react-router-dom";


function ContactUs() {
    const defaultProps = {
        center: {
            lat: 32.0700,
            lng: 34.7942
        },
        zoom: 13
    };

    return (
        <Container>
            <Link to="/shop" style={{color: 'black', textDecoration: 'none'}}>
                <div className="mt-3">
                    <FontAwesomeIcon icon={faArrowLeft} /> Back to store
                </div>
            </Link>
            <h1 className="text-center mt-3">Contact Us</h1>
            <Row>
                <Col lg={5} sx={12}>
                    <div className="col-md text-lg-left text-center mt-5 mb-3">                        <ul class="nav flex-column">
                        <div className=" mb-4">
                            <img src="./mainpage/clionce.png" width="300" height="81" className="d-inline-block align-top te" alt="" />
                        </div>
                        <div className="ml-0 ml-lg-5">
                            <li className="nav-item mb-2">EMAIL: Clionce@gmail.com</li>
                            <li className="nav-item mb-2 ">ADDRESS: Tel Aviv-Yafo, Israel </li>
                            <li className="nav-item mb-2">TEL: +972 111 111 11 11</li>
                            <li className="nav-item mb-2 ">WEBSITE: Clionce.com</li>
                        </div>
                    </ul>
                    </div>
                </Col>

                <Col lg={7} sx={12} className="mt-5 mb-5">
                    <div style={{ height: '50vh', width: '100%' }}>
                        <GoogleMapReact
                            bootstrapURLKeys={{ key: "" }}
                            defaultCenter={defaultProps.center}
                            defaultZoom={defaultProps.zoom}
                        >
                        </GoogleMapReact>
                    </div>
                </Col>
            </Row>
            <h1 className="text-center mt-5">Write Us</h1>
            <Container className="justify-content-center mt-4" style={{ backgroundImage: 'heart.png' }}>
                <Form style={{ maxWidth: '600px', margin: 'auto' }}>
                    <Form.Group className="mt-3">
                        <Form.Control
                            type="text"
                            id="name"
                            name="name"
                            placeholder="your name"
                        />
                    </Form.Group>
                    <Form.Group className="mt-3">
                        <Form.Control
                            type="email"
                            id="email"
                            name="email"
                            placeholder="your email"
                        />
                    </Form.Group>
                    <Form.Group className="mt-3" >
                        <Form.Control
                            type="text"
                            id="message"
                            name="message"
                            placeholder="your message"
                            style={{ height: '100px' }}
                        />
                    </Form.Group>
                    <Container className="d-flex justify-content-center">
                        <Button type="submit" className="mt-3 mb-5 btn btn-secondary" >Send</Button>
                    </Container>
                </Form>
            </Container>
        </Container>
    )

}

export default ContactUs;