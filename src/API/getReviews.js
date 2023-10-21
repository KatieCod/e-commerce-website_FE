import axios from "axios";

const getReviews = (state) => {
    const reviews = axios.get('http://localhost:3100/reviews')
    reviews.then(res => {
        state(res.data)
    })
}

export default getReviews; 