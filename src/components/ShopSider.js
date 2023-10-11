import React, { useContext } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping } from '@fortawesome/free-solid-svg-icons'
import { useToggle } from '../hooks/useToggle'
import { useState, useEffect } from "react";
import axios from "axios";
import CartItem2 from "./CartItme2";
import { Context } from "../context";

function ShopSider(props) {

    const [cartItems, setCartItems] = useState([])
    const [showCart, toggleShowCart] = useToggle(false)
    const [changeCart, toggleChangeCart] = useToggle(false);
    const [scroll, setScroll] = useState(false);
    const { toggleIAmState, currentUser, setStateForShopItemQuantity, stateForShopItemQuantity } = useContext(Context)

    useEffect(() => {
        if (Object.keys(currentUser).length > 0) {
            let cartProducts = axios.get('http://localhost:3100/cart')
            cartProducts.then(res => {
                setCartItems(res.data)
            })
        } else {
            let unauthorisedCart = JSON.parse(localStorage.getItem('cart'))
            if (unauthorisedCart === null) {
                localStorage.setItem('cart', JSON.stringify([]))
                unauthorisedCart = JSON.parse(localStorage.getItem('cart'))
            }
            setCartItems(unauthorisedCart)
        }
    }, [showCart, changeCart, props.sider])

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY >= 80) {
                setScroll(true)
            } else {
                setScroll(false)
            }
        };
        window.addEventListener('scroll', handleScroll)
    }, [])

    const removeFromCart = (product_id) => {
        setStateForShopItemQuantity(!stateForShopItemQuantity);
        toggleIAmState()
        if (Object.keys(currentUser).length > 0) {
            axios.post('http://localhost:3100/cart/remove-from-cart', { id: product_id })
                .then(result => {
                    if (!result.data.failure) {
                        setStateForShopItemQuantity(!stateForShopItemQuantity);
                        toggleIAmState()
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
                    toggleIAmState()
                }
            }
            localStorage.setItem('cart', JSON.stringify(cartFromLocalStorage))
        }
    }

    return (
        <>
            {cartItems.length > 0 ? !showCart
                ?
                <div className={scroll ? "p-3 mb-2 siderSmall fixed" : "p-3 mb-2 siderSmall"} onClick={toggleShowCart}>
                    <FontAwesomeIcon icon={faCartShopping} style={{ color: 'white' }} size="2xl" />

                </div>
                : <div className={scroll ? "p-3 mb-2 siderBig fixed" : "p-3 mb-2 siderBig"} >
                    <div onClick={toggleShowCart}><FontAwesomeIcon icon={faCartShopping} style={{ color: 'white' }} size="2xl" /></div>
                    <div>
                        {cartItems.map(item => {
                            return <CartItem2 item={item} toggleChangeCart={toggleChangeCart} removeFromCart={removeFromCart} />
                        })}
                    </div>
                </div> : <></>}
        </>
    )
}

export default ShopSider;