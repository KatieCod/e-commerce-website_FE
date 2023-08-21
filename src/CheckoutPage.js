import React from "react";
import { Container, Button, Row, Col, Card, Form } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretUp } from '@fortawesome/free-solid-svg-icons'
import { useState } from "react";
import { Link } from "react-router-dom";

export default function CheckourPage() {

    const [showCart, setShowCart] = useState(false)


    const handleClick = () => {
        setShowCart(!showCart)
    }
    return (
        <div >
            <h1 className="text-center mt-4 mb-4">Checkout Page</h1>
            <Row>
                <Col xs={12} lg={7}>
                    <Container>
                        <h3 className=" text-center mt-5">Billing Details</h3>
                        <Form className="mt-4 ml-5 mr-5 ">
                            <Row>
                                <Col xs={4}>
                                    <Form.Control
                                        placeholder="Full name"
                                    />
                                </Col>
                                <Col>
                                    <Form.Control
                                        placeholder="Country"
                                    />
                                </Col>
                            </Row>
                            <Row className="mt-3">
                                <Col xs={4}>
                                    <Form.Control
                                        placeholder="Email"
                                    />
                                </Col>
                                <Col xs={5}>
                                    <Form.Control
                                        placeholder="City"
                                    />
                                </Col>
                                <Col>
                                    <Form.Control
                                        placeholder="Zip code"
                                    />
                                </Col>
                            </Row>
                            <Row className="mt-3">
                                <Col xs={4}>
                                    <Form.Control
                                        placeholder="Phone"
                                    />
                                </Col>
                                <Col>
                                    <Form.Control
                                        placeholder="Street, house №"
                                    />
                                </Col>
                                <Col xs={2}>
                                    <Form.Control
                                        placeholder="Apt."
                                    />
                                </Col>
                            </Row>
                        </Form>
                    </Container>
                    <Container>
                        <h3 className=" text-center mt-5">Delivery Details</h3>

                        <Form className="mt-4 ml-5 mr-5">
                            <Container className="text-left">
                                <Row className="ml-4 mb-3">
                                    <label className="form-check-label" for="flexCheckDefault">same as billig address</label>
                                    <input className="form-check-input" type="checkbox" value="" />
                                </Row>
                            </Container>
                            <Row>
                                <Col xs={4}>
                                    <Form.Control
                                        placeholder="Full name"
                                    />
                                </Col>
                                <Col>
                                    <Form.Control
                                        placeholder="Country"
                                    />
                                </Col>
                            </Row>
                            <Row className="mt-3">
                                <Col xs={4}>
                                    <Form.Control
                                        placeholder="Email"
                                    />
                                </Col>
                                <Col xs={5}>
                                    <Form.Control
                                        placeholder="City"
                                    />
                                </Col>
                                <Col>
                                    <Form.Control
                                        placeholder="Zip code"
                                    />
                                </Col>
                            </Row>
                            <Row className="mt-3">
                                <Col xs={4}>
                                    <Form.Control
                                        placeholder="Phone"
                                    />
                                </Col>
                                <Col>
                                    <Form.Control
                                        placeholder="Street, house №"
                                    />
                                </Col>
                                <Col xs={2}>
                                    <Form.Control
                                        placeholder="Apt."
                                    />
                                </Col>
                            </Row>

                        </Form>

                    </Container>
                </Col>
                <Col xs={12} lg={5}>

                    <Container style={{ maxWidth: "700px" }} className="text-center mt-4 mb-4">

                        <Container sm>
                            <Row className="justify-content-center">
                                <Button onClick={handleClick} className="mt-4 text-left font-weight-bold" style={{ width: "100%" }} variant="light">
                                    <Row >
                                        <Col>Order Details</Col>
                                        <Col className="text-right">
                                            {!showCart ?
                                                <FontAwesomeIcon icon={faCaretUp} rotation={90} /> :
                                                <FontAwesomeIcon icon={faCaretUp} rotation={180} />
                                            }
                                        </Col>
                                    </Row>
                                </Button>
                            </Row>
                            {!showCart ? <></> : <>
                                <Container >
                                    <Row className="justify-content-center">
                                        <div>
                                            <div className="p-2 mt-2 bg-light text-dark rounded">
                                                <Row className='align-items-center'>
                                                    <Col xs={3}><Card.Img src="kit.png " /></Col>
                                                    <Col>
                                                        <Row>
                                                            <Col xs={9}><Card.Text className="text-left">Low pH Good Morning Gel Cleanser</Card.Text ></Col>
                                                        </Row>
                                                        <Row className="mt-3">
                                                            <Col><Card.Text className="text-left font-weight-bold">3 PC</Card.Text></Col>
                                                        </Row>
                                                    </Col>
                                                    <Col className='mr-4' xs={2}><h4 className="text-left font-weight-bold">78$</h4></Col>
                                                </Row>
                                            </div>
                                        </div>
                                    </Row>
                                </Container>
                                <Container >
                                    <Row className="justify-content-center">
                                        <div >
                                            <div className="p-2 mt-2 bg-light text-dark rounded">
                                                <Row className='align-items-center'>
                                                    <Col xs={3}><Card.Img src="kit.png " /></Col>
                                                    <Col>
                                                        <Row>
                                                            <Col xs={9}><Card.Text className="text-left">Low pH Good Morning Gel Cleanser</Card.Text ></Col>
                                                        </Row>
                                                        <Row className="mt-3">
                                                            <Col><Card.Text className="text-left font-weight-bold">3 PC</Card.Text></Col>
                                                        </Row>
                                                    </Col>
                                                    <Col className='mr-4' xs={2}><h4 className="text-left font-weight-bold">78$</h4></Col>
                                                </Row>
                                            </div>
                                        </div>
                                    </Row>
                                </Container>
                                <Container className="border-top border-secondary mt-3" style={{ maxWidth: "360px" }}></Container>
                                <Container className="align-items-center">
                                    <Row className="justify-content-center align-items-center">
                                        <div style={{ width: "100%" }}>
                                            <div className="p-2 mt-2 bg-light text-dark rounded">
                                                <Row className='align-items-center'>
                                                    <Col xs={3}><h5>Total:</h5></Col>
                                                    <Col>
                                                        <Row >
                                                            <Col><Card.Text className="text-left font-weight-bold mb-2">6 PC</Card.Text></Col>
                                                        </Row>
                                                    </Col>
                                                    <Col style={{ marginRight: "40px" }} xs={2}><h4 className="text-left font-weight-bold">156$</h4></Col>
                                                </Row>
                                            </div>
                                        </div>
                                    </Row>
                                </Container>
                            </>}
                            <Container className="align-items-center">
                                <Row className="justify-content-center align-items-center">
                                    <div style={{ width: "100%" }}>
                                        <div className="p-2 mt-2 rounded">
                                            <Row className='align-items-center'>
                                                <Col >
                                                <Link to='/cart_page'>
                                                    <Button variant="light" style={{width: "130px"}}>Back to cart</Button>
                                                </Link>
                                                </Col>
                                                <Col>
                                                    <Button style={{width: "130px"}}>Pay</Button>
                                                </Col>
                                            </Row>
                                        </div>
                                    </div>
                                </Row>
                            </Container>

                        </Container>
                    </Container>
                </Col>
            </Row>
        </div>
    )
}