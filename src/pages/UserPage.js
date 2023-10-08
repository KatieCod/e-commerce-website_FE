import React, { useContext } from "react";
import { Context } from "../context";
import { Container, Col, Row, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import UserPageOrder from "../components/UserPageOrder";


function UserPage() {
    const { currentUser, orders } = useContext(Context)
    return (
        <Container className="text-center mt-5">
            {!Object.keys(currentUser).length > 0
                ? <>
                    <h1 className="mb-5">You are not registered!</h1>
                    <Link to='/login_page'>Log in for seing your account</Link>
                </>
                :
                <>
                    <h1 className="mb-5">Welcome {`${currentUser.first_name}`}!</h1>

                    <Container>
                        <h3 className=" text-center mt-5">Personal Details</h3>
                        <Form className="mt-4 ml-5 mr-5 ">
                            <Row>
                                <Col xs={4}>
                                    <Form.Control
                                        placeholder={Object.keys(currentUser).length > 0 ? `${currentUser.first_name} ${currentUser.last_name}` : `full name`}
                                        readOnly
                                    />
                                </Col>
                                <Col>
                                    <Form.Control
                                        placeholder={Object.keys(currentUser).length > 0 ? `${currentUser.country}` : `country`}
                                        readOnly
                                    />
                                </Col>
                            </Row>
                            <Row className="mt-3">
                                <Col xs={4}>
                                    <Form.Control
                                        placeholder={Object.keys(currentUser).length > 0 ? `${currentUser.email}` : `email`}
                                        readOnly
                                    />
                                </Col>
                                <Col xs={5}>
                                    <Form.Control
                                        placeholder={Object.keys(currentUser).length > 0 ? `${currentUser.city}` : `city`}
                                        readOnly
                                    />
                                </Col>
                                <Col>
                                    <Form.Control
                                        placeholder={Object.keys(currentUser).length > 0 ? `${currentUser.zip}` : `zip`}
                                        readOnly
                                    />
                                </Col>
                            </Row>
                            <Row className="mt-3">
                                <Col xs={4}>
                                    <Form.Control
                                        placeholder={Object.keys(currentUser).length > 0 ? `${currentUser.phone}` : `phone`}
                                        readOnly
                                    />
                                </Col>
                                <Col>
                                    <Form.Control
                                        placeholder={Object.keys(currentUser).length > 0 ? `${currentUser.address}` : `address`}
                                        readOnly
                                    />
                                </Col>
                            </Row>
                            <Button className="mt-5">
                                Change Details
                            </Button>
                        </Form>
                    </Container>
                    <h3 className=" text-center mt-5">List of Orders</h3>
                    {orders.map(order => {
                        if (order.user_id === currentUser.id) {
                            return <UserPageOrder order={order} />
                        }
                    })}
                </>
            }
        </Container>
    )
}

export default UserPage;