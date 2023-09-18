import React from "react";
import { Container, Col, Row, Card } from "react-bootstrap";

function UserPageItem(props) {
    const { quantity, total_price, product_photo, product_name } = props.detail
    return (
        <>
            <Container className="bg-light mt-3" style={{ maxWidth: '600px' }}>
                <Row className='align-items-center'>
                    <Col xs={3}><Card.Img src={`./items/${product_photo}`} /></Col>
                    <Col>
                        <Row>
                            <Col xs={9}><Card.Text className="text-left">{product_name}</Card.Text ></Col>
                        </Row>
                    </Col>
                    <Col xs={2}><h6 className="text-right font-weight-bold">{quantity}PC</h6></Col>
                    <Col className='mr-4' xs={2}><h4 className="text-left font-weight-bold">{total_price}$</h4></Col>
                </Row>
            </Container>          
        </>
    )
}

export default UserPageItem; 