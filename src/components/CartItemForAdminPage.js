import React, { useContext } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretUp } from '@fortawesome/free-solid-svg-icons'
import { Card, Row, Col } from "react-bootstrap";
import { Context } from "../context";
import { useToggle } from "../hooks/useToggle";
import ItemDetailsForAdmin from "./ItemDetailsForAdmin";

function CartItemForAdminPage(props) {

    const [details, toggleDetails] = useToggle(false)
    const { currentUser } = useContext(Context)

    let { id, name, unit_price, main_photo, quantity } = props.item

    return (
        <>
            <Card className="mt-2" style={{ width: '800px', backgroundColor: "#fcfcfc" }} onClick={toggleDetails}>
                <Row>
                    <Col xs={4} md={3} >
                        <Card.Img src={`./items/${main_photo}`} />
                    </Col>
                    <Col >
                        <Row className="mt-2 text-left">
                            <Col className="text-right align-item-center mt-2 mr-3">
                                {details
                                    ?
                                    <FontAwesomeIcon icon={faCaretUp} rotation={180} size="xl" />

                                    :
                                    <FontAwesomeIcon icon={faCaretUp} rotation={90} size="xl" />
                                }                        </Col>
                        </Row>
                        <Row className="mb-5 mr-2" >
                            <Col>
                                <h6>{name}</h6>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Card>
            {details
                ?
                <ItemDetailsForAdmin item={props.item} />
                :
                null
            }
        </>

    )
}

export default CartItemForAdminPage;