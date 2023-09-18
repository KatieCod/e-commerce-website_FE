import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping, faHeart, faRightToBracket, faMagnifyingGlass, faRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import { useToggle } from '../hooks/useToggle'
import { useState, useEffect } from "react";
import axios from "axios";
import CartItem2 from "./CartItme2";

function ShopHeader() {

    const [cartItems, setCartItems] = useState([])
    const [showCart, toggleShowCart] = useToggle(false)
    const [changeCart, toggleChangeCart] = useToggle(false);
    const [scroll, setScroll] = useState(false);

    useEffect(() => {
        let cartItmes = axios.get('http://localhost:3100/cart')
        cartItmes.then(res => {
            setCartItems(res.data)
        })
    }, [changeCart, showCart])

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

    return (
        <>
            {cartItems.length>0 ? !showCart 
                ?
                <div className={scroll? "p-2 mb-2 headerSmall fixed" : "p-2 mb-2 headerSmall"} onClick={toggleShowCart}>
                    <FontAwesomeIcon icon={faCartShopping} style={{ color: 'white' }} size="2xl" />
                </div>
                : <div className={scroll? "p-3 mb-2 headerBig fixed" : "p-3 mb-2 headerBig"}>
                    <div onClick={toggleShowCart}><FontAwesomeIcon icon={faCartShopping} style={{ color: 'white' }} size="2xl" /></div>
                    <div>
                        {cartItems.map(item => {
                            if (item.quantity > 0) {
                                return <CartItem2 item={item} toggleChangeCart={toggleChangeCart} />
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