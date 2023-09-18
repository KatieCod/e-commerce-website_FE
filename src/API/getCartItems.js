import axios from "axios";

const getCartItems = () => {
    const cartItmes = axios.get('http://localhost:3100/cart')
    cartItmes.then(res => {
        return (res.data)
    })
}

export default getCartItems; 