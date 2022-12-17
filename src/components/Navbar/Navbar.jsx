import React from 'react';
import PropTypes from 'prop-types';
import "bootstrap/dist/css/bootstrap.min.css";
import "./style.scss"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCube, faList, faTable, faArrowDown, faLocationDot, faBarsProgress, faChartColumn, faUser, faMoneyCheckAlt, faBookOpen } from '@fortawesome/free-solid-svg-icons'
import { faAddressBook } from '@fortawesome/free-regular-svg-icons'
import { Link } from 'react-router-dom';
Navbar.propTypes = {

};

function Navbar(props) {
    return (
        <div className='col-xl-2' style={{ background: 'linear-gradient(180deg, #7D89FF 0%, #AB40FF 66.67%)', width: '230px' }}>
            <ul className="nav flex-column" style={{ height: '748px' }}>
                <li className="nav-item">
                    <a className="nav-link text-start text-white border-bottom border-white" aria-current="page" href="#">Dashboard</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link text-start text-white" aria-current="page" href="#">Manager Shop</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link text-start text-white text-uppercase" data-bs-toggle="" href="#product" role="button" aria-expanded="true" aria-controls="product">Product</a>
                    <ul className="nav flex-column " id='product'>
                        <li className="nav-item w-100">
                            <a className="nav-link text-start text-white" href="/products/all/1">
                                <FontAwesomeIcon className='me-2' icon={faCube} />
                                Product
                            </a>
                        </li>
                        <li className="nav-item w-100">
                            <Link className="nav-link text-start text-white" to="/Category">
                                <FontAwesomeIcon className='me-2' icon={faList} />
                                Catergory
                            </Link>
                        </li>
                        <li className="nav-item w-100">
                            <a className="nav-link text-start text-white" href="/stock/1">
                                <FontAwesomeIcon className='me-2' icon={faTable} />
                                Stock
                            </a>
                        </li>
                        <li className="nav-item w-100">
                            <Link className="nav-link text-start text-white" to='/Promotion'>
                                <FontAwesomeIcon className='me-2' icon={faArrowDown} />
                                Promotion
                            </Link>
                        </li>
                    </ul>
                </li>
                <li className="nav-item">
                    <a className="nav-link text-start text-white text-uppercase" data-bs-toggle="" href="#shipment" role="button" aria-expanded="true" aria-controls="shipment">Shipment</a>
                    <ul className="nav flex-column " id='shipment'>
                        <li className="nav-item w-100">
                            <Link className="nav-link text-start text-white" to="/Delivery">
                                <FontAwesomeIcon className='me-2' icon={faLocationDot} />
                                Delivery
                            </Link>
                        </li>
                        <li className="nav-item w-100">
                            <Link className="nav-link text-start text-white" to='/Management'>
                                <FontAwesomeIcon className='me-2' icon={faBarsProgress} />
                                Management
                            </Link>
                        </li>
                    </ul>
                </li>
                <li className="nav-item">
                    <a className="nav-link text-start text-white text-uppercase" data-bs-toggle="" href="#statistic" role="button" aria-expanded="true" aria-controls="statistic">Statistic</a>
                    <ul className="nav flex-column " id='statistic'>
                        <li className="nav-item w-100">
                            <a className="nav-link text-start text-white" href="/statistical">
                                <FontAwesomeIcon className='me-2' icon={faChartColumn} />
                                Statistic
                            </a>
                        </li>
                    </ul>
                </li>
                <li className="nav-item">
                    <a className="nav-link text-start text-white text-uppercase" data-bs-toggle="" href="#user" role="button" aria-expanded="true" aria-controls="user">
                        User
                    </a>
                    <ul className="nav flex-column " id='user'>
                        <li className="nav-item w-100">
                            <a className="nav-link text-start text-white" href="/bill/1/6366495061c8dff8737e0a8c/1">
                                <FontAwesomeIcon className='me-2' icon={faMoneyCheckAlt} />
                                Bill
                            </a>
                        </li>
                        <li className="nav-item w-100">
                            <Link className="nav-link text-start text-white" to='/ManageComment'>
                                <FontAwesomeIcon className='me-2' icon={faBookOpen} />
                                Comment
                            </Link>
                        </li>
                        <li className="nav-item w-100">
                            <Link className="nav-link text-start text-white" to='/BlackList'>
                                <FontAwesomeIcon className='me-2' icon={faAddressBook} />
                                Black List
                            </Link>
                        </li>
                        <li className="nav-item w-100">
                            <Link className="nav-link text-start text-white" to='/Staff'>
                                <FontAwesomeIcon className='me-2' icon={faUser} />
                                Staff
                            </Link>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
    );
}

export default Navbar;