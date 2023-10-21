import axios from "axios";

const addReview = (productData, functionUponSuccess, state) => {
    axios.post('http://localhost:3100/reviews/add-review', productData)
        .then(result => {
            if (!result.data.failure) {
                functionUponSuccess(!state)
                console.log('review added')
            } else {
                console.log(result.data.failure)
            }
        })
        .catch(err => console.log(err))
}

export default addReview;