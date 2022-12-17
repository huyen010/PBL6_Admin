import React from 'react'
import 'bootstrap'
import './navbar.css'
import { faSearch,faBagShopping } from "@fortawesome/free-solid-svg-icons";
import { faHeart, faUser } from "@fortawesome/free-regular-svg-icons"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


const Navbar = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light px-5">
            <div className="container-fluid">
                <a className="navbar-brand me-auto" href="#">
                    {/* <img src='' alt="anh" /> */}
                    <img src='../logo.png' style={{ width: '50px', height: '50px' }} alt="logo" />
                </a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                        <li className="nav-item me-4">
                            <a className="nav-link" href="#">
                                <FontAwesomeIcon icon={faUser}/>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Navbar