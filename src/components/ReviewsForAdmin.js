import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretUp, faCat } from '@fortawesome/free-solid-svg-icons'
import { Card, Row, Col, Button } from "react-bootstrap";
import ReviewDetailsForAdmin from "./ReviewDetailsForAdmin";
import { useToggle } from "../hooks/useToggle";


function ReviewsForAdmin(props) {

    const [details, toggleDetails] = useToggle(false)

    let { id, text, user_id, user_name, ranking, product_id, approved, date, product_name, product_photo } = props.review

    return (
        <>
            <Card className="mt-2" style={{ maxWidth: '800px', backgroundColor: "#fcfcfc" }} onClick={toggleDetails}>
                <Row>
                    <Col xs={4} lg={3} className="d-flex align-items-center">
                        <Card.Img src={`./items/${product_photo}`} />
                    </Col>
                    <Col >
                        <Row className="mt-2 text-left">
                            <Col className="text-left mt-3 mt-sm-4">
                            </Col>
                            <Col className="text-right align-item-center mt-2 mr-3">
                                {details
                                    ?
                                    <FontAwesomeIcon icon={faCaretUp} rotation={180} size="xl" />

                                    :
                                    <FontAwesomeIcon icon={faCaretUp} rotation={90} size="xl" />
                                }
                            </Col>
                        </Row>
                        <Row className="mb-5 mr-2 mt-2" >
                            <Col>
                                <h6 style={{fontWeight: approved ? '' : 'bold'}}>{product_name}</h6>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Card>
            {
                details
                    ?
                    <ReviewDetailsForAdmin review={props.review} />
                    :
                    <></>
            }
        </>
    )
}

export default ReviewsForAdmin;