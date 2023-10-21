import React, { useState, useContext } from "react";
import { Container, Col, Row, Form, Button } from "react-bootstrap";
import { Context } from "../context";
import approveReview from "../API/approveReview";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ReviewDetailsForAdmin(props) {

    const [reviewApproved, setReviewApproved] = useState(false)
    const { toggleIAmState } = useContext(Context)

    let { id, text, user_id, user_name, ranking, product_id, approved, date, product_name } = props.review

    const sqlDate = new Date(date);

    const notifyApproved = () => toast('The review has been approved');
    const notifyHide = () => toast('The review has been hidden');

    const handleApprove = () => {
        const productData = { approved: 1, id }
        approveReview(productData, notifyApproved, setReviewApproved, reviewApproved)
        toggleIAmState()
    }

    const handleHide = () => {
        const productData = { approved: 0, id }
        approveReview(productData, notifyHide, setReviewApproved, reviewApproved)
        toggleIAmState()
    }

    return (
        <Container className="mt-3 mb-3" style={{ backgroundColor: 'rgb(252, 252, 252)' }}>
            <div className="mb-3">
                <Container>
                    <h3 className=" text-center mt-5">Review Details</h3>
                    <Form className="mt-4 ml-5 mr-5 ">
                        <Row>
                            <Col>
                                <Form.Label style={{ fontWeight: 'bold' }}>User:</Form.Label>
                                <Form.Control
                                    placeholder={`${user_name}`}
                                    readOnly
                                />
                            </Col>
                            <Col>
                                <Form.Label style={{ fontWeight: 'bold' }}>Review date:</Form.Label>
                                <Form.Control
                                    placeholder={`${sqlDate.toLocaleDateString()}`}
                                    readOnly
                                />
                            </Col>
                        </Row>
                        <Row className="mt-3">
                            <Col xs={4}>
                                <Form.Label style={{ fontWeight: 'bold' }}>Approved:</Form.Label>
                                <Form.Control
                                    placeholder={approved === 1 ? 'yes' : 'no'}
                                    readOnly
                                />
                            </Col>
                            <Col>
                                <Form.Label style={{ fontWeight: 'bold' }}>Ranking:</Form.Label>
                                <Form.Control
                                    placeholder={`${ranking}`}
                                    readOnly
                                />
                            </Col>
                        </Row>
                        <Row className="mt-3">
                            <Col>
                                <Form.Label style={{ fontWeight: 'bold' }}>Text:</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={5}
                                    placeholder={`${text}`}
                                />
                            </Col>
                        </Row>
                        <Container className="text-center">
                            {approved ?
                                <Button className="mt-3" variant="danger" onClick={handleHide}> Hide </Button>
                                :
                                <Button className="mr-3 mt-3" variant="success" onClick={handleApprove}> Approve </Button>
                            }
                            <ToastContainer />
                        </Container>
                    </Form>
                </Container>
            </div>
        </Container>
    )
}

export default ReviewDetailsForAdmin;