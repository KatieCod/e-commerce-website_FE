import React, { useEffect, useState, useContext } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faX } from '@fortawesome/free-solid-svg-icons'
import { Card, Row, Col } from "react-bootstrap";
import { Context } from "../context";
import { useToggle } from "../hooks/useToggle";
import axios from "axios";

function CartItem(props) {

    let [itemQuantity, setItemQuantity] = useState(0);
    let [stock, setStock] = useState();
    const [cart, changeCart] = useToggle()
    const { currentUser, products, toggleIAmState } = useContext(Context)

    let { product_id, quantity, product_main_photo, product_unit_price, product_name } = props.item
    let productData = { id: product_id, name: product_name, unit_price: product_unit_price, main_photo: product_main_photo, quantity, user_id: currentUser.id }
    let productDataForLocalStorage = { product_id, product_name, product_unit_price, product_main_photo, quantity }


    useEffect(() => {
        for (let i = 0; i < products.length; i++) {
            if (products[i].id === product_id) {
                setStock(products[i].stock)
            }
        }
    }, [])

    useEffect(() => {
        if (Object.keys(currentUser).length > 0) {
            let quantityRequest = axios.get('http://localhost:3100/cart');

            Promise.all([quantityRequest])
                .then(([quantityResponse]) => {
                    let newQuantity = 0;

                    if (quantityResponse.data.length > 0) {
                        for (let i = 0; i < quantityResponse.data.length; i++) {
                            if (quantityResponse.data[i].product_id === product_id) {
                                newQuantity = quantityResponse.data[i].quantity
                                break;
                            }
                        }
                    }

                    setItemQuantity(newQuantity);
                })
        } else {
            const cartFromLocalStorage = JSON.parse(localStorage.getItem('cart'))
            if (cartFromLocalStorage === null) {
                localStorage.setItem('cart', JSON.stringify([]))
            }
            setItemQuantity(0)
            for (let i = 0; i < cartFromLocalStorage.length; i++) {
                if (cartFromLocalStorage[i].product_id === productDataForLocalStorage.product_id) {
                    setItemQuantity(cartFromLocalStorage[i].quantity)
                    break;
                } else {
                    setItemQuantity(0)
                }
            }
        }

    }, [cart, itemQuantity])

    const addToCart = () => {
        if (Object.keys(currentUser).length > 0) {
            if (itemQuantity < stock) {
                axios.post('http://localhost:3100/products/add-to-cart', productData)
                    .then(result => {
                        if (!result.data.failure) {
                            changeCart()
                        } else {
                            console.log(result.data.failure)
                        }
                    })
                    .catch(err => console.log(err))
            } else {
                props.notify()
            }
        } else {
            const cartFromLocalStorage = JSON.parse(localStorage.getItem('cart'))
            if (!cartFromLocalStorage || cartFromLocalStorage.length === 0) {
                const firstItem = { ...productDataForLocalStorage, quantity: 1 };
                setItemQuantity(1)
                localStorage.setItem('cart', JSON.stringify([firstItem]))
            } else {
                let itemFound = false;
                for (let i = 0; i < cartFromLocalStorage.length; i++) {
                    if (cartFromLocalStorage[i].quantity < stock) {
                        if (cartFromLocalStorage[i].product_id === productDataForLocalStorage.product_id) {
                            cartFromLocalStorage[i].quantity += 1
                            setItemQuantity(cartFromLocalStorage[i].quantity)
                            itemFound = true;
                            break;
                        }
                    } else {
                        props.notify()
                    }
                }

                if (!itemFound) {
                    const anotherItem = { ...productDataForLocalStorage, quantity: 1 };
                    setItemQuantity(1)
                    cartFromLocalStorage.push(anotherItem)
                }

                localStorage.setItem('cart', JSON.stringify(cartFromLocalStorage))
            }
        }
    }

    const decreaseQunatity = () => {
        if (Object.keys(currentUser).length > 0) {
            axios.post('http://localhost:3100/cart/decrease-quantity', productData)
                .then(result => {
                    if (!result.data.failure) {
                        changeCart()
                    } else {
                        console.log(result.data.failure)
                    }
                })
                .catch(err => console.log(err))
        } else {
            const cartFromLocalStorage = JSON.parse(localStorage.getItem('cart'))

            for (let i = 0; i < cartFromLocalStorage.length; i++) {
                if (cartFromLocalStorage[i].product_id === productDataForLocalStorage.product_id) {
                    if (cartFromLocalStorage[i].quantity > 1) {
                        cartFromLocalStorage[i].quantity -= 1
                        setItemQuantity(cartFromLocalStorage[i].quantity)
                        break;
                    } else {
                        cartFromLocalStorage.splice(i)
                        setItemQuantity(0)
                    }
                }
            }

            localStorage.setItem('cart', JSON.stringify(cartFromLocalStorage))
        }
    }

    return (
        <Card className="mt-2" style={{ width: '700px', backgroundColor: "#fcfcfc" }}>
            <Row>
                <Col xs={5} md={4} >
                    <Card.Img src={`./items/${product_main_photo}`} />
                </Col>
                <Col >
                    <Row className="mt-2 text-left">
                        <Col className="text-left mt-3 mt-sm-4">
                            <h5 style={{ fontWeight: 'bold' }}>$ {product_unit_price * quantity}</h5>
                        </Col>
                        <Col className="text-right mt-2 mr-3">
                            <div onClick={() => { props.removeFromCart(product_id); toggleIAmState() }} style={{ cursor: 'pointer' }}><FontAwesomeIcon icon={faX} style={{ color: "gray" }} /></div>
                        </Col>
                    </Row>
                    <Row className="mb-2 mr-2">
                        <Col>
                            <h6>{product_name}</h6>
                        </Col>
                    </Row>
                    <Row >
                        <Col>
                            <div>
                                <button style={{ width: '30px', border: 0, borderRadius: '1px', backgroundColor: 'whitesmoke' }} onClick={() => { addToCart(); props.toggleCart() }}>+</button>
                                <input style={{ width: '30px', border: 0, textAlign: 'center' }} value={itemQuantity} />
                                <button style={{ width: '30px', border: 0, borderRadius: '1px', backgroundColor: 'whitesmoke' }} onClick={() => { decreaseQunatity(); props.toggleCart() }}>-</button>
                            </div>
                        </Col>
                    </Row>
                    {/* <Row className="mb-3 mt-3">
                        <Col>
                            <button className="text-muted border-0" style={{ backgroundColor: '#fcfcfc' }}> <FontAwesomeIcon icon={faHeart} color="red" size="xl" /> add to whishlist </button>
                        </Col>
                    </Row> */}
                </Col>
            </Row>
        </Card>
    )
}

export default CartItem;