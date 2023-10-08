import React, { useState, useContext } from "react";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Container, Button, Col, Row, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { useToggle } from "../hooks/useToggle";
import { Context } from "../context";

function LoginHook(props) {

    const [saveData, setSaveData] = useState({})
    const [saveErrors, setSaveErrors] = useState({})
    const navigate = useNavigate()
    const [showQuestion, toggleQuestion] = useToggle(false)
    const { currentUser } = useContext(Context)

    axios.defaults.withCredentials = true;

    const validateAndProceed = (e) => {
        e.preventDefault();

        if (Object.keys(saveErrors).length === 0) {
            axios.post('http://localhost:3100/users/login', saveData)
                .then(result => {
                    if (!result.data.failure) {
                        props.handleAuthorization(false)
                        props.handleAuthorization(true)
                        const cartFromLocalStorage = JSON.parse(localStorage.getItem('cart'))
                        if (cartFromLocalStorage.length > 0) {
                            toggleQuestion()
                        } else {
                            navigate('/homepage')
                            window.location.reload(true);
                        }
                    } else {
                        console.log(result.data.failure)
                    }
                })
                .catch(err => console.log(err))
        }
    }

    const clearLocalStorage = () => {
        localStorage.setItem('cart', JSON.stringify([]))
        navigate('/homepage')
        window.location.reload(true);
    }

    const mergeCart = async () => {
        const unauthorisedCart = JSON.parse(localStorage.getItem('cart'))

        try {
            await axios.post('http://localhost:3100/users/login', saveData);

            const addToCartPromises = unauthorisedCart.map((item) => {
                const productDataForLocalStorage = {
                    id: item.product_id,
                    name: item.product_name,
                    unit_price: item.product_unit_price,
                    main_photo: item.product_main_photo,
                    quantity: item.quantity,
                    user_id: currentUser.id
                };
                return axios.post('http://localhost:3100/products/add-to-cart', productDataForLocalStorage)
            });

            await Promise.all(addToCartPromises)
            navigate('/homepage')
            window.location.reload(true);
            localStorage.setItem('cart', JSON.stringify([]))
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Container className='text-center'>
            <h1 className="mt-5">Log in</h1>
            <Formik
                initialValues={{ email: '', password: '' }}
                validate={values => {
                    const errors = {};
                    setSaveErrors({});
                    setSaveData({ email: values.email, password: values.password })

                    if (!values.email) {
                        errors.email = 'Email is required';
                    } else if (
                        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                    ) {
                        errors.email = 'Invalid email address'
                    }

                    if (!values.password) {
                        errors.password = 'Password is required'
                    } else if (values.password.length < 4) {
                        errors.password = 'Password should be at least 4 charecters long'
                    }
                    setSaveErrors(errors)
                    return errors;
                }}
                onSubmit={(values, { setSubmitting }) => {
                    setTimeout(() => {
                        alert(JSON.stringify(values, null, 2));
                        setSubmitting(false);
                    }, 400)
                }}
            >
                {({ isSubmitting }) => (
                    <div className='text-center'>
                        <Form className="mt-4">
                            <div className="mt-3" class='input-box ' >
                                <Field className="mt-3" type='email' name='email' placeholder='Enter email' />
                                <ErrorMessage class="error" name="email" component="div" />
                            </div>
                            <div class='input-box'>
                                <Field className="mt-3" type='password' name='password' placeholder='Enter password' />
                                <ErrorMessage class="error" name="password" component="div" />
                            </div>
                            <Container className="text-center mt-3">
                                <Link to='/reset_password'><p>Forgot your password?</p></Link>
                            </Container>
                            <Button onClick={validateAndProceed} className="mt-2" type="submit" disabled={isSubmitting}>
                                Log In
                            </Button>
                        </Form>
                    </div>
                )}
            </Formik>
            {showQuestion
                ?
                <div className="modal-dialog modal-dialog-centered">
                    <Modal show={showQuestion} centered>

                        <Modal.Body>
                            <Container className="border-top border-secondary mb-3 mt-4" style={{ width: "100%" }}></Container>
                            <Container className="text-center">
                                <h3>You seem to have added some items to cart, would you like to keep them?</h3>
                            </Container>
                            <Container className="border-top border-secondary mb-3" style={{ width: "100%" }}></Container>
                        </Modal.Body>
                        <Modal.Footer>
                            <Container>
                                <Row>
                                    <Col className="text-center">
                                        <Button variant="success" onClick={mergeCart}>Yes, please</Button>
                                    </Col>
                                    <Col>
                                        <Button variant="info" onClick={clearLocalStorage}>No, maybe next time</Button>
                                    </Col>
                                </Row>
                            </Container>

                        </Modal.Footer>
                    </Modal>
                </div>
                :
                <></>
            }

        </Container>
    )
}

export default LoginHook;