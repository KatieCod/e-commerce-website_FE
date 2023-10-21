import React from "react";
import { Card, Container } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar as regular } from "@fortawesome/free-regular-svg-icons";
import { faStar as solid } from "@fortawesome/free-solid-svg-icons";

const ReviewCard = (props) => {
    const stars = [1, 2, 3, 4, 5];
    const { user_name, text, ranking, date } = props.review

    const convertedDate = new Date(date).toLocaleDateString()

    return (
        <Container>
            <Container className="text-left mt-5 mb-4">
                <h3>{user_name}</h3>
            </Container>
            <Container>
                <Card.Text>
                    {text}
                </Card.Text>
                <h6>Review date: {convertedDate}</h6>
            </Container>
            <Container className="text-left mt-3 mb-4">
                <div>
                    {stars.map((star) => (
                        <span
                            key={star}
                            className={`star2 ${star <= ranking ? 'filled' : ''}`}
                        >
                            {star <= ranking ? <FontAwesomeIcon icon={solid} /> : <FontAwesomeIcon icon={regular} />}
                        </span>
                    ))}
                </div>
            </Container>
        </Container>
    )
}

export default ReviewCard;