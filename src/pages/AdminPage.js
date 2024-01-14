import React, { useContext, useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Context } from "../context";
import CartItemForAdminPage from "../components/CartItemForAdminPage";
import UserForAdminPage from "../components/UserForAdminPage";
import ItemDetailsForAdmin from "../components/ItemDetailsForAdmin";
import ReviewsForAdmin from "../components/ReviewsForAdmin";
import { Link } from "react-router-dom";

function AdminPage() {

    const [show, setShow] = useState('');
    const [addItem, setAddItem] = useState(false);
    const { products, users, currentUser, reviews } = useContext(Context)
    const [pagination, setPagination] = useState(4);
    const [showNotApproved, setShowNotApproved] = useState(false);

    const manageShow = (status) => {
        setShow(status)
    }

    const filteredReviews = showNotApproved ? reviews.filter((review) => !review.approved) : reviews

    if (Object.keys(currentUser).length > 0 && currentUser.admin_access) {
        return (
            <Container>
                <Row>
                    <Col md={4} className="text-md-right text-center mt-md-5 mt-0">
                        <Container>
                            <Row className="mt-3" >
                                <Col>
                                    <Button variant={show === 'items' ? "success" : "light"} style={{ width: '200px', border: '1px solid lightgray' }} onClick={() => { manageShow('items') }}>Manage Items</Button>
                                </Col>
                            </Row>
                            <Row className="mt-3">
                                <Col>
                                    <Button variant={show === 'users' ? "success" : "light"} style={{ width: '200px', border: '1px solid lightgray' }} onClick={() => { manageShow('users') }}>Manage Users</Button>
                                </Col>
                            </Row>
                            <Row className="mt-3">
                                <Col>
                                    <Button variant={show === 'inbox' ? "success" : "light"} style={{ width: '200px', border: '1px solid lightgray' }} onClick={() => { manageShow('inbox') }}>Manage Inbox</Button>
                                </Col>
                            </Row>
                            <Row className="mt-3 mb-3">
                                <Col>
                                    <Button variant={show === 'reviews' ? "success" : "light"} style={{ width: '200px', border: '1px solid lightgray' }} onClick={() => { manageShow('reviews') }}>Manage Reviews</Button>
                                </Col>
                            </Row>
                        </Container>

                    </Col>
                    <Col md={8}>
                        <Container>
                            {show === 'items' && (
                                <>
                                 <Container className="text-center mt-3">
                                        <h3>Manage Items</h3>
                                    </Container>
                                    <Container className="text-md-right text-center mt-3">
                                        <Button variant="success" style={{ width: '100px' }} onClick={() => { setAddItem(!addItem) }}>Add Item</Button>
                                    </Container>
                                    {addItem ? <Row><ItemDetailsForAdmin /></Row> : null}

                                </>
                            )}
                            {show === 'items' && (products.map((product, index) => (
                                index < pagination &&
                                (<Row>
                                    <CartItemForAdminPage key={product.id} item={product} />
                                </Row>)
                            ))
                            )}
                            {show === 'items' && (
                                < Container className="mt-3 d-flex justify-content-center" >
                                    {pagination < 4 ? null : <Button variant="success" onClick={() => { setPagination(pagination - 4) }} className="mr-3 ">Show Less</Button>}
                                    <Button variant="success" onClick={() => {
                                        setPagination(pagination + 4)
                                    }}>
                                        Show More
                                    </Button>
                                </Container >
                            )}
                            {show === 'users' && (
                                <>
                                    <Container className="text-center mt-3">
                                        <h3>Manage Users</h3>
                                    </Container>
                                </>
                            )}
                            {show === 'users' && (users.map((user) => (
                                <Row>
                                    <UserForAdminPage key={user.id} user={user} />
                                </Row>
                            ))
                            )}
                            {show === 'reviews' && (
                                <>
                                    <Container className="text-center mt-3">
                                        <h3>Manage Reviews</h3>
                                    </Container>
                                    <Container className="text-md-right text-center mt-3">
                                        <Button variant="success" onClick={() => setShowNotApproved(!showNotApproved)}>{showNotApproved ? 'Show All' :'Show not Approved'}</Button>
                                    </Container>
                                </>
                            )}
                            {show === 'reviews' && (filteredReviews.map((review, index) => (
                                index < pagination &&
                                (<Row>
                                    <ReviewsForAdmin key={review.id} review={review} />
                                </Row>)
                                
                            ))
                            )}
                            {show === 'reviews' && (
                                < Container className="mt-3 d-flex justify-content-center" >
                                    {pagination < 4 ? null : <Button variant="success" onClick={() => { setPagination(pagination - 4) }} className="mr-3 ">Show Less</Button>}
                                    <Button variant="success" onClick={() => {
                                        setPagination(pagination + 4)
                                    }}>
                                        Show More
                                    </Button>
                                </Container >
                            )}
                        </Container>
                    </Col>
                </Row>
            </Container>
        )
    } else if (Object.keys(currentUser).length > 0 && !currentUser.admin_access) {
        return (
            <Container className="text-center mt-5 mb-5">
                <h1>You do not have access to admin webpage, please log in as admin!</h1>
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
