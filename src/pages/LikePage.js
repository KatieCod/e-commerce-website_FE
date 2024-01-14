import React, { useContext } from "react";
import { Container, Card, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import CartItemForWishList from "../components/CartItemForWishList";
import { useToggle } from "../hooks/useToggle";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Context } from "../context";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons'

export default function LikePage() {

    const [wishlist, setWishlist] = useState([])
    const [clearWishList, togglClearWishList] = useToggle(false)
    const { currentUser } = useContext(Context)

    useEffect(() => {
        if (Object.keys(currentUser).length > 0) {
            let cartItmes = axios.get('http://localhost:3100/products/wishlist')
            cartItmes.then(res => {
                setWishlist(res.data)
            })
        } else {
            const unauthorisedWishList = JSON.parse(localStorage.getItem('wishlist'))
            setWishlist(unauthorisedWishList)
        }
    }, [clearWishList])

    const removeAllFromWishList = () => {
        if (Object.keys(currentUser).length > 0) {
            axios.post('http://localhost:3100/products/remove-from-wishlist', {product_id: null})
                .then(result => {
                    if (!result.data.failure) {
                        console.log(result.data)
                        togglClearWishList()
                    } else {
                        console.log(result.data.failure)
                    }
                })
                .catch(err => console.log(err))
        } else {
            localStorage.setItem('wishlist', JSON.stringify([]));
        }
    }

    return (
        <Container>
            <h1 className="text-center mt-5" style={wishlist.length > 0 ? { marginBottom: "0px" } : { marginBottom: "80px" }}>Wish List</h1>
            <Container className="mt-4 justify-content-center">
                <Row className="mt-4 justify-content-center">
                    {wishlist.map(item => {
                        return <CartItemForWishList key={item.id} item={item} togglClearWishList={togglClearWishList} />
                    })}

                </Row>
            </Container>
            {wishlist.length > 0 ?
                <Container className="text-center mt-5">
                    <Button variant="secondary" onClick={() => { removeAllFromWishList(); togglClearWishList() }}>Clear Wish List</Button>
                </Container>
                :
                <Container className="text-center">
                    <h3 className="mb-4"> Your wishlist is empty, explore our products <FontAwesomeIcon icon={solidHeart} style={{ color: "#ff476c" }} size="lg" /> </h3>
                    <Link to='/shop'>
                        <Button variant="secondary">Go Shopping</Button>
                    </Link>
                </Container>
            }
        </Container>
    )
}