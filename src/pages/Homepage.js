import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHandshakeSimple, faLeaf, faMedal, faPaw } from '@fortawesome/free-solid-svg-icons'
import ProductForMainPage from "../components/ProductForMainPage";
import ChooseUs from "../components/ChooseUs";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Homepage() {

    let [products, setProducts] = useState([]);

    useEffect(() => {
        let featuredProducts = axios.get('http://localhost:3100/products')
        featuredProducts.then(res => {
            setProducts(res.data)
        })
    }, [])

    const notify = () => toast('you have reached stock maximum');

    return (
        <div>
            <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
                <ol class="carousel-indicators">
                    <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
                    <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                    <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
                </ol>

                <div class="carousel-inner">
                    <div class="carousel-item active">
                        <img class="d-block w-100" src="./slider/masks.png" alt="First slide" />
                    </div>
                    <div class="carousel-item">
                        <img class="d-block w-100" src="./slider/giveaway.png" alt="Second slide" />
                    </div>
                    <div class="carousel-item">
                        <img class="d-block w-100" src="./slider/newyear.png" alt="Third slide" />
                    </div>
                </div>
                <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="sr-only">Previous</span>
                </a>
                <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="sr-only">Next</span>
                </a>
            </div>
            <div className="d-flex justify-content-center mt-5">
                <h3>FEATURED PRODUCTS</h3>
            </div>

            <div className="container mt-4">
                <div className="row">
                    {products.map(product => {
                        if (product.featured === 1) {
                            return <div className="col-md"><ProductForMainPage product={product} notify={notify} /></div>
                        }
                    })}
                </div>
                <ToastContainer />
            </div>
            <div className="d-flex justify-content-center mt-5">
                <Link to="/shop"><button type="button" class="btn btn-outline-success">Explore More</button></Link>
            </div>
            <div className="d-flex justify-content-center mt-5">
                <h3>WHY PEOPLE CHOOSE US</h3>

            </div>
            <div className="container mt-5">
                <div className="row justify-content-center">
                    <div className="col-6 col-md-3"><ChooseUs
                        icon={<FontAwesomeIcon icon={faHandshakeSimple} size="2xl" />}
                        title={'Trusted Suppliers'}
                        description={'We speak Korean and have bulid trusted network of certified suppliers over the 4 years of R&D'} />
                    </div>
                    <div className="col-6 col-md-3"><ChooseUs icon={<FontAwesomeIcon
                        icon={faLeaf} size="2xl" />}
                        title={'ECO Ingredients'}
                        description={'Our brands contain natural ingrediants and do not add sulfates, parabens, perfume, and artificial colours'} />
                    </div>
                    <div className="col-6 col-md-3"><ChooseUs
                        icon={<FontAwesomeIcon icon={faMedal} size="2xl" />}
                        title={'Quality Certificates'} 
                        description={'Thorough brand and factory research allows us to offer you the best proved quality at the best price'} />
                    </div>
                    <div className="col-6 col-md-3"><ChooseUs 
                    icon={<FontAwesomeIcon icon={faPaw} size="2xl" />} 
                    title={'No Animal Testing'} 
                    description={'No banny has suffered the testing of the South Korean Skin Care Products'}
                    /></div>
                </div>
            </div>
            <div className="d-flex justify-content-center mt-5">
                <h3>GALLERY</h3>
            </div>
            <div class="wrapper">
                <div class="gallery">
                    <div class="gallery_item gallery_item--1 ">
                        <a href="#" class="gallery_link">
                            <img src="./mainpage/6.jpg" class="gallery_image" />
                            <div class="gallery_overlay">
                                <span>Calming liquid</span>
                            </div>
                        </a>
                    </div>
                    <div class="gallery_item gallery_item--2 ">
                        <a href="#" class="gallery_link">
                            <img src="./mainpage/1.jpg" class="gallery_image" />
                            <div class="gallery_overlay">
                                <span>Yoghurt mask</span>
                            </div>
                        </a>
                    </div>
                    <div class="gallery_item gallery_item--3 ">
                        <a href="#" class="gallery_link">
                            <img src="./mainpage/3.jpg" class="gallery_image" />
                            <div class="gallery_overlay">
                                <span>Moisture Cream</span>
                            </div>
                        </a>
                    </div>
                    <div class="gallery_item gallery_item--4 ">
                        <a href="#" class="gallery_link">
                            <img src="./mainpage/7.jpg" class="gallery_image" />
                            <div class="gallery_overlay">
                                <span>Hyaluronic Serum</span>
                            </div>
                        </a>
                    </div>
                    <div class="gallery_item gallery_item--5 ">
                        <a href="#" class="gallery_link">
                            <img src="./mainpage/8.jpg" class="gallery_image" />
                            <div class="gallery_overlay">
                                <span>Propolis Toner</span>
                            </div>
                        </a>
                    </div>
                    <div class="gallery_item gallery_item--6 ">
                        <a href="#" class="gallery_link">
                            <img src="./mainpage/2.jpg" class="gallery_image" />
                            <div class="gallery_overlay">
                                <span>Cica Toner</span>
                            </div>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Homepage;