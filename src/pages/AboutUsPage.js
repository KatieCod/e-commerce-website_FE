import React from "react";
import { Container, Image, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'

function AboutUsPage() {
    return (
        <Container className="align-item-center">
            <Link to="/shop" style={{color: 'black', textDecoration: 'none'}}>
                <div className="mt-3">
                    <FontAwesomeIcon icon={faArrowLeft} /> Back to store
                </div>
            </Link>
            <h1 className="text-center mt-5">About Us</h1>
            {/* <h3 className="text-center mt-5 mb-4">Cliônce is life style</h3> */}
            <h3 className="text-center ml-4 mt-5">OUR STORY</h3>
            <div style={{ maxWidth: '1200px' }}>
                <h5 className="text-center ml-4 mt-3 ml-5 mr-5">
                    Trust is the medium of beauty. Clionce team has spent 4 years reserching the South Korean beauty industry
                    before launching the shop. The journey started with the most common teenage problem - acne.
                    It was a total nightmare for a young girl like me before I accidently stumbled upon
                    my very first Nature Republic anti-acne cream. It was not even intentially bought
                    but just given away as a nice present when I bought some other care products for my
                    family and friends during my very first visit to Korea. And then it happened like magic,
                    I tried it, I liked it, it worked on me. Ubelievable.
                </h5>
                <h5 className="text-center ml-4 mt-3 ml-5 mr-5">So, 4 years and 8
                    trips to South Korea later here I am confident and happy with my research. I vouch for every
                    single product I sell for that is tried and honestly evaluated by my team and I. </h5>
                <h5 className="text-right mr-5 mt-5">- Clionce founder Katie Weisband</h5>

            </div>
            <Row>
                <Col className="mt-3" sm={6} xs={12}> <Image src="./about/sunya.jpg" fluid rounded /></Col>
                <Col className="mt-3" sm={6} xs={12}> <Image src="./about/katya.jpg" fluid rounded /></Col>
            </Row>
            <Row >
                <Col className="mt-3" sm={4} xs={12}> <Image src="./about/ira2.jpg" fluid rounded /></Col>
                <Col className="mt-3" sm={4} xs={12}> <Image src="./about/katya2.jpg" fluid rounded /></Col>
                <Col className="mt-3" sm={4} xs={12}> <Image src="./about/ira.jpg" fluid rounded /></Col>
                {/* <Col> <Image src="sunya2.jpg" fluid /></Col> */}
            </Row>
            <div className="d-flex justify-content-center mt-5">
                <Link to="/shop"><button type="button" class="btn btn-outline-success">Go Shopping</button></Link>
            </div>
        </Container>
    )

}

export default AboutUsPage;