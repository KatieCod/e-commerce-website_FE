import React, { useEffect, useState, useContext } from "react";
import { Container, Button, Row, Col, Card, Form } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretUp, faCheck } from '@fortawesome/free-solid-svg-icons'
import { Link } from "react-router-dom";
import { useToggle } from '../hooks/useToggle'
import CheckoutItem from "../components/CheckoutItem";
import axios from "axios";
import { Context } from "../context";
import moment from 'moment';
import Bill from "../components/Bill";
import Modal from 'react-bootstrap/Modal';
import CartItem from "../components/CartItme";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function CheckourPage() {

    const [showCart, toggleCart] = useToggle(false)
    const [showBill, toggleBill] = useToggle(false)
    const [cart, setCart] = useState([]);
    const { currentUser } = useContext(Context)
    const [delieveryAddress, toogleDelieveryAddress] = useToggle(false)

    const notify = () => toast("Your cart is empty, add some items to proceed");

    useEffect(() => {
        let cartProducts = axios.get('http://localhost:3100/cart')
        cartProducts.then(res => {
            setCart(res.data)
        })
    }, [])

    const addOrderDetails = async (order_id) => {
        const promises = cart.map(item => {
            return axios.post('http://localhost:3100/orders/add-order-details', {
                order_id,
                product_id: item.product_id,
                product_unit_price: item.product_unit_price,
                quantity: item.quantity,
                total_price: item.product_unit_price * item.quantity,
                product_photo: item.product_main_photo,
                product_name: item.product_name
            });
        });

        try {
            const results = await Promise.all(promises);

            results.forEach(result => {
                if (!result.data.failure) {
                    console.log(result.data)
                } else {
                    console.log(result.data.failure)
                }
            })
        } catch (error) {
            console.log(error)
        }

    }

    const addOrders = async () => {
        if (Object.keys(cart).length > 0) {
            const dateFormat = moment().format('YYYY-MM-DD');
            try {
                const orderResponse = await axios.post('http://localhost:3100/orders/add-order', { user_id: currentUser.id, order_date: dateFormat })
                if (!orderResponse.data.failure) {
                    const orderId = orderResponse.data
                    await addOrderDetails(orderId)
                    axios.get('http://localhost:3100/cart/clear-cart');
                    toggleBill()
                } else {
                    console.log(orderResponse.data.failure)
                }

            } catch (error) {
                console.log(error)
            }
        }
    }

    let totalQuantity = 0;
    let totalPrice = 0;
    let counter = 0;

    return (
        <>
            {!Object.keys(currentUser).length > 0 ?
                <Container className="text-center mt-5">
                    <h1 className="mb-5">Please login to continue with the checkout!</h1>
                    <Link to='/login_page'>Log in</Link>
                </Container>
                :
                <div >
                    <h1 className="text-center mt-4 mb-4">Checkout Page</h1>
                    <Row>
                        <Col xs={12} lg={7}>
                            <Container>
                                <h3 className=" text-center mt-5">Billing Details</h3>
                                <Form className="mt-4 ml-5 mr-5 ">
                                    <Row>
                                        <Col xs={4}>
                                            <Form.Control
                                                placeholder="Full name"
                                                defaultValue={`${currentUser.first_name} ${currentUser.last_name}`}
                                            />
                                        </Col>
                                        <Col>
                                            <Form.Control
                                                placeholder="Country"
                                                defaultValue={currentUser.country}
                                            />
                                        </Col>
                                    </Row>
                                    <Row className="mt-3">
                                        <Col xs={4}>
                                            <Form.Control
                                                placeholder="Email"
                                                defaultValue={currentUser.email}
                                            />
                                        </Col>
                                        <Col xs={5}>
                                            <Form.Control
                                                placeholder="City"
                                                defaultValue={currentUser.city}
                                            />
                                        </Col>
                                        <Col>
                                            <Form.Control
                                                placeholder="Zip code"
                                                defaultValue={currentUser.zip}
                                            />
                                        </Col>
                                    </Row>
                                    <Row className="mt-3">
                                        <Col xs={4}>
                                            <Form.Control
                                                placeholder="Phone"
                                                defaultValue={currentUser.phone}
                                            />
                                        </Col>
                                        <Col>
                                            <Form.Control
                                                placeholder="Street, house №"
                                                defaultValue={currentUser.address}
                                            />
                                        </Col>
                                    </Row>
                                </Form>
                            </Container>
                            <Container>
                                <h3 className=" text-center mt-5">Delivery Details</h3>

                                <Form className="mt-4 ml-5 mr-5">
                                    <Container className="text-left">
                                        <Row className="ml-4 mb-3">
                                            <label className="form-check-label" for="flexCheckDefault">same as billing details</label>
                                            <input className="form-check-input" type="checkbox" value="" onClick={toogleDelieveryAddress} />
                                        </Row>
                                    </Container>
                                    <Row>
                                        <Col xs={4}>
                                            <Form.Control
                                                placeholder="Full name"
                                                defaultValue={delieveryAddress ? `${currentUser.first_name} ${currentUser.last_name}` : ''}
                                            />
                                        </Col>
                                        <Col>
                                            <Form.Control
                                                placeholder="Country"
                                                defaultValue={delieveryAddress ? currentUser.country : ''}
                                            />
                                        </Col>
                                    </Row>
                                    <Row className="mt-3">
                                        <Col xs={4}>
                                            <Form.Control
                                                placeholder="Email"
                                                defaultValue={delieveryAddress ? currentUser.email : ''}
                                            />
                                        </Col>
                                        <Col xs={5}>
                                            <Form.Control
                                                placeholder="City"
                                                defaultValue={delieveryAddress ? currentUser.city : ''}
                                            />
                                        </Col>
                                        <Col>
                                            <Form.Control
                                                placeholder="Zip code"
                                                defaultValue={delieveryAddress ? currentUser.zip : ''}
                                            />
                                        </Col>
                                    </Row>
                                    <Row className="mt-3">
                                        <Col xs={4}>
                                            <Form.Control
                                                placeholder="Phone"
                                                defaultValue={delieveryAddress ? currentUser.phone : ''}
                                            />
                                        </Col>
                                        <Col>
                                            <Form.Control
                                                placeholder="Street, house №"
                                                defaultValue={delieveryAddress ? currentUser.address : ''}
                                            />
                                        </Col>
                                    </Row>
                                </Form>

                            </Container>
                        </Col>
                        <Col xs={12} lg={5}>

                            <Container style={{ maxWidth: "700px" }} className="text-center mt-4 mb-4">

                                <Container sm>
                                    <Row className="justify-content-center">
                                        <Button onClick={toggleCart} className="mt-4 text-left font-weight-bold" style={{ width: "100%" }} variant="light">
                                            <Row >
                                                <Col>Order Details</Col>
                                                <Col className="text-right">
                                                    {!showCart ?
                                                        <FontAwesomeIcon icon={faCaretUp} rotation={90} /> :
                                                        <FontAwesomeIcon icon={faCaretUp} rotation={180} />
                                                    }
                                                </Col>
                                            </Row>
                                        </Button>
                                    </Row>
                                    {!showCart ? <></> : <>
                                        {cart.map(item => {
                                            totalQuantity = totalQuantity + item.quantity
                                            totalPrice = totalPrice + (item.quantity * item.product_unit_price)
                                            if (item.quantity > 0) {
                                                return <CheckoutItem item={item} />
                                            }
                                        })}
                                        <Container className="border-top border-secondary mt-3" style={{ maxWidth: "360px" }}></Container>
                                        <Container className="align-items-center">
                                            <Row className="justify-content-center align-items-center">
                                                <div style={{ width: "100%" }}>
                                                    <div className="p-2 mt-2 bg-light text-dark rounded">
                                                        <Row className='align-items-center'>
                                                            <Col xs={3}><h5>Total:</h5></Col>
                                                            <Col>
                                                                <Row >
                                                                    <Col><Card.Text className="text-left font-weight-bold mb-2">{totalQuantity} PC</Card.Text></Col>
                                                                </Row>
                                                            </Col>
                                                            <Col style={{ marginRight: "40px" }} xs={2}><h4 className="text-left font-weight-bold">{totalPrice}$</h4></Col>
                                                        </Row>
                                                    </div>
                                                </div>
                                            </Row>
                                        </Container>
                                    </>}
                                    <Container className="align-items-center">
                                        <Row className="justify-content-center align-items-center">
                                            <div style={{ width: "100%" }}>
                                                <div className="p-2 mt-2 rounded">
                                                    <Row className='align-items-center'>
                                                        <Col >
                                                            <Link to='/cart_page'>
                                                                <Button variant="light" style={{ width: "130px" }}>Back to cart</Button>
                                                            </Link>
                                                        </Col>
                                                        <Col>
                                                            {Object.keys(cart).length > 0 ?
                                                                <Button style={{ width: "130px" }} onClick={addOrders}>Pay</Button>
                                                                :
                                                                <>
                                                                    <Button style={{ width: "130px" }} onClick={notify}>Pay</Button>
                                                                    <ToastContainer />
                                                                </>
                                                            }
                                                        </Col>
                                                    </Row>
                                                </div>
                                            </div>
                                        </Row>
                                    </Container>
                                    {Object.keys(cart).length > 0 ?
                                        <div className="modal-dialog modal-dialog-centered">
                                            <Modal show={showBill} centered>
                                                <Modal.Header>
                                                    <Modal.Title className="text-center">
                                                        The payment is successful <FontAwesomeIcon icon={faCheck} style={{ color: "green" }} size="lg" />
                                                    </Modal.Title>
                                                </Modal.Header>
                                                <Modal.Body>
                                                    <Row>
                                                        <Col xs={5}>Items</Col>
                                                        <Col className="text-right">Qty</Col>
                                                        <Col xs={1}></Col>
                                                        <Col>Price</Col>
                                                        <Col xs={2}>Total</Col>
                                                    </Row>
                                                    <Container className="border-top border-secondary mb-3" style={{ width: "100%" }}></Container>
                                                    {cart.map(item => {
                                                        counter = counter + 1;
                                                        return (
                                                            <>
                                                                <Row>
                                                                    <Col xs={5}>{counter}. {item.product_name}</Col>
                                                                    <Col className="text-right">{item.quantity}PC</Col>
                                                                    <Col xs={1}>x</Col>
                                                                    <Col>{item.product_unit_price}$</Col>
                                                                    <Col xs={2}>{item.quantity * item.product_unit_price}$</Col>
                                                                </Row>
                                                                <Container className="border-top mb-3" style={{ width: "100%" }}></Container>
                                                            </>
                                                        )
                                                    })}
                                                    <Row>
                                                        <Col style={{ fontWeight: 'bold' }} xs={5}>Total:</Col>
                                                        <Col className="text-right" style={{ fontWeight: 'bold' }}>{totalQuantity}PC</Col>
                                                        <Col xs={1}></Col>
                                                        <Col ></Col>
                                                        <Col xs={2} style={{ fontWeight: 'bold' }}>{totalPrice}$</Col>
                                                    </Row>
                                                </Modal.Body>
                                                <Modal.Footer>
                                                    <Link to='/user-page'>
                                                        <Button variant="light">Go to user page</Button>
                                                    </Link>
                                                </Modal.Footer>
                                            </Modal>
                                        </div>
                                        :
                                        <></>
                                    }
                                </Container>
                            </Container>
                        </Col>
                    </Row>
                </div>
            }
        </>
    )
}