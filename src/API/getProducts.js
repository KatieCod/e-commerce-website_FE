import axios from "axios";

const getProducts = (state) => {
    let orders = axios.get('http://localhost:3100/products')
    orders.then(res => {
        state(res.data)
    })
}

export default getProducts;