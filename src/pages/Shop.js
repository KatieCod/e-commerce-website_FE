import React, { useContext } from "react";
import { Container, Row, Col, Button, Form, Dropdown } from "react-bootstrap";
import Product from "../components/Product";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass, faCaretUp } from '@fortawesome/free-solid-svg-icons'
import { useState } from "react";
import { Link } from "react-router-dom";
import { useToggle } from '../hooks/useToggle'
import { useEffect } from "react";
import axios from "axios";
import ShopSider from "../components/ShopSider";
import ShopHeader from "../components/ShopHeader";
import { cleanup } from "@testing-library/react";
import { Context } from "../context";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Shop() {

    const [showFilter, toggleFilter] = useToggle(false)
    const { products } = useContext(Context)
    const [width, setWidth] = useState();
    const [categoryProducts, setCategoryProducts] = useState([]);
    const [skinTypeProducts, setSkinTypeProducts] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("Category");
    const [selectedSkinType, setSelectedSkinType] = useState("Skin type");
    const [fromPrice, setFromPrice] = useState("");
    const [toPrice, setToPrice] = useState("");
    const [sider, toggleSider] = useToggle(false)

    const { name } = useParams()

    useEffect(() => {
        setWidth(window.innerWidth)
        const handleWidth = () => {
            setWidth(window.innerWidth);
        };
        window.addEventListener('resize', handleWidth)
        return cleanup()
    }, [])

    useEffect(() => {
        let products = axios.get(`http://localhost:3100/category/${name}`)
        products.then(res => {
            setCategoryProducts(res.data)
        })
    }, [name])

    useEffect(() => {
        let products = axios.get(`http://localhost:3100/skinType/${selectedSkinType.toLocaleLowerCase()}`)
        products.then(res => {
            setSkinTypeProducts(res.data)
        })
    }, [selectedSkinType])

    const notify = () => toast('you have reached stock maximum');

    const handleCategoryChange = (eventKey) => {
        setSelectedCategory(eventKey);
    };

    const handleSkinTypeChange = (eventKey) => {
        setSelectedSkinType(eventKey);
    };

    const handleFromPriceChange = (e) => {
        setFromPrice(e.target.value);
    };

    const handleToPriceChange = (e) => {
        setToPrice(e.target.value);
        console.log(e.target.value);
    };

    const productsInRow = 4;
    let productsRow = [];
    let categoryRow = [];

    for (let i = 0; i < categoryProducts.length; i += productsInRow) {
        const catRow = categoryProducts.slice(i, i + productsInRow);
        categoryRow.push(catRow)
    }

    const filteredProducts = selectedCategory === 'All' || selectedCategory === 'Category'
        ? products
        : products.filter((product) => product.category === selectedCategory.toLowerCase())

    const filteredBySkinType = selectedSkinType === 'All' || selectedSkinType === 'Skin type'
        ? filteredProducts
        : filteredProducts.filter((item1) => { return skinTypeProducts.some(item2 => item1.id === item2.id) })

    const filteredPrice = !fromPrice || !toPrice
        ? filteredBySkinType
        : filteredBySkinType.filter((product) => product.unit_price >= fromPrice && product.unit_price <= toPrice)

    for (let i = 0; i < filteredPrice.length; i += productsInRow) {
        const row = filteredPrice.slice(i, i + productsInRow);
        productsRow.push(row)
    }
        
    return (
        <>
            {width > 870 ? <ShopSider sider={sider} /> : <ShopHeader />}
            <Container>
                <h1 className="text-center mt-5">Store</h1>
                <Form inline>
                    <Row className="mt-5">
                        <Col className="ml-5">
                            {!showFilter ?
                                <Button style={{ width: "100px" }} variant="light" onClick={toggleFilter}>Filter <FontAwesomeIcon icon={faCaretUp} rotation={90} /> </Button>
                                : <Button style={{ width: "100px" }} variant="light" onClick={toggleFilter}>Filter <FontAwesomeIcon icon={faCaretUp} rotation={180} /> </Button>}

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
                        <Container style={{ backgroundColor: 'whitesmoke' }}>
                            <Row className="text-center  mt-5">
                                <Form>
                                    <Row className="mt-4 ">
                                        <Col> Price </Col>
                                        <Col >
                                            <Form.Control
                                                type="text"
                                                placeholder="From"
                                                value={fromPrice}
                                                onChange={handleFromPriceChange}
                                            />
                                        </Col>
                                        <Col>-</Col>
                                        <Col>
                                            <Form.Control
                                                type="text"
                                                placeholder="To"
                                                value={toPrice}
                                                onChange={handleToPriceChange}
                                            />
                                        </Col>
                                    </Row>
                                </Form>

                                <Col className="mt-4">
                                    <Dropdown onSelect={handleCategoryChange}>
                                        <Dropdown.Toggle variant="light" id="dropdown-basic">
                                            {selectedCategory}
                                        </Dropdown.Toggle>

                                        <Dropdown.Menu>
                                            <Dropdown.Item eventKey="Category">Category</Dropdown.Item>
                                            <Dropdown.Item eventKey="All"><Link to='/shop' style={{ color: 'black', textDecoration: 'none' }}>All</Link></Dropdown.Item>
                                            <Dropdown.Item eventKey="Cream"><Link to='/shop' style={{ color: 'black', textDecoration: 'none' }}>Cream</Link></Dropdown.Item>
                                            <Dropdown.Item eventKey="Serum"><Link to='/shop' style={{ color: 'black', textDecoration: 'none' }}>Serum</Link></Dropdown.Item>
                                            <Dropdown.Item eventKey="Mask"><Link to='/shop' style={{ color: 'black', textDecoration: 'none' }}>Mask</Link></Dropdown.Item>
                                            <Dropdown.Item eventKey="Toner"><Link to='/shop' style={{ color: 'black', textDecoration: 'none' }}>Toner</Link></Dropdown.Item>
                                            <Dropdown.Item eventKey="Cleanser"><Link to='/shop' style={{ color: 'black', textDecoration: 'none' }}>Cleanser</Link></Dropdown.Item>
                                            <Dropdown.Item eventKey="Kit"><Link to='/shop' style={{ color: 'black', textDecoration: 'none' }}>Kit</Link></Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </Col>
                                <Col className="mt-4 mb-4">
                                    <Dropdown onSelect={handleSkinTypeChange}>
                                        <Dropdown.Toggle variant="light" id="dropdown-basic">
                                            {selectedSkinType}
                                        </Dropdown.Toggle>

                                        <Dropdown.Menu>
                                            <Dropdown.Item eventKey="Skin type">Skin type</Dropdown.Item>
                                            <Dropdown.Item eventKey="All"><Link to='/shop' style={{ color: 'black', textDecoration: 'none' }}>All</Link></Dropdown.Item>
                                            <Dropdown.Item eventKey="Oily"><Link to='/shop' style={{ color: 'black', textDecoration: 'none' }}>Oily</Link></Dropdown.Item>
                                            <Dropdown.Item eventKey="Acne"><Link to='/shop' style={{ color: 'black', textDecoration: 'none' }}>Acne</Link></Dropdown.Item>
                                            <Dropdown.Item eventKey="Dry"><Link to='/shop' style={{ color: 'black', textDecoration: 'none' }}>Dry</Link></Dropdown.Item>
                                            <Dropdown.Item eventKey="Aging"><Link to='/shop' style={{ color: 'black', textDecoration: 'none' }}>Aging</Link></Dropdown.Item>
                                            <Dropdown.Item eventKey="Combined"><Link to='/shop' style={{ color: 'black', textDecoration: 'none' }}>Combined</Link></Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </Col>
                            </Row>
                        </Container>
                    }
                </Form >

                {
                    Object.keys(categoryProducts).length > 0 ?
                        categoryRow.map((row) => {
                            return <Row className="mt-5">
                                {row.map(product => {
                                    return (<Col className="mt-4" lg={3} sm={6}>
                                        <Product product={product} notify={notify} toggleSider={toggleSider} sider={sider} />
                                    </Col>)
                                })}
                            </Row>
                        })
                        :
                        productsRow.map((row) => {
                            return <Row className="mt-5">
                                {row.map(product => {
                                    return (<Col className="mt-4" lg={3} sm={6}>
                                        <Product product={product} notify={notify} toggleSider={toggleSider} sider={sider}/>
                                    </Col>)
                                })}
                            </Row>
                        })
                }
                <ToastContainer />

                < Container className="mt-5 d-flex justify-content-center" >
                    <Button variant="light">Show More</Button>
                </Container >
            </Container >
        </>
    )
}

export default Shop; 
