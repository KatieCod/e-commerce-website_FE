import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar as regular } from "@fortawesome/free-regular-svg-icons";
import { faStar as solid } from "@fortawesome/free-solid-svg-icons";

function RatingStars(props) {
    // const stars = Array.from({ length: 5 }, (_, index) => index + 1);
    const stars = [1,2,3,4,5];

    return (
        <div>
            {stars.map((star) => (
                <span
                    key={star}
                    className={`star ${star <= props.rating ? 'filled' : ''}`}
                    onClick={() => props.onStarClick(star)}
                >
                    {star <= props.rating? <FontAwesomeIcon icon={solid} /> : <FontAwesomeIcon icon={regular} />}
                </span>
            ))}
        </div>
    )
}

export default RatingStars;