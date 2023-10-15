import React, { useState, useContext } from "react";
import axios from "axios";
import { Container, Col, Row, Form, Button } from "react-bootstrap";
import { Context } from "../context";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ItemDetailsForAdmin(props) {

    const { toggleIAmState } = useContext(Context)

    const notifyChange = () => toast('The item has been changed');
    const notifyAdd = () => toast('The item has been added');

    let { id,
        name,
        stock,
        unit_price,
        volume,
        expiration_date,
        origin_country,
        ingredients,
        ranking,
        brand,
        description,
        main_photo,
        featured,
        category } = props.item || {}

    const [itemDetails, setItemDetails] = useState({
        name,
        stock,
        unit_price,
        volume,
        expiration_date,
        origin_country,
        ingredients,
        ranking,
        brand,
        description,
        main_photo,
        featured,
        category
    })

    const sqlDate = new Date(itemDetails.expiration_date);

    const handleChange = (e) => {
        let { name, value } = e.target;
        setItemDetails({ ...itemDetails, [name]: value })
    }

    const validateAndProceed = (e) => {
        e.preventDefault()
        if (!id) {
            axios.post('http://localhost:3100/products/add-product', itemDetails)
                .then(result => {
                    if (!result.data.failure) {
                        console.log('product added')
                        setItemDetails({})
                        notifyAdd()
                    } else {
                        console.log(result.data.failure)
                    }
                })
                .catch(err => console.log(err))
        } else {
            axios.post('http://localhost:3100/products/change-product', { ...itemDetails, id })
                .then(result => {
                    if (!result.data.failure) {
                        console.log('product changed')
                        toggleIAmState()
                        notifyChange()
                    } else {
                        console.log(result.data.failure)
                    }
                })
                .catch(err => console.log(err))
        }
    }

    return (
        <Container className="mt-3 mb-3" style={{ backgroundColor: 'rgb(252, 252, 252)' }}>
            <div className="mb-3">
                <Container>
                    <h3 className=" text-center mt-5">Product Details</h3>
                    <Form className="mt-4 ml-5 mr-5">
                        <Row>
                            <Col>
                                <Form.Label style={{ fontWeight: 'bold' }}>Name:</Form.Label>
                                <Form.Control
                                    name="name"
                                    defaultValue={itemDetails.name}
                                    onBlur={handleChange}
                                />
                            </Col>
                        </Row>
                        <Row className="mt-3">
                            <Col>
                                <Form.Label style={{ fontWeight: 'bold' }}>Stock:</Form.Label>
                                <Form.Control
                                    name="stock"
                                    defaultValue={itemDetails.stock}
                                    onBlur={handleChange}
                                />
                            </Col>
                            <Col >
                                <Form.Label style={{ fontWeight: 'bold' }}>Price:</Form.Label>
                                <Form.Control
                                    name="unit_price"
                                    defaultValue={itemDetails.unit_price}
                                    onBlur={handleChange} />
                            </Col>
                            <Col>
                                <Form.Label style={{ fontWeight: 'bold' }}>Volume:</Form.Label>
                                <Form.Control
                                    name="volume"
                                    defaultValue={itemDetails.volume}
                                    onBlur={handleChange}
                                />
                            </Col>
                        </Row>
                        <Row className="mt-3">
                            <Col xs={4}>
                                <Form.Label style={{ fontWeight: 'bold' }}>Ranking:</Form.Label>
                                <Form.Control
                                    name="ranking"
                                    defaultValue={itemDetails.ranking}
                                    onBlur={handleChange}
                                />
                            </Col>
                            <Col xs={4}>
                                <Form.Label style={{ fontWeight: 'bold' }}>Valid till:</Form.Label>
                                <Form.Control
                                    defaultValue={sqlDate.toLocaleDateString() === 'Invalid Date' ? null : sqlDate.toLocaleDateString()}
                                    name="expiration_date"
                                    onBlur={handleChange}
                                />
                            </Col>
                            <Col xs={4}>
                                <Form.Label style={{ fontWeight: 'bold' }}>Featured:</Form.Label>
                                <Form.Control
                                    defaultValue={itemDetails.featured ? 'YES' : 'NO'}
                                    name="featured"
                                    onBlur={handleChange}
                                />
                            </Col>
                        </Row>
                        <Row className="mt-3">
                            <Col>
                                <Form.Label style={{ fontWeight: 'bold' }}>Brand:</Form.Label>
                                <Form.Control
                                    defaultValue={itemDetails.brand}
                                    name="brand"
                                    onBlur={handleChange}
                                />
                            </Col>
                            <Col xs={5}>
                                <Form.Label style={{ fontWeight: 'bold' }}>Country:</Form.Label>
                                <Form.Control
                                    defaultValue={itemDetails.origin_country}
                                    name="origin_country"
                                    onBlur={handleChange}
                                />
                            </Col>
                        </Row>
                        <Row className="mt-3">
                            <Col>
                                <Form.Label style={{ fontWeight: 'bold' }}>Photo:</Form.Label>
                                <Form.Control
                                    defaultValue={itemDetails.main_photo}
                                    name="main_photo"
                                    onBlur={handleChange}
                                />
                            </Col>
                            <Col xs={5}>
                                <Form.Label style={{ fontWeight: 'bold' }}>Category:</Form.Label>
                                <Form.Control
                                    defaultValue={itemDetails.category}
                                    name="category"
                                    onBlur={handleChange}
                                />
                            </Col>
                        </Row>
                        <Row className="mt-3">
                            <Col>
                                <Form.Label style={{ fontWeight: 'bold' }}>Description:</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={5}
                                    defaultValue={itemDetails.description}
                                    name="description"
                                    onBlur={handleChange}
                                />
                            </Col>
                        </Row>
                        <Row className="mt-3">
                            <Col>
                                <Form.Label style={{ fontWeight: 'bold' }}>Ingredients:</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={5}
                                    defaultValue={itemDetails.ingredients}
                                    name="ingredients"
                                    onBlur={handleChange}
                                />
                            </Col>
                        </Row>
                        <Container className="text-center mt-4">
                            <Button variant="success" onClick={validateAndProceed}>Save Changes</Button>
                            <Button variant="danger" className="ml-3">Delete Item</Button>
                            <ToastContainer />
                        </Container>
                    </Form>
                </Container>
            </div>
        </Container>
    )
}

export default ItemDetailsForAdmin;