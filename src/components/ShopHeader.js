import React, { useContext } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping } from '@fortawesome/free-solid-svg-icons'
import { useToggle } from '../hooks/useToggle'
import { useState, useEffect } from "react";
import axios from "axios";
import CartItem2 from "./CartItme2";
import { Context } from "../context";

function ShopHeader(props) {

    const [cartItems, setCartItems] = useState([])
    const [showCart, toggleShowCart] = useToggle(false)
    const [changeCart, toggleChangeCart] = useToggle(false);
    const [scroll, setScroll] = useState(false);
    const { toggleIAmState, currentUser, setStateForShopItemQuantity, stateForShopItemQuantity } = useContext(Context)

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
    }, [changeCart, showCart, props.sider])

    useEffect(() => {
        const handleScroll = () => {
            if(window.scrollY >= 80) {
                setScroll(true)
            } else {
                setScroll(false)
            }
        };
        window.addEventListener('scroll', handleScroll)
    }, [])

    const removeFromCart = (product_id) => {
        if (Object.keys(currentUser).length > 0) {
            axios.post('http://localhost:3100/cart/remove-from-cart', { id: product_id })
                .then(result => {
                    if (!result.data.failure) {
                        toggleChangeCart()
                        props.updateQuantity(product_id)
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
            {cartItems.length >0 ? !showCart 
                ?
                <div className={scroll? "p-2 mb-2 headerSmall fixed" : "p-2 mb-2 headerSmall"} onClick={toggleShowCart}>
                    <FontAwesomeIcon icon={faCartShopping} style={{ color: 'white' }} size="2xl" />
                </div>
                : <div className={scroll? "p-3 mb-2 headerBig fixed" : "p-3 mb-2 headerBig"}>
                    <div onClick={toggleShowCart}><FontAwesomeIcon icon={faCartShopping} style={{ color: 'white' }} size="2xl" /></div>
                    <div>
                        {cartItems.map(item => {
                            if (item.quantity > 0) {
                                return <CartItem2 item={item} toggleChangeCart={toggleChangeCart} removeFromCart={removeFromCart}/>
                            }
                        })}
                    </div>
                </div> 
                :
                <></>}
        </>
    )
}

export default ShopHeader;