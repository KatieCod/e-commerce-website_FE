import React, { useEffect, useState, useContext } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping } from '@fortawesome/free-solid-svg-icons'
import { faHeart as regularHeart } from '@fortawesome/free-regular-svg-icons'
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons'
import { faStar as regular } from "@fortawesome/free-regular-svg-icons";
import { faStar as solid } from "@fortawesome/free-solid-svg-icons";
import { Row, Col } from "react-bootstrap";
import axios from "axios";
import { Link } from "react-router-dom";
import { useToggle } from "../hooks/useToggle";
import { Context } from "../context";

function Product(props) {

    const [changeCart1, toggleChangeCart1] = useToggle(false);
    const [changeCart2, toggleChangeCart2] = useToggle(false);
    let [stock, setStock] = useState();
    let [itemQuantity, setItemQuantity] = useState(0);
    const { iAmState, currentUser, stateForShopItemQuantity, reviews } = useContext(Context)
    const [heart, toggleHeart] = useToggle(false)
    const [authorizedHeart, toggleAuthorizedHeart] = useToggle(false)
    const [ranking, setRanking] = useState(0)

    let { id, name, unit_price, main_photo, quantity = 1 } = props.product || {}
    let productData = { id, name, unit_price, main_photo, quantity, user_id: currentUser.id }
    let productDataForLocalStorage = { product_id: id, product_name: name, product_unit_price: unit_price, product_main_photo: main_photo, quantity }
    const stars = [1, 2, 3, 4, 5];

    const baseUrl = "http://localhost:3000"

    useEffect(() => {
        let cartItmes = axios.get('http://localhost:3100/products')
        cartItmes.then(res => {
            for (let i = 0; i < res.data.length; i++) {
                if (res.data[i].id === id) {
                    setStock(res.data[i].stock)
                    countTotalRanking()
                }
            }
        })
    }, [])

    useEffect(() => {
        console.log('seeting a new quantity')
        if (Object.keys(currentUser).length > 0) {
            let quantity = axios.get('http://localhost:3100/cart')
            quantity.then(res => {
                if (res.data.length === 0) {
                    setItemQuantity(0)
                } else {
                    for (let i = 0; i < res.data.length; i++) {
                        if (res.data[i].product_id === id) {
                            setItemQuantity(res.data[i].quantity)
                            break;
                        }
                        setItemQuantity(0)
                    }
                }
            })

            let wishlistItems = axios.get('http://localhost:3100/products/wishlist')
            wishlistItems.then(res => {
                if (res.data.length === 0) {
                    // console.log('empty wishlist')
                } else {
                    for (let i = 0; i < res.data.length; i++) {
                        if (res.data[i].product_id === id && !authorizedHeart) {
                            toggleAuthorizedHeart()
                        }
                    }
                }
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
            const wishListFromLocalStorage = JSON.parse(localStorage.getItem('wishlist'))
            for (let i = 0; i < wishListFromLocalStorage.length; i++) {
                if (wishListFromLocalStorage[i].product_id === productDataForLocalStorage.product_id && !heart) {
                    toggleHeart()
                }
            }
        }

    }, [changeCart1, changeCart2, props.sider, props.shopProduct, iAmState, stateForShopItemQuantity])

    const addToCart = () => {
        if (Object.keys(currentUser).length > 0) {
            if (itemQuantity < stock) {
                axios.post('http://localhost:3100/products/add-to-cart', productData)
                    .then(result => {
                        if (!result.data.failure) {
                            toggleChangeCart1()
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
                const itemInCart = cartFromLocalStorage.find(item => item.product_id === productDataForLocalStorage.product_id);
                if (itemInCart) {
                    if(itemInCart.quantity < stock) {
                        itemInCart.quantity+=1
                        setItemQuantity(itemInCart.quantity)
                    } else {
                        props.notify()
                    }
                } else {
                    const anotherItem = { ...productDataForLocalStorage, quantity: 1 };
                    setItemQuantity(1)
                    cartFromLocalStorage.push(anotherItem)
                }
                
                localStorage.setItem('cart', JSON.stringify(cartFromLocalStorage))
            }
        }
    }

    const addItemToWishList = () => {
        if (Object.keys(currentUser).length > 0) {
            axios.post('http://localhost:3100/products/add-to-wishlist', productData)
                .then(result => {
                    if (!result.data.failure) {
                        console.log(result.data)
                    } else {
                        console.log(result.data.failure)
                    }
                })
                .catch(err => console.log(err))
        } else {
            const wishListFromLocalStorage = JSON.parse(localStorage.getItem('wishlist'))
            if (!wishListFromLocalStorage || wishListFromLocalStorage.length === 0) {
                const firstItem = productDataForLocalStorage;
                localStorage.setItem('wishlist', JSON.stringify([firstItem]))
            } else {
                for (let i = 0; i < wishListFromLocalStorage.length; i++) {
                    if (wishListFromLocalStorage[i].product_id === productDataForLocalStorage.product_id) {
                        break;
                    }
                }
                const anotherItem = productDataForLocalStorage;
                wishListFromLocalStorage.push(anotherItem)
                localStorage.setItem('wishlist', JSON.stringify(wishListFromLocalStorage))
            }
        }
    }

    const removeItemFromWishList = () => {
        if (Object.keys(currentUser).length > 0) {
            axios.post('http://localhost:3100/products/remove-from-wishlist', productDataForLocalStorage)
                .then(result => {
                    if (!result.data.failure) {
                        console.log(result.data)
                    } else {
                        console.log(result.data.failure)
                    }
                })
                .catch(err => console.log(err))
        } else {
            const wishListFromLocalStorage = JSON.parse(localStorage.getItem('wishlist'))
            for (let i = 0; i < wishListFromLocalStorage.length; i++) {
                if (wishListFromLocalStorage[i].product_id === productDataForLocalStorage.product_id) {
                    wishListFromLocalStorage.splice(i, 1)
                }
            }
            localStorage.setItem('wishlist', JSON.stringify(wishListFromLocalStorage))
        }
    }

    const decreaseQunatity = () => {
        if (Object.keys(currentUser).length > 0) {
            axios.post('http://localhost:3100/cart/decrease-quantity', productData)
                .then(result => {
                    if (!result.data.failure) {
                        toggleChangeCart2()
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
                        cartFromLocalStorage.splice(i, 1)
                        setItemQuantity(0)
                    }
                }
            }

            localStorage.setItem('cart', JSON.stringify(cartFromLocalStorage))
        }
    }

    const countTotalRanking = () => {

        let productRanking = 0;
        let counter = 0;

        for (let i = 0; i < reviews.length; i++) {
            if (reviews[i].product_id === id && reviews[i].approved) {
                productRanking += reviews[i].ranking;
                counter++
            }
        }

        const totalRanking = productRanking / counter
        setRanking(Math.ceil(totalRanking))
    }

    return (
        <div class="card border-0 text-center" style={{ width: "18rem;" }}>
            <div className="image-wrapper">
                <img className="card-img-top" src={`${baseUrl}/items/${main_photo}`} alt="Card image cap" />
                {heart || authorizedHeart
                    ?
                    <div className="image-icon" onClick={() => { heart ? toggleHeart() : toggleAuthorizedHeart(); removeItemFromWishList(); }}><FontAwesomeIcon icon={solidHeart} style={{ color: "#ff476c" }} size="lg" /></div>
                    :
                    <div className="image-icon" onClick={() => { heart ? toggleHeart() : toggleAuthorizedHeart(); addItemToWishList(); }}><FontAwesomeIcon icon={regularHeart} style={{ color: "#ff476c" }} size="lg" /></div>
                }
            </div>
            <Link style={{ textDecoration: 'none', color: 'black' }} to={`/product/${id}`}>
                <div className="card-body text-center">
                    <h6>{name}</h6>
                </div>
            </Link>
            {!itemQuantity > 0
                ?
                <Row>
                    <Col xs={4} className="text-right"></Col>
                    <Col xs={4} className="text-center"><h5 >${unit_price}</h5></Col>
                    <Col xs={4} className="text-right"><div onClick={() => { addToCart(); props.toggleSider() }} style={{ cursor: 'pointer' }}><FontAwesomeIcon icon={faCartShopping} style={{ marginRight: "8px" }} size="xl" /></div></Col>
                </Row>
                :
                <Row className="product-details">
                    <Col xs={6} className="text-center"><h5 >${unit_price}</h5></Col>
                    <Col xs={6} className="text-right">
                        <Row>
                            <div>
                                <button style={{ width: '30px', border: 0, borderRadius: '1px', backgroundColor: 'whitesmoke' }} onClick={() => { addToCart(); props.toggleSider() }}>+</button>
                                <input style={{ width: '30px', border: 0, textAlign: 'center' }} value={itemQuantity} />
                                <button style={{ width: '30px', border: 0, borderRadius: '1px', backgroundColor: 'whitesmoke' }} onClick={() => { decreaseQunatity(); props.toggleSider() }}>-</button>
                            </div>
                        </Row>
                    </Col>
                </Row>
            }
            <Row className="justify-content-center product-details">
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
            </Row>

        </div>
    )
}

export default Product;