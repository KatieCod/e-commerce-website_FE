import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCamera, faFaceSmileWink, faVideo} from '@fortawesome/free-solid-svg-icons'
import { faDove } from '@fortawesome/free-solid-svg-icons'

function Footer() {
    return (
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
    )
}

export default Footer;