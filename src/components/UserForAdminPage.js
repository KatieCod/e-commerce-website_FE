import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretUp, faCat } from '@fortawesome/free-solid-svg-icons'
import { Card, Row, Col, Button } from "react-bootstrap";
import UserDetailsForAdmin from "./UserDetailsForAdmin";
import { useToggle } from "../hooks/useToggle";

function UserForAdminPage(props) {

    const [details, toggleDetails] = useToggle(false)

    let { first_name, last_name } = props.user

    return (<>
        <Card className="mt-2" style={{ maxWidth: '800px', backgroundColor: "#fcfcfc" }} onClick={toggleDetails}>
            <Row>
                <Col xs={4} lg={3} className="d-flex align-items-center">
                    <Card.Img src={`./user/user.webp`} />
                </Col>
                <Col >
                    <Row className="mt-2 text-left">
                        <Col className="text-left mt-3 mt-sm-4">
                        </Col>
                        <Col className="text-right align-item-center mt-2 mr-3">
                            {details
                                ?
                                <FontAwesomeIcon icon={faCaretUp} rotation={180} size="xl"/>

                                :
                                <FontAwesomeIcon icon={faCaretUp} rotation={90} size="xl" />
                            }
                        </Col>
                    </Row>
                    <Row className="mb-5 mr-2" >
                        <Col>
                            <h5>{first_name + ' ' + last_name}</h5>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Card>
        {
            details
                ?
                <UserDetailsForAdmin user={props.user} />
                :
                <></>
        }
    </>
    )
}

export default UserForAdminPage;