import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar, faHeart,faCartShopping } from '@fortawesome/free-solid-svg-icons'

function Product(props) {
    return (
        <div class="card border-0 text-center" style={{width: "18rem;"}}>
            <img class="card-img-top" src={props.image} alt="Card image cap" />
            <div class="card-body">
                <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
            </div>
            <div className="row justify-content-center">
            <h5 className="mr-3">{props.name}</h5>
            <FontAwesomeIcon icon={faCartShopping} style={{marginRight: "8px"}} size="xl" />
            <FontAwesomeIcon icon={faHeart} style={{color: "#ff0000"}} size="xl" />
            </div>

            <div className="row justify-content-center">
            <FontAwesomeIcon icon={faStar} style={{color: "#f5ed0a",}} />
            <FontAwesomeIcon icon={faStar} style={{color: "#f5ed0a",}} />
            <FontAwesomeIcon icon={faStar} style={{color: "#f5ed0a",}} />
            <FontAwesomeIcon icon={faStar} style={{color: "#f5ed0a",}} />
            <FontAwesomeIcon icon={faStar} style={{color: "#f5ed0a",}} />
            </div>

        </div>
    )
}

export default Product;