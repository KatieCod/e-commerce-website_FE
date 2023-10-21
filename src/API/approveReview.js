import axios from "axios";

const approveReview = (productData, notify, functionUponSuccess, state) => {
    axios.post('http://localhost:3100/reviews/approve-review', productData)
        .then(result => {
            if (!result.data.failure) {
                functionUponSuccess(!state)
                notify()
            } else {
                console.log(result.data.failure)
            }
        })
        .catch(err => console.log(err))
}

export default approveReview;