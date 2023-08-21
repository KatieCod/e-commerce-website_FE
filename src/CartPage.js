import React from "react";
import { Container, Card, Row, Col, Form, Button } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { Link } from "react-router-dom";

export default function CartPage() {
    return (
        <Container>
            <h1 className="text-center mt-5">Cart</h1>
            <Container className="mt-4 justify-content-center">
                <Row className="mt-4 justify-content-center">
                    <Card className="mt-2" style={{ width: '700px', backgroundColor: "#fcfcfc" }}>
                        <Row>
                            <Col xs={4} md={3} >
                                <Card.Img src="kit.png " />
                            </Col>
                            <Col >
                                <Row className="mt-2">
                                    <Card.Text className="mr-4 mt-2">
                                        Propolis Light Cream COSRX
                                    </Card.Text>
                                </Row>
                                <Row className="mt-3 mb-2">
                                    {/* <Button className="border-dark mr-2" >-</Button> */}
                                    <Button className="border-dark mr-1" style={{ width: "36px", backgroundColor: "white", color: "black" }} >-</Button>
                                    <Form.Control className="mr-1" style={{ width: "44px" }} />
                                    <Button className="border-dark" style={{ backgroundColor: "white", color: "black" }}>+</Button>
                                    <h5 className="font-weight-bold mt-1 mb-2 ml-2">39$</h5>
                                    <Col className="text-right mr-3">
                                        <Row>
                                            <Col><FontAwesomeIcon icon={faTrash} size="xl" style={{ color: "gray" }} /></Col>
                                        </Row>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Card>
                    <Card className="mt-2" style={{ width: '700px', backgroundColor: "#fcfcfc" }}>
                        <Row>
                            <Col xs={4} md={3} >
                                <Card.Img src="cream.png " />
                            </Col>
                            <Col >
                                <Row className="mt-2">
                                    <Card.Text className="mr-4 mt-2">
                                        Propolis Light Cream COSRX
                                    </Card.Text>
                                </Row>
                                <Row className="mt-3 mb-2">
                                    <Button className="border-dark mr-1" style={{ width: "36px", backgroundColor: "white", color: "black" }} >-</Button>
                                    <Form.Control className="mr-1" style={{ width: "44px" }} />
                                    <Button className="border-dark" style={{ backgroundColor: "white", color: "black" }}>+</Button>
                                    <h5 className="font-weight-bold mt-1 mb-2 ml-2">39$</h5>
                                    <Col className="text-right mr-3">
                                        <Row>
                                            <Col><FontAwesomeIcon icon={faTrash} size="xl" style={{ color: "gray" }} /></Col>
                                        </Row>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Card>
                </Row>
                <Container className="w-50 border-top border-secondary mt-3"></Container>
                <Row className="mt-4 justify-content-center">
                    <Card style={{ width: '700px', backgroundColor: "#fcfcfc" }}>
                        <Row>
                            <Col className="mt-2 ml-3 mb-2" >
                                <h5>Total</h5>
                            </Col>
                            <Col className="mt-2">
                                Quntity: 2 pc.
                            </Col>
                            <Col className="mt-2">
                                Price: 78$
                            </Col>
                            {/* <Col className="mt-2">
                                <Button variant="light" style={{ width: "90px" }}><small>empty card</small></Button>
                            </Col> */}
                        </Row>
                    </Card>
                </Row>
            </Container>
            <Container className="d-flex justify-content-center mt-5">
                <Row>
                    <Col>
                        <Link to="/shop">
                            <Button variant="secondary" style={{ width: "131px" }}>Back to Store</Button>
                        </Link>
                    </Col>
                    <Col>
                    <Link to="/checkout_page">
                        <Button style={{ width: "131px" }}>Place Order</Button>
                    </Link>
                    </Col>
                </Row>
            </Container>
        </Container>

    )
}