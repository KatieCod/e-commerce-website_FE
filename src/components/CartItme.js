import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faX } from '@fortawesome/free-solid-svg-icons'
import { Card, Row, Col } from "react-bootstrap";
import axios from "axios";

function CartItem(props) {

    let {product_id, quantity, product_main_photo, product_unit_price, product_name} = props.item

    const removeFromCart = () => {
        axios.post('http://localhost:3100/cart/remove-from-cart', {id: product_id})
            .then(result => {
                if (!result.data.failure) {

                } else {
                    console.log(result.data.failure)
                }
            })
            .catch(err => console.log(err))
    }

    return(
        <Card className="mt-2" style={{ width: '700px', backgroundColor: "#fcfcfc" }}>
        <Row>
            <Col xs={5} md={4} >
                <Card.Img src={`./items/${product_main_photo}`}/>
            </Col>
            <Col >
                <Row className="mt-2 text-left">
                    <Col className="text-left mt-3 mt-sm-4">
                        <h5 style={{ fontWeight: 'bold' }}>$ {product_unit_price*quantity}</h5>
                    </Col>
                    <Col className="text-right mt-2 mr-3">
                        <div onClick={() => {removeFromCart(); props.toogleCart()}} style={{cursor: 'pointer'}}><FontAwesomeIcon icon={faX} style={{ color: "gray" }} /></div>
                    </Col>
                </Row>
                <Row className="mb-2 mr-2">
                    <Col>
                        <h6>{product_name}</h6>
                    </Col>
                </Row>
                <Row >
                    <Col>
                        <h6 className="text-muted">Qty {quantity}</h6>
                    </Col>
                </Row>
                <Row className="mb-3 mt-1">
                    <Col>
                        <button className="text-muted border-0" style={{backgroundColor: '#fcfcfc'}}> <FontAwesomeIcon icon={faHeart} color="red" size="xl" /> add to whishlist </button>
                    </Col>
                </Row>
            </Col>
        </Row>
    </Card>
    )
}

export default CartItem;