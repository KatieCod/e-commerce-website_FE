import React, { useContext, useState, useEffect } from "react";
import { Context } from "../context";
import { Container, Col, Row, Form, Button } from "react-bootstrap";
import UserPageOrder from "../components/UserPageOrder";

function UserDetailsForAdmin(props) {

    const [counter, setCounter] = useState(0)

    const { orders } = useContext(Context)

    let { id, first_name, last_name, email, phone, admin_access, address, city, country, zip } = props.user

    useEffect(() => {
        const hasOrders = orders.some(order => order.user_id === id);

        if (hasOrders) {
            setCounter(1);
        }
    }, [orders, id]);

    return (
        <Container className="text-center mt-3 mb-3" style={{ backgroundColor: 'rgb(252, 252, 252)' }}>
            <div className="mb-3">
                <Container>
                    <h3 className=" text-center mt-5">Personal Details</h3>
                    <Form className="mt-4 ml-5 mr-5 ">
                        <Row>
                            <Col xs={4}>
                                <Form.Control
                                    placeholder={`${first_name} ${last_name}`}
                                    readOnly
                                />
                            </Col>
                            <Col>
                                <Form.Control
                                    placeholder={`${country}`}
                                    readOnly
                                />
                            </Col>
                        </Row>
                        <Row className="mt-3">
                            <Col xs={4}>
                                <Form.Control
                                    placeholder={`${email}`}
                                    readOnly
                                />
                            </Col>
                            <Col xs={5}>
                                <Form.Control
                                    placeholder={`${city}`}
                                    readOnly
                                />
                            </Col>
                            <Col>
                                <Form.Control
                                    placeholder={`${zip}`}
                                    readOnly
                                />
                            </Col>
                        </Row>
                        <Row className="mt-3">
                            <Col xs={4}>
                                <Form.Control
                                    placeholder={`${phone}`}
                                    readOnly
                                />
                            </Col>
                            <Col>
                                <Form.Control
                                    placeholder={`${address}`}
                                    readOnly
                                />
                            </Col>
                        </Row>
                    </Form>
                </Container>
                {counter > 0
                    ?
                    <div>
                        <h3 className=" text-center mt-5">List of Orders</h3>
                    </div>
                    : <> </>
                }
                {orders.map(order => {
                    if (order.user_id === id) {
                        return <UserPageOrder order={order} />
                    } 
                })} 
            </div>
        </Container>
    )
}

export default UserDetailsForAdmin;