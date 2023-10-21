import React from "react";
import { Col, Container, Row, Card, Button, Form } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar as regular } from "@fortawesome/free-regular-svg-icons";
import { faStar as solid } from "@fortawesome/free-solid-svg-icons";
import { faCaretUp, faCartShopping, faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { useToggle } from '../hooks/useToggle'
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import RatingStars from "../components/RatingStars";
import { Context } from "../context";
import addReview from "../API/addRview";
import ReviewCard from "../components/ReviewCard";

function ProductPage() {
    const [showDetails, toggleDetails] = useToggle(false)
    const [showIngredients, toggleIngredients] = useToggle(false)
    const [toggleQuantity, setToggleQuantity] = useToggle(false)
    const [product, setProducts] = useState('');
    let [stock, setStock] = useState();
    let [itemQuantity, setItemQuantity] = useState(0);
    const { currentUser, reviews } = useContext(Context)
    const [userName, setUserName] = useState(``)
    const [reviewText, setReviewText] = useState('');
    const [rating, setRating] = useState(0);
    const [reviewSubmitted, setReviewSubmitted] = useState(false);
    const [ranking, setRanking] = useState(0)

    const { id } = useParams()

    const product_id = product.id

    let { name, unit_price, main_photo, quantity = 1 } = product
    let productData = { id: product_id, name, unit_price, main_photo, quantity }

    const sqlDate = new Date(product.expiration_date);
    const currentDate = new Date().toLocaleDateString()
    const baseUrl = "http://localhost:3000"
    const stars = [1, 2, 3, 4, 5];

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
        })
    }, [toggleQuantity, product_id])

    useEffect(() => {
        let cartItmes = axios.get('http://localhost:3100/products')
        cartItmes.then(res => {
            for (let i = 0; i < res.data.length; i++) {
                if (res.data[i].id === product.id) {
                    setStock(res.data[i].stock)
                    countTotalRanking()
                }
            }
        })
    }, [product])

    const countTotalRanking = () => {

        let productRanking = 0;
        let counter = 0;

        for (let i = 0; i < reviews.length; i++) {
            if (reviews[i].product_id === product_id && reviews[i].approved) {
                productRanking += reviews[i].ranking;
                counter++
            }
        }

        const totalRanking = productRanking / counter
        console.log(totalRanking)
        setRanking(Math.ceil(totalRanking))
    }

    const addToCart = () => {
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

    const handleStarClick = (selectedRating) => {
        setRating(selectedRating);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'name') {
            setUserName(value)
        } else if (name === 'text') {
            setReviewText(value)
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const dataForAddingReview = {
            text: reviewText, user_id: currentUser.id,
            user_name: userName, ranking: rating, product_id: product_id, approved: 0, date: currentDate, product_name: name, product_photo: main_photo
        };
        addReview(dataForAddingReview, setReviewSubmitted, reviewSubmitted)
    }

    return (
        <Container>
            <Link to="/shop" style={{ color: 'black', textDecoration: 'none' }}>
                <div className="mt-3">
                    <FontAwesomeIcon icon={faArrowLeft} /> Back to store
                </div>
            </Link>
            {/* <Row>
                <Col className="text-right mt-4"><FontAwesomeIcon icon={faHeart} style={{ color: "#ff476c" }} size="2xl" /></Col>
            </Row> */}
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
                                        <div>
                                            {stars.map((star) => (
                                                <span
                                                    key={star}
                                                    className={`star3 ${star <= ranking ? 'filled' : ''}`}
                                                >
                                                    {star <= ranking ? <FontAwesomeIcon icon={solid} /> : <FontAwesomeIcon icon={regular} />}
                                                </span>
                                            ))}
                                        </div>
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
            <Container style={{ maxWidth: '800px' }}>
                {rating ?
                    <div className="text-center mt-5">
                        <h3>Reviews</h3>
                    </div>
                    :
                    <></>
                }
                {reviews.map((review) => (
                    (review.product_id === product_id) && (<div key={review.id}>
                        {review.approved ? (
                            <ReviewCard review={review} />
                        ) : (
                            ''
                        )}
                    </div>)
                ))}
            </Container>
            {Object.keys(currentUser).length > 0 ?
                <div>
                    {reviewSubmitted
                        ?
                        <Container className="text-center mt-5">
                            <h3>Thank you, your review has been received!</h3>
                            <h3>It will be available on the website after approval!</h3>
                        </Container>
                        :
                        <Container className="text-center mt-5">
                            <h3>Leave a review</h3>
                            <Form>
                                <Form.Control
                                    placeholder="Name"
                                    defaultValue={userName}
                                    name="name"
                                    style={{ maxWidth: '500px' }}
                                    className="mx-auto mt-4"
                                    onBlur={handleChange}
                                />
                                <Form.Control
                                    placeholder="Review text"
                                    name="text"
                                    defaultValue={reviewText}
                                    style={{ maxWidth: '500px' }}
                                    className="mx-auto mt-4"
                                    as='textarea'
                                    onBlur={handleChange}
                                    rows={5}
                                />
                                <RatingStars rating={rating} onStarClick={handleStarClick} />
                                <Button variant="success" className="mx-auto mt-4" onClick={handleSubmit}>Submit</Button>
                            </Form>
                        </Container>
                    }
                </div>
                :
                <></>
            }
        </Container>
    )
}

export default ProductPage;