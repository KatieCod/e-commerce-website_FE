import React, { useContext, useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Context } from "../context";
import CartItemForAdminPage from "../components/CartItemForAdminPage";
import UserForAdminPage from "../components/UserForAdminPage";
import ItemDetailsForAdmin from "../components/ItemDetailsForAdmin";
import { Link } from "react-router-dom";

function AdminPage() {

    const [show, setShow] = useState('');
    const [addItem, setAddItem] = useState(false);
    const { products, users, currentUser } = useContext(Context)

    const manageShow = (status) => {
        setShow(status)
    }


    if (Object.keys(currentUser).length > 0 && currentUser.admin_access) {
        return (
            <Container>
                <Row>
                    <Col md={4} className="text-md-right text-center mt-md-5 mt-0">
                        <Container>
                            <Row className="mt-3" >
                                <Col>
                                    <Button variant="secondary" style={{ width: '200px' }} onClick={() => { manageShow('items') }}>Manage Items</Button>
                                </Col>
                            </Row>
                            <Row className="mt-3">
                                <Col>
                                    <Button variant="secondary" style={{ width: '200px' }} onClick={() => { manageShow('users') }}>Manage Users</Button>
                                </Col>
                            </Row>
                            <Row className="mt-3">
                                <Col>
                                    <Button variant="secondary" style={{ width: '200px' }} onClick={() => { manageShow('inbox') }}>Manage Inbox</Button>
                                </Col>
                            </Row>
                            <Row className="mt-3 mb-3">
                                <Col>
                                    <Button variant="secondary" style={{ width: '200px' }} onClick={() => { manageShow('reviews') }}>Manage Reviews</Button>
                                </Col>
                            </Row>
                        </Container>

                    </Col>
                    <Col md={8}>
                        <Container>
                            {show === 'items' && (
                                <>
                                    <Container className="text-md-right text-center mt-3">
                                        <Button variant="success" style={{ width: '100px' }} onClick={() => { setAddItem(!addItem) }}>Add Item</Button>
                                    </Container>
                                    {addItem ? <Row><ItemDetailsForAdmin /></Row> : null}

                                </>
                            )}
                            {show === 'items' && (products.map((product) => (
                                <Row>
                                    <CartItemForAdminPage key={product.id} item={product} />
                                </Row>
                            ))
                            )}
                            {show === 'users' && (users.map((user) => (
                                <Row>
                                    <UserForAdminPage key={user.id} user={user} />
                                </Row>
                            ))
                            )}
                        </Container>
                    </Col>
                </Row>
            </Container>
        )
    } else if (Object.keys(currentUser).length > 0 && !currentUser.admin_access) {
        return (
            <Container className="text-center mt-5 mb-5">
                <h1>You do not have access to admin website, please log in as admin!</h1>
            </Container>
        )
    } else {
        return (
            <Container className="text-center mt-5">
                <h1>You are not registered, please do so here:</h1>
                <Link to='/login_page'>
                    <Container className="text-center mt-5">
                        <Button>Log in</Button>
                    </Container>
                </Link>
            </Container>
        )
    }
}

export default AdminPage;
