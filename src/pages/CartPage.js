import React, { useContext } from "react";
import { Container, Card, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import CartItem from "../components/CartItme";
import { useToggle } from "../hooks/useToggle";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Context } from "../context";

export default function CartPage() {

    const [cartItems, setCartItems] = useState([])
    const [cart, toggleCart] = useToggle(false)
    const { currentUser, setStateForShopItemQuantity, stateForShopItemQuantity, toggleIAmState, iAmState } = useContext(Context)

    const notify = () => toast("Your cart is empty, add some items to proceed");

    useEffect(() => {
        if (Object.keys(currentUser).length > 0) {
            let cartItmes = axios.get('http://localhost:3100/cart')
            cartItmes.then(res => {
                setCartItems(res.data)
            })
        } else {
            const unauthorisedCart = JSON.parse(localStorage.getItem('cart'))
            setCartItems(unauthorisedCart)
        }
    }, [cart, iAmState])

    const removeFromCart = (product_id) => {
        if (Object.keys(currentUser).length > 0) {
            axios.post('http://localhost:3100/cart/remove-from-cart', {id: product_id})
                .then(result => {
                    if (!result.data.failure) {
                        toggleIAmState()
                        toggleCart()
                    } else {
                        console.log(result.data.failure)
                    }
                })
                .catch(err => console.log(err))
        } else {
            const cartFromLocalStorage = JSON.parse(localStorage.getItem('cart'))
            for (let i = 0; i < cartFromLocalStorage.length; i++) {
                if (cartFromLocalStorage[i].product_id === product_id) {
                    cartFromLocalStorage.splice(i, 1);
                    setStateForShopItemQuantity(!stateForShopItemQuantity);
                    toggleIAmState();
                }
            }
            localStorage.setItem('cart', JSON.stringify(cartFromLocalStorage))
        }
    }

    let totalQuantity = 0;
    let totalPrice = 0;

    return (
        <Container>
            <h1 className="text-center mt-5">Cart</h1>
            <Container className="mt-4 justify-content-center">
                <Row className="mt-4 justify-content-center">
                    {cartItems.map(item => {
                        totalQuantity = totalQuantity + item.quantity
                        totalPrice = totalPrice + (item.quantity * item.product_unit_price)
                        console.log(item)
                        if (item.quantity > 0) {
                            return <CartItem key={item.id} item={item} removeFromCart={removeFromCart} />
                        }
                    })}

                </Row>
                <Container className="w-50 border-top border-secondary mt-3"></Container>
                <Row className="mt-4 justify-content-center">
                    <Card style={{ width: '700px', backgroundColor: "#fcfcfc" }}>
                        <Row>
                            <Col className="mt-2 ml-3 mb-2" >
                                <h5>Total</h5>
                            </Col>
                            <Col className="mt-2">
                                Quntity: {totalQuantity} pc.
                            </Col>
                            <Col className="mt-2">
                                Price: {totalPrice}$
                            </Col>
                        </Row>
                    </Card>
                </Row>
            </Container>
            <Container className="d-flex justify-content-center mt-5">
                <Row>
                    <Col>
                        <Link to="/shop">
                            <Button variant="secondary" style={{ width: "131px" }}>Back to Store</Button>
                        </Link>
                    </Col>
                    <Col>
                        {Object.keys(cartItems).length > 0
                            ?
                            <Link to="/checkout_page">
                                <Button style={{ width: "131px" }}>Place Order</Button>
                            </Link>
                            :
                            <>
                                <Button style={{ width: "131px" }} onClick={notify}>Place Order</Button>
                                <ToastContainer />
                            </>
                        }
                    </Col>
                </Row>
            </Container>
        </Container>
    )
}