import axios from "axios";

let featuredProducts = axios.get('http://localhost:3100/')
featuredProducts.then(res => {
    console.log(res)
})