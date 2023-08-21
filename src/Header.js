import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping, faHeart, faRightToBracket, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Header() {

    const [auth, setAuth] = useState(false);


    return (
        <nav className="navbar navbar-expand-xl navbar-light bg-light">
            <Link className="navbar-brand" to="/homepage">
                <img src="clionce.png" width="200" height="54" className="d-inline-block align-top" alt="" />
            </Link>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav mr-auto">
                    <li class="nav-item active">
                        <Link class="nav-link" to="/shop">Store <span class="sr-only">(current)</span></Link>
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
                    <button class="btn btn-outline-secondary my-2 my-sm-0" type="submit"><FontAwesomeIcon icon={faMagnifyingGlass} size="lg" /></button>
                </form>
                {/* {console.log(firstName)}
                {auth ?
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <h5>{firstName}</h5>
                    </div> :
                    <></>
                } */}
                <div className="row justify-content-xl-center justify-content-start mt-3 mb-2 ml-1 mr-2">
                    <div className="col-0.5 mr-3 mt-2 mb-3">
                        <FontAwesomeIcon icon={faHeart} style={{ color: "#ff0000" }} size="xl" />
                    </div>
                    <div className="col-0.5 mr-3">
                        <div className="nav-item dropdown">
                            <a className="nav-link" href="#" style={{ color: "black" }} id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <FontAwesomeIcon icon={faRightToBracket} size="xl" />
                            </a>
                            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                <Link className="dropdown-item" to="/login_page">Login</Link>
                                <Link className="dropdown-item" to="/registration_form">Register</Link>

                            </div>
                        </div>
                    </div>
                    <div className="col-0.5 mt-2">
                        <Link to="/cart_page"><FontAwesomeIcon icon={faCartShopping} style={{ marginRight: "8px", color: "black" }} size="xl" /></Link>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Header;