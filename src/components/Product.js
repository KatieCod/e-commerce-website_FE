import React, { useContext, useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar, faCartShopping } from '@fortawesome/free-solid-svg-icons'
import { faHeart } from '@fortawesome/free-regular-svg-icons'
import { Row, Col } from "react-bootstrap";
import axios from "axios";
import { Link } from "react-router-dom";
import { Context } from "../context";
import { useToggle } from "../hooks/useToggle";


function Product(props) {

    const [changeCart, toggleChangeCart] = useToggle(false);
    const [changeCart2, toggleChangeCart2] = useToggle(false);
    let [stock, setStock] = useState();
    let [itemQuantity, setItemQuantity] = useState();

    let { id, name, unit_price, main_photo, quantity = 1 } = props.product || {}
    let productData = { id, name, unit_price, main_photo, quantity }

    const baseUrl = "http://localhost:3000"

    useEffect(() => {
        let cartItmes = axios.get('http://localhost:3100/products')
        cartItmes.then(res => {
            for (let i = 0; i < res.data.length; i++) {
                if (res.data[i].id === id) {
                    setStock(res.data[i].stock)
                }
            }
        })
    }, [])

    useEffect(() => {
        let quantity = axios.get('http://localhost:3100/cart')
        quantity.then(res => {
            if (res.data.length === 0) {
                setItemQuantity(0)
            } else {
                for (let i = 0; i < res.data.length; i++) {
                    if (res.data[i].product_id === id) {
                        setItemQuantity(res.data[i].quantity)
                    }
                }
            }
        })
    }, [changeCart, changeCart2])

    const addToCart = () => {
        axios.post('http://localhost:3100/products/add-to-cart', productData)
            .then(result => {
                if (!result.data.failure) {
                    toggleChangeCart()
                } else {
                    console.log(result.data.failure)
                }
            })
            .catch(err => console.log(err))
    }

    const decreaseQunatity = () => {
        axios.post('http://localhost:3100/cart/decrease-quantity', productData)
            .then(result => {
                if (!result.data.failure) {
                    toggleChangeCart2()
                } else {
                    console.log(result.data.failure)
                }
            })
            .catch(err => console.log(err))
    }

    return (
        <div class="card border-0 text-center" style={{ width: "18rem;" }}>
            <Link style={{ textDecoration: 'none', color: 'black' }} to={`/product/${id}`}>
                <div className="image-wrapper">
                    <img className="card-img-top" src={`${baseUrl}/items/${main_photo}`} alt="Card image cap" />
                    <div className="image-icon"><FontAwesomeIcon icon={faHeart} style={{ color: "#ff476c" }} size="lg" /></div>
                </div>
                <div className="card-body text-center">
                    <h6>{name}</h6>
                </div>
            </Link>
            {!itemQuantity > 0
                ?
                <Row>
                    <Col xs={4} className="text-right"></Col>
                    <Col xs={4} className="text-center"><h5 >${unit_price}</h5></Col>
                    <Col xs={4} className="text-right"><div onClick={() => { addToCart() }} style={{ cursor: 'pointer' }}><FontAwesomeIcon icon={faCartShopping} style={{ marginRight: "8px" }} size="xl" /></div></Col>
                </Row>
                :
                <Row>
                    <Col xs={6} className="text-center"><h5 >${unit_price}</h5></Col>
                    <Col xs={6} className="text-right">
                        <Row>
                            <div>
                                <button style={{ width: '30px', border: 0, borderRadius: '1px', backgroundColor: 'whitesmoke' }} onClick={() => { addToCart() }}>+</button>
                                <input style={{ width: '30px', border: 0, textAlign: 'center' }} value={itemQuantity} />
                                <button style={{ width: '30px', border: 0, borderRadius: '1px', backgroundColor: 'whitesmoke' }} onClick={() => { decreaseQunatity() }}>-</button>
                            </div>
                        </Row>
                    </Col>
                </Row>
            }
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