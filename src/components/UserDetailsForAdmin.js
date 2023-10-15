import React, { useContext } from "react";
import { Context } from "../context";
import { Container, Col, Row, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import UserPageOrder from "../components/UserPageOrder";


function UserDetailsForAdmin(props) {

    const { orders } = useContext(Context)
    let { id, first_name, last_name, email, phone, admin_access, address, city, country, zip } = props.user

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
                {Array.isArray(orders) && orders.length > 0
                    ?
                    <h3 className=" text-center mt-5">List of Orders</h3>
                    : null
                }
                { orders.map(order => {
                    if (order.user_id === id) {
                        return <UserPageOrder order={order} />
                    }
                })}
            </div>
        </Container>
    )
}

export default UserDetailsForAdmin;