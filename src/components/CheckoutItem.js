import React from "react";
import { Container, Button, Row, Col, Card, Form } from "react-bootstrap";

function CheckoutItem(props) {

    let {product_name, product_unit_price, product_main_photo, quantity} = props.item

    return (
        <Container >
            <Row className="justify-content-center">
                <div>
                    <div className="p-2 mt-2 bg-light text-dark rounded">
                        <Row className='align-items-center'>
                            <Col xs={3}><Card.Img src={`./items/${product_main_photo}`} /></Col>
                            <Col>
                                <Row>
                                    <Col xs={9}><Card.Text className="text-left">{product_name}</Card.Text ></Col>
                                </Row>
                                <Row className="mt-3">
                                    <Col><Card.Text className="text-left font-weight-bold">{product_unit_price}$ * {quantity} PC</Card.Text></Col>
                                </Row>
                            </Col>
                            <Col className='mr-4' xs={2}><h4 className="text-left font-weight-bold">{product_unit_price*quantity}$</h4></Col>
                        </Row>
                    </div>
                </div>
            </Row>
        </Container>
    )
}

export default CheckoutItem;