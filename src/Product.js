import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar, faCartShopping } from '@fortawesome/free-solid-svg-icons'
import { faHeart } from '@fortawesome/free-regular-svg-icons'
import { Row, Col } from "react-bootstrap";

function Product(props) {
    return (
        <div class="card border-0 text-center" style={{ width: "18rem;" }}>
            <div className="image-wrapper">
                <img className="card-img-top" src={props.image} alt="Card image cap" />
                <div className="image-icon"><FontAwesomeIcon icon={faHeart} style={{ color: "#ff476c" }} size="lg" /></div>
            </div>
            <div className="card-body text-center">
                <h6>{props.name}</h6>
            </div>
            <Row >
                <Col xs={4} className="text-right"></Col>
                <Col xs={4} className="text-center"><h5 >${props.price}</h5></Col>
                <Col xs={4} className="text-right"><FontAwesomeIcon icon={faCartShopping} style={{ marginRight: "8px" }} size="xl" /></Col>
            </Row>
            <Row className="justify-content-center">
                <FontAwesomeIcon icon={faStar} style={{ color: "#f5ed0a", }} />
                <FontAwesomeIcon icon={faStar} style={{ color: "#f5ed0a", }} />
                <FontAwesomeIcon icon={faStar} style={{ color: "#f5ed0a", }} />
                <FontAwesomeIcon icon={faStar} style={{ color: "#f5ed0a", }} />
                <FontAwesomeIcon icon={faStar} style={{ color: "#f5ed0a", }} />
            </Row>

        </div>
    )
}

export default Product;