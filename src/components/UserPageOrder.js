import React, { useContext, useState } from "react";
import { Context } from "../context";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretUp } from '@fortawesome/free-solid-svg-icons'
import { Container, Col, Row, Form, Button, Card } from "react-bootstrap";
import UserPageItem from "../components/UserPageItem";
import { useToggle } from '../hooks/useToggle'

function UserPageOrder(props) {

    const { orderDetails } = useContext(Context)
    const [showCart, toggleCart] = useToggle(false)

    const sqlDate = new Date(props.order.order_date);

    let totalQuantity = 0;
    let totalPrice = 0;

    return (
        <>
            <Container style={{ maxWidth: '600px' }}>
                <Row className="justify-content-center align-items-center">
                    <Button onClick={toggleCart} className="mt-4 text-left font-weight-bold" style={{ width: "100%" }} variant="light">
                        <Row >
                            <Col xs={4} className="mt-1"><h5>Order № {props.order.id}</h5></Col>
                            <Col className="text-right mt-2"><h6>order date: {sqlDate.toLocaleDateString()}</h6></Col>
                            <Col xs={1} className="text-right">
                                {!showCart ?
                                    <FontAwesomeIcon icon={faCaretUp} rotation={90} /> :
                                    <FontAwesomeIcon icon={faCaretUp} rotation={180} />
                                }
                            </Col>
                        </Row>
                    </Button>
                </Row>
            </Container>
            {orderDetails.map(detail => {
                if (showCart && props.order.id === detail.order_id) {
                    totalQuantity = totalQuantity + detail.quantity
                    totalPrice = totalPrice + (detail.total_price)
                    return <UserPageItem detail={detail} />
                }

            })}
            {!showCart? <></> : <>
            <Container className="border-top border-secondary mt-3" style={{ maxWidth: "450px" }}></Container>
            <Container className="bg-light mt-3" style={{ maxWidth: '600px' }}>
                <Row className='align-items-center'>
                    <Col xs={3}><h5>Total:</h5></Col>
                    <Col>
                        <Row>
                            <Col xs={9}><Card.Text className="text-left"></Card.Text ></Col>
                        </Row>
                    </Col>
                    <Col xs={2}><h6 className="text-right font-weight-bold">{totalQuantity}PC</h6></Col>
                    <Col className='mr-4' xs={2}><h4 className="text-left font-weight-bold">{totalPrice}$</h4></Col>
                </Row>
            </Container>
            </>
            }
        </>
    )
}

export default UserPageOrder;