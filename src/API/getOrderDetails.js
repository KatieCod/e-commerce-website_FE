import axios from "axios";

const getOrderDetails = (state) => {
    let orders = axios.get('http://localhost:3100/orders/order-details')
    orders.then(res => {
        state(res.data)
    })
}

export default getOrderDetails;