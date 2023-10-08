import axios from "axios";

const getOrders = (state) => {
    let orders = axios.get('http://localhost:3100/orders')
    orders.then(res => {
        state(res.data)
    })
}

export default getOrders;