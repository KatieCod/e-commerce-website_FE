import React from "react";
import { Container, Row, Col, Button, Form, DropdownButton, Dropdown } from "react-bootstrap";
import Product from "./Product";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass, faCaretUp } from '@fortawesome/free-solid-svg-icons'
import { useState } from "react";
import { Link } from "react-router-dom";

function Shop() {

    const [showFilter, setShowFilter] = useState(false)

    const handleClick = () => {
        setShowFilter(!showFilter)
    }

    return (
        <Container>
            <h1 className="text-center mt-5">Store</h1>
            <Form inline>
                <Row className="mt-5">
                    <Col className="ml-5">
                        {!showFilter ?
                            <Button style={{ width: "100px" }} variant="light" onClick={handleClick}>Filter <FontAwesomeIcon icon={faCaretUp} rotation={90} /> </Button>
                            : <Button style={{ width: "100px" }} variant="light" onClick={handleClick}>Filter <FontAwesomeIcon icon={faCaretUp} rotation={180} /> </Button>}

                    </Col>
                    <Col xs={4}>
                        <Form.Control
                            type="text"
                            placeholder="Search"
                            className="mr-sm-2"
                        />
                    </Col>
                    <Col xs={2}>
                        <Button variant="light" type="submit"><FontAwesomeIcon icon={faMagnifyingGlass} size="lg" /></Button>
                    </Col>
                </Row>
                {!showFilter ? <h5></h5> :
                    <Container className=" ">
                        <Row className="text-center  mt-5">
                            <Row className="mt-4 ">
                                <Col> Price </Col>
                                <Col >
                                    <Form.Control
                                        placeholder="From"
                                    />
                                </Col>
                                <Col>-</Col>
                                <Col>
                                    <Form.Control
                                        placeholder="To"
                                    />
                                </Col>
                            </Row>

                            <Col className="mt-4">
                                <Dropdown>
                                    <Dropdown.Toggle variant="light" id="dropdown-basic">
                                        Categories
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu>
                                        <Dropdown.Item href="#/action-1">All</Dropdown.Item>
                                        <Dropdown.Item href="#/action-2">Cream</Dropdown.Item>
                                        <Dropdown.Item href="#/action-3">Serum</Dropdown.Item>
                                        <Dropdown.Item href="#/action-3">Masks</Dropdown.Item>
                                        <Dropdown.Item href="#/action-3">Toner</Dropdown.Item>
                                        <Dropdown.Item href="#/action-3">Cleanser</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </Col>
                            <Col  className="mt-4">
                                <Dropdown>
                                    <Dropdown.Toggle variant="light" id="dropdown-basic">
                                        Skin Type
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu>
                                        <Dropdown.Item href="#/action-1">All</Dropdown.Item>
                                        <Dropdown.Item href="#/action-2">Oily</Dropdown.Item>
                                        <Dropdown.Item href="#/action-3">Acne</Dropdown.Item>
                                        <Dropdown.Item href="#/action-3">Dry</Dropdown.Item>
                                        <Dropdown.Item href="#/action-3">Aging</Dropdown.Item>
                                        <Dropdown.Item href="#/action-3">Combined</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </Col>
                        </Row>
                    </Container>
                }

            </Form>

            <Row className="mt-5">
                <Col className="mt-4" lg={3} sm={6}><Link style={{ textDecoration: 'none' , color: 'black'}} to="/product_page"><Product image={"cleanser.png"} name={"Low pH Good Morning Gel Cleanser"} price={8} /></Link></Col>
                <Col className="mt-4" lg={3} sm={6}><Product image={"serum.png"} name={"Serum"} price={19} /></Col>
                <Col className="mt-4" lg={3} sm={6}><Product image={"toner.png"} name={"Toner"} price={12} /></Col>
                <Col className="mt-4" lg={3} sm={6}><Product image={"cream.png"} name={"Propolis Cream"} price={29} /></Col>
            </Row>
            <Row className="mt-5">
                <Col className="mt-4" lg={3} sm={6}><Product image={"cica-cream.png"} name={"Cica Cream"} price={8} /></Col>
                <Col className="mt-4" lg={3} sm={6}><Product image={"kit.png"} name={"Cica Kit"} price={19} /></Col>
                <Col className="mt-4" lg={3} sm={6}><Product image={"mask.gif"} name={"Mask"} price={12} /></Col>
                <Col className="mt-4" lg={3} sm={6}><Product image={"cica-serum.png"} name={"Cica Serum"} price={29} /></Col>
            </Row>
            <Row className="mt-5">
                <Col className="mt-4" lg={3} sm={6}><Product image={"cleanser.png"} name={"Cleanser"} price={8} /></Col>
                <Col className="mt-4" lg={3} sm={6}><Product image={"serum.png"} name={"Serum"} price={19} /></Col>
                <Col className="mt-4" lg={3} sm={6}><Product image={"toner.png"} name={"Toner"} price={12} /></Col>
                <Col className="mt-4" lg={3} sm={6}><Product image={"toner.png"} name={"Toner"} price={29} /></Col>
            </Row>
            <Container className="mt-5 d-flex justify-content-center">
                <Button variant="light">Show More</Button>
            </Container>

        </Container>
    )
}

export default Shop; 
