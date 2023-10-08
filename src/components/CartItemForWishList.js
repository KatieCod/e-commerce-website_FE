import React, {useContext} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faX } from '@fortawesome/free-solid-svg-icons'
import { Card, Row, Col } from "react-bootstrap";
import axios from "axios";
import { Context } from "../context";

function CartItemForWishList(props) {
    const { currentUser } = useContext(Context)

    let {product_id, quantity, product_main_photo, product_unit_price, product_name} = props.item

    const removeFromWishList = () => {
        if (Object.keys(currentUser).length > 0) {
            axios.post('http://localhost:3100/cart/remove-from-cart', {id: product_id})
                .then(result => {
                    if (!result.data.failure) {
                        props.toggleCart()
                    } else {
                        console.log(result.data.failure)
                    }
                })
                .catch(err => console.log(err))
        } else {
            const wishListFromLocalStorage = JSON.parse(localStorage.getItem('wishlist'))
            for (let i = 0; i < wishListFromLocalStorage.length; i++) {
                if (wishListFromLocalStorage[i].product_id === product_id) {
                    wishListFromLocalStorage.splice(i, 1)
                }
            }
            localStorage.setItem('wishlist', JSON.stringify(wishListFromLocalStorage))
        }
    }

    return(
        <Card className="mt-2" style={{ width: '600px', backgroundColor: "#fcfcfc"}}>
        <Row>
            <Col xs={4} md={3} >
                <Card.Img src={`./items/${product_main_photo}`}/>
            </Col>
            <Col >
                <Row className="mt-2 text-left">
                    <Col className="text-left mt-3 mt-sm-4">
                        <h5 style={{ fontWeight: 'bold' }}>$ {product_unit_price*quantity}</h5>
                    </Col>
                    <Col className="text-right mt-2 mr-3">
                        <div onClick={() => {removeFromWishList(); props.toggleCart()}} style={{cursor: 'pointer'}}><FontAwesomeIcon icon={faX} style={{ color: "gray" }} /></div>
                    </Col>
                </Row>
                <Row className="mb-5 mr-2" >
                    <Col>
                        <h6>{product_name}</h6>
                    </Col>
                </Row>
            </Col>
        </Row>
    </Card>
    )
}

export default CartItemForWishList;