import axios from "axios";

const getUsers = (state) => {
    let orders = axios.get('http://localhost:3100/users/all')
    orders.then(res => {
        state(res.data)
    })
}

export default getUsers;