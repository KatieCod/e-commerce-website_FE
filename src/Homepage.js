import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCamera, faFaceSmileWink, faHandshakeSimple, faLeaf, faMedal, faPaw, faVideo, faCartShopping, faHeart, faRightToBracket } from '@fortawesome/free-solid-svg-icons'
import { faDove } from '@fortawesome/free-solid-svg-icons'
import Product from "./Product";
import ChooseUs from "./ChooseUs";

function Homepage() {
    return (
        <div>
            <nav class="navbar navbar-expand-xl navbar-light bg-light">
                <a className="navbar-brand" href="/home">
                    <img src="clionce.png" width="200" height="54" className="d-inline-block align-top" alt="" />
                </a>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>

                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav mr-auto">
                        <li class="nav-item active">
                            <a class="nav-link" href="#">Shop <span class="sr-only">(current)</span></a>
                        </li>

                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Categories
                            </a>
                            <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                                <a class="dropdown-item" href="#">All</a>
                                <a class="dropdown-item" href="#">Cream</a>
                                <a class="dropdown-item" href="#">Serum</a>
                                <a class="dropdown-item" href="#">Masks</a>
                                <a class="dropdown-item" href="#">Toner</a>
                                <a class="dropdown-item" href="#">Cleanser</a>
                            </div>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#">About Us</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#">Contact Us</a>
                        </li>
                    </ul>
                    <form class="form-inline my-2 my-lg-0 mr-3">
                        <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
                        <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                    </form>
                    <div className="row justify-content-xl-center justify-content-start mt-3 mb-2 ml-1 mr-2">
                        <div className="col-0.5 mr-3">
                            <FontAwesomeIcon icon={faHeart} style={{ color: "#ff0000" }} size="xl" />
                        </div>
                        <div className="col-0.5  mr-3">
                            <FontAwesomeIcon icon={faRightToBracket} size="xl" />
                        </div>
                        <div className="col-0.5">
                            <FontAwesomeIcon icon={faCartShopping} style={{ marginRight: "8px" }} size="xl" />
                        </div>
                    </div>
                </div>
            </nav>
            <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
                <ol class="carousel-indicators">
                    <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
                    <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                    <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
                </ol>

                <div class="carousel-inner">
                    <div class="carousel-item active">
                        <img class="d-block w-100" src="masks.png" alt="First slide" />
                    </div>
                    <div class="carousel-item">
                        <img class="d-block w-100" src="giveaway.png" alt="Second slide" />
                    </div>
                    <div class="carousel-item">
                        <img class="d-block w-100" src="newyear.png" alt="Third slide" />
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
                    <div className="col-md"><Product image={"cleanser.png"} name={"Cleanser  "} /></div>
                    <div className="col-md"><Product image={"serum.png"} name={"Serum  "} /></div>
                    <div className="col-md"><Product image={"toner.png"} name={"Toner  "} /></div>
                </div>
            </div>
            <div className="d-flex justify-content-center mt-5">
                <button type="button" class="btn btn-outline-success">Explore More</button>
            </div>
            <div className="d-flex justify-content-center mt-5">
                <h3>WHY PEOPLE CHOOSE US</h3>

            </div>
            <div className="container mt-5">
                <div className="row justify-content-center">
                    <div className="col-6 col-md-3"><ChooseUs icon={<FontAwesomeIcon icon={faHandshakeSimple} size="2xl" />} /></div>
                    <div className="col-6 col-md-3"><ChooseUs icon={<FontAwesomeIcon icon={faLeaf} size="2xl" />} /></div>
                    <div className="col-6 col-md-3"><ChooseUs icon={<FontAwesomeIcon icon={faMedal} size="2xl" />} /></div>
                    <div className="col-6 col-md-3"><ChooseUs icon={<FontAwesomeIcon icon={faPaw} size="2xl" />} /></div>
                </div>
            </div>
            <div className="d-flex justify-content-center mt-5">
                <h3>GALLERY</h3>
            </div>
            <div class="wrapper">
                <div class="gallery">
                    <div class="gallery_item gallery_item--1 ">
                        <a href="#" class="gallery_link">
                            <img src="6.jpg" class="gallery_image" />
                            <div class="gallery_overlay">
                                <span>Calming liquid</span>
                            </div>
                        </a>
                    </div>
                    <div class="gallery_item gallery_item--2 ">
                        <a href="#" class="gallery_link">
                            <img src="1.jpg" class="gallery_image" />
                            <div class="gallery_overlay">
                                <span>Yoghurt mask</span>
                            </div>
                        </a>
                    </div>
                    <div class="gallery_item gallery_item--3 ">
                        <a href="#" class="gallery_link">
                            <img src="3.jpg" class="gallery_image" />
                            <div class="gallery_overlay">
                                <span>Moisture Cream</span>
                            </div>
                        </a>
                    </div>
                    <div class="gallery_item gallery_item--4 ">
                        <a href="#" class="gallery_link">
                            <img src="7.jpg" class="gallery_image" />
                            <div class="gallery_overlay">
                                <span>Hyaluronic Serum</span>
                            </div>
                        </a>
                    </div>
                    <div class="gallery_item gallery_item--5 ">
                        <a href="#" class="gallery_link">
                            <img src="8.jpg" class="gallery_image" />
                            <div class="gallery_overlay">
                                <span>Propolis Toner</span>
                            </div>
                        </a>
                    </div>
                    <div class="gallery_item gallery_item--6 ">
                        <a href="#" class="gallery_link">
                            <img src="2.jpg" class="gallery_image" />
                            <div class="gallery_overlay">
                                <span>Cica Toner</span>
                            </div>
                        </a>
                    </div>
                </div>
            </div>
            <div>
                <footer class="footer">
                    <div className="p-3 bg-light text-dark">
                        <div className="row align-items-center">
                            <div className="col-md text-md-left text-center">
                                <img src="clionce.png" width="300" height="81" className="d-inline-block align-top" alt="" />
                            </div>
                            <div className="col-md text-md-left text-center mt-3">
                                <ul class="nav flex-column">
                                    <li class="nav-item mb-2"><a href="#" class="nav-link p-0 text-muted">About us</a></li>
                                    <li class="nav-item mb-2"><a href="#" class="nav-link p-0 text-muted">Terms & Conditions</a></li>
                                    <li class="nav-item mb-2"><a href="#" class="nav-link p-0 text-muted">Privacy Policy</a></li>
                                    <li class="nav-item mb-2"><a href="#" class="nav-link p-0 text-muted">Quality Certificate</a></li>
                                </ul>
                            </div>
                            <div className="col-md text-md-left text-center mt-3">
                                <h5>Contact Us</h5>
                                <ul class="nav flex-column ">
                                    <li class="nav-item mb-2 text-muted">Clionce@gmail.com</li>
                                    <li class="nav-item mb-2 text-muted">Tel Aviv-Yafo, Israel </li>
                                    <li class="nav-item mb-2 text-muted">+972 111 111 11 11</li>
                                    <li class="nav-item mb-2 text-muted">Clionce.com</li>
                                    <div className="row justify-content-md-start justify-content-center mt-3 ">
                                        <div className="col-1"><FontAwesomeIcon icon={faCamera} size="xl" /></div>
                                        <div className="col-1"><FontAwesomeIcon icon={faDove} size="xl" /></div>
                                        <div className="col-1"><FontAwesomeIcon icon={faFaceSmileWink} size="xl" /></div>
                                        <div className="col-1"><FontAwesomeIcon icon={faVideo} size="xl" /></div>
                                    </div>
                                </ul>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        </div>
    )
}

export default Homepage;