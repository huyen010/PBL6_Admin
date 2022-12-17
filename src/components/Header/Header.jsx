import PropTypes from 'prop-types';
import React from 'react'
import 'bootstrap'
import './style.scss'
import { faSearch, faBagShopping } from "@fortawesome/free-solid-svg-icons";
import { faHeart, faUser } from "@fortawesome/free-regular-svg-icons"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import logo from '../../assets/img/logo.png';
import Container from 'react-bootstrap/esm/Container';
Header.propTypes = {

};

function Header(props) {
    return (
        <Container fluid style={{ paddingRight: '0px', paddingLeft: '0px', marginBottom: '0px', boxShadow: '3px 4px 10px rgba(0,0,0,0.13)' }}>
            <nav className="navbar navbar-expand-lg navbar-light px-5">
                <div className="container-fluid">
                    <a className="navbar-brand me-auto" href="#">
                        {/* <img src={logo} alt="" /> */}
                    </a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                            <li className="nav-item me-4">
                                <a className="nav-link active" aria-current="page" href="#">Home</a>
                            </li>
                            <li className="nav-item me-4">
                                <a className="nav-link" href="#">Shop</a>
                            </li>
                            <li className="nav-item me-4">
                                <a className="nav-link" aria-current="page" href="#">About us</a>
                            </li>
                            <li className="nav-item me-4">
                                <a className="nav-link" aria-current="page" href="#">Contact</a>
                            </li>
                            <li className="nav-item me-4">
                                <a className="nav-link position-relative" href="#">
                                    <FontAwesomeIcon icon={faBagShopping} />
                                    <span className='position-absolute top-0 badge rounded-pill bg-danger end-20'>3</span>
                                </a>
                            </li>
                            <li className="nav-item me-4">
                                <a className="nav-link" aria-current="page" href="#">
                                    <FontAwesomeIcon icon={faHeart} />
                                </a>
                            </li>
                            <li className="nav-item me-4">
                                <a className="nav-link" href="#">
                                    <FontAwesomeIcon icon={faUser} />
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </Container>
    );
}

export default Header;