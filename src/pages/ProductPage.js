import React from "react";
import { Col, Container, Row, Card, Button, Form } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faStar, } from '@fortawesome/free-regular-svg-icons'
import { faCaretUp, faCartShopping, faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { useToggle } from '../hooks/useToggle'
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

function ProductPage() {
    const [showDetails, toggleDetails] = useToggle(false)
    const [showIngredients, toggleIngredients] = useToggle(false)
    const [toggleQuantity, setToggleQuantity] = useToggle(false)
    const [product, setProducts] = useState('');
    let [stock, setStock] = useState();
    let [itemQuantity, setItemQuantity] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    const { id } = useParams()

    let product_id = product.id

    let { name, unit_price, main_photo, quantity = 1 } = product
    let productData = { id: product_id, name, unit_price, main_photo, quantity }

    const sqlDate = new Date(product.expiration_date);
    const baseUrl = "http://localhost:3000"

    useEffect(() => {
        let featuredProducts = axios.get(`http://localhost:3100/products/${id}`)
        featuredProducts.then(res => {
            setProducts(res.data[0])
        })
    }, [id])

    useEffect(() => {
        let quantity = axios.get('http://localhost:3100/cart')
        quantity.then(res => {
            if (res.data.length === 0) {
                setItemQuantity(0);
            } else {
                for (let i = 0; i < res.data.length; i++) {
                    if (res.data[i].product_id === product.id) {
                        setItemQuantity(res.data[i].quantity)
                        break;
                    }
                }
            }
            // setIsLoading(false)
        })
    }, [toggleQuantity, product_id])

    useEffect(() => {
        let cartItmes = axios.get('http://localhost:3100/products')
        cartItmes.then(res => {
            for (let i = 0; i < res.data.length; i++) {
                if (res.data[i].id === product.id) {
                    setStock(res.data[i].stock)
                }
            }
        })
    }, [product])

    const addToCart = () => {
        console.log(`this is itemQuantity ${itemQuantity}`)
        console.log(`this is stock ${stock}`)
        if (itemQuantity < stock) {
            axios.post('http://localhost:3100/products/add-to-cart', productData)
                .then(result => {
                    if (!result.data.failure) {
                        setToggleQuantity()
                    } else {
                        console.log(result.data.failure)
                    }
                })
                .catch(err => console.log(err))
        }
    }

    const decreaseQunatity = () => {
        axios.post('http://localhost:3100/cart/decrease-quantity', productData)
            .then(result => {
                if (!result.data.failure) {
                    setToggleQuantity()
                } else {
                    console.log(result.data.failure)
                }
            })
            .catch(err => console.log(err))
    }

    // if (isLoading) {
    //     return <div>Loading...</div>
    // }

    return (
        <Container>
            <Link to="/shop" style={{ color: 'black', textDecoration: 'none' }}>
                <div className="mt-3">
                    <FontAwesomeIcon icon={faArrowLeft} /> Back to store
                </div>
            </Link>
            <Row>
                <Col className="text-right mt-4"><FontAwesomeIcon icon={faHeart} style={{ color: "#ff476c" }} size="2xl" /></Col>
            </Row>
            <Container className="mt-2">
                <Row>
                    <Card border="0" style={{ width: '78rem' }}>
                        <Row>
                            <Col lg={5} md={12}>
                                <Row>
                                    <Card.Img src={`${baseUrl}/items/${product.main_photo}`} />
                                </Row>
                                <Row>
                                    <Col><Card.Img class="card-image" src={`${baseUrl}/productPage/11.jpg`} /></Col>
                                    <Col><Card.Img class="card-image" src={`${baseUrl}/productPage/10.jpg`} /></Col>
                                    <Col><Card.Img class="card-image" src={`${baseUrl}/productPage/9.jpg`} /></Col>
                                </Row>
                            </Col>
                            <Col lg={6} md={12} className="mt-3">
                                <Card.Body>
                                    <Card.Title>{product.name}</Card.Title>
                                    <Card.Text>
                                        <FontAwesomeIcon icon={faStar} style={{ color: "#f5ed0a", }} />
                                        <FontAwesomeIcon icon={faStar} style={{ color: "#f5ed0a", }} />
                                        <FontAwesomeIcon icon={faStar} style={{ color: "#f5ed0a", }} />
                                        <FontAwesomeIcon icon={faStar} style={{ color: "#f5ed0a", }} />
                                        <FontAwesomeIcon icon={faStar} style={{ color: "#f5ed0a", }} />
                                    </Card.Text>
                                    <Card.Text className="mt-3">
                                        {product.description}
                                    </Card.Text>
                                    <Container className="mt-5">
                                        <Row>
                                            <Col><h4>${product.unit_price}</h4></Col>
                                            <Col xs={9}>
                                                <Row className="justify-content-end mr-2">
                                                    <Button className="mr-2" style={{ width: "37px" }} onClick={() => { addToCart() }}>+</Button>
                                                    <Form.Control className="mr-2" style={{ width: "44px" }} value={itemQuantity} />
                                                    <Button style={{ width: "37px" }} onClick={() => { decreaseQunatity() }}>-</Button>
                                                    <Col xs={1} className="text-right mt-1"><div onClick={() => { addToCart() }} style={{ cursor: 'pointer' }}><FontAwesomeIcon icon={faCartShopping} style={{ marginRight: "8px" }} size="xl" /></div></Col>
                                                </Row>
                                            </Col>
                                        </Row>
                                        <Row>

                                            <Col>
                                                <Row className="justify-content-end mr-2 mt-1">
                                                    <Card.Text className="justify-content-end text-muted" style={{ marginRight: "32px" }}>{product.stock} pieces in stock</Card.Text>
                                                </Row>
                                            </Col>
                                        </Row>
                                    </Container>
                                    <Card.Text className="mt-5">
                                        <Button onClick={toggleDetails} className="text-left font-weight-bold" style={{ width: "100%" }} variant="light">
                                            <Row>
                                                <Col>Details</Col>
                                                <Col className="text-right"> {!showDetails ?
                                                    <FontAwesomeIcon icon={faCaretUp} rotation={90} /> :
                                                    <FontAwesomeIcon icon={faCaretUp} rotation={180} />}
                                                </Col>
                                            </Row>
                                        </Button>
                                        {!showDetails ? <></> : <div>
                                            <div className="p-2 mt-2 bg-light text-dark rounded"><Card.Text className="ml-1">Volume: {product.volume} ml</Card.Text></div>
                                            <div className="p-2 bg-white text-dark"><Card.Text className="ml-1">Expiration Date: {sqlDate.toLocaleDateString()}</Card.Text></div>
                                            <div className="p-2 bg-light text-dark rounded"><Card.Text className="ml-1">Country of manufacture: {product.origin_country}</ Card.Text></div>
                                            {/* <div className="p-2 bg-white text-dark"><Card.Text className="ml-1">Skin type:</Card.Text></div> */}
                                        </div>
                                        }
                                        <Button onClick={toggleIngredients} className="mt-4 text-left font-weight-bold" style={{ width: "100%" }} variant="light">
                                            <Row>
                                                <Col>Ingredients </Col>
                                                <Col className="text-right">
                                                    {!showIngredients ?
                                                        <FontAwesomeIcon icon={faCaretUp} rotation={90} /> :
                                                        <FontAwesomeIcon icon={faCaretUp} rotation={180} />}
                                                </Col>
                                            </Row>
                                        </Button>
                                        {!showIngredients ? <></> :
                                            <div className="p-2 mt-2 bg-light text-dark rounded"><Card.Text className="ml-1">{product.ingredients}</Card.Text></div>
                                        }
                                    </Card.Text>
                                </Card.Body>
                            </Col>
                        </Row>
                    </Card>
                </Row>
            </Container>
        </Container>
    )
}

export default ProductPage;