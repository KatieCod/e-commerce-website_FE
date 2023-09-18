import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping, faHeart, faRightToBracket, faMagnifyingGlass, faRightFromBracket, faUser } from '@fortawesome/free-solid-svg-icons'
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Header({ handleLogout, currentUser }) {

    const baseUrl = "http://localhost:3000"

    return (
        <nav className="navbar navbar-expand-xl navbar-light bg-light">
            <Link className="navbar-brand" to="/homepage">
                <img src={`${baseUrl}/mainpage/clionce.png `} width="200" height="54" className="d-inline-block align-top" alt="" />
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
                            <Link to='/shop' class="dropdown-item" href="#">
                                All
                            </Link>
                            <Link to='/shop/cream' class="dropdown-item" href="#">
                                Cream
                            </Link>
                            <Link to='/shop/serum' class="dropdown-item" href="#">
                                Serum
                            </Link>
                            <Link to='/shop/mask' class="dropdown-item" href="#">
                                Mask
                            </Link>
                            <Link to='/shop/toner' class="dropdown-item" href="#">
                                Toner
                            </Link>
                            <Link to='/shop/cleanser' class="dropdown-item" href="#">
                                Cleanser
                            </Link>
                            <Link to='/shop/kit' class="dropdown-item" href="#">
                                Kit
                            </Link>
                        </div>
                    </li>
                    <li class="nav-item">
                        <Link class="nav-link" to='/about-us'>About Us</Link>
                    </li>
                    <li class="nav-item">
                        <Link class="nav-link" to='/contact-us'>Contact Us</Link>
                    </li>
                </ul>
                <form class="form-inline my-2 my-lg-0 mr-3">
                    <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
                    <button class="btn btn-outline-secondary my-2 my-sm-0" type="submit"><FontAwesomeIcon icon={faMagnifyingGlass} size="lg" /></button>
                </form>
                {Object.keys(currentUser).length > 0
                    ?
                    <>
                        <div className="mt-2 mr-3 ml-1" >
                            <p> Hi {currentUser.first_name}!</p>
                        </div>
                    </>
                    :
                    <></>
                }
                <div className="row justify-content-xl-center justify-content-start mt-3 mb-2 ml-1 mr-2">
                    <div className="col-0.5 mr-3 mt-2 mb-3">
                        <Link to=''>
                            <FontAwesomeIcon icon={faHeart} style={{ color: "#ff0000" }} size="xl" />
                        </Link>
                    </div>
                    <div className="col-0.5 mr-3">
                        <div className="nav-item dropdown">
                            {Object.keys(currentUser).length > 0
                                ?
                                <>
                                    <a className="nav-link" href="#" style={{ color: "black" }} id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <FontAwesomeIcon icon={faUser} size="xl" />
                                    </a>
                                    <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                        <div onClick={handleLogout} className="dropdown-item" to="/login_page">Logout</div>
                                        <Link className="dropdown-item" to="/user-page">{`${currentUser.first_name}'s page`}</Link>
                                    </div>
                                </>
                                :
                                <>
                                    <a className="nav-link" href="#" style={{ color: "black" }} id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <FontAwesomeIcon icon={faRightToBracket} size="xl" />
                                    </a>
                                    <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                        <Link className="dropdown-item" to="/login_page">Login</Link>
                                        <Link className="dropdown-item" to="/registration_form">Register</Link>
                                    </div>
                                </>
                            }
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