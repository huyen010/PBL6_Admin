import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCube, faList, faTable, faArrowDown, faLocationDot, faBarsProgress, faChartColumn, faUser, faMoneyCheckAlt, faBookOpen } from '@fortawesome/free-solid-svg-icons'
import { faAddressBook } from '@fortawesome/free-regular-svg-icons'
import { Link } from 'react-router-dom'

const SideBarAdmin = () => {
    return (
        <div className='col-xl-2' style={{ background: 'linear-gradient(180deg, #7D89FF 0%, #AB40FF 66.67%)' }}>
            <ul className="nav flex-column" style={{height:'690px'}}>
                <li className="nav-item">
                    <a className="nav-link text-start text-white border-bottom border-white" aria-current="page" href="#">Dashboard</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link text-start text-white" aria-current="page" href="#">Manager Shop</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link text-start text-white text-uppercase" data-bs-toggle="" href="#product" role="button" aria-expanded="true" aria-controls="product">Product</a>
                    <ul className="nav flex-column" id='product'>
                        <li className="nav-item w-100">
                            <Link className="nav-link text-start text-white" to='/Product'>
                                <FontAwesomeIcon className='me-2' icon={faCube} />
                                Product
                            </Link>
                        </li>
                        <li className="nav-item w-100">
                            <Link className="nav-link text-start text-white" to="/Category">
                                <FontAwesomeIcon className='me-2' icon={faList} />
                                Catergory
                            </Link>
                        </li>
                        <li className="nav-item w-100">
                            <Link className="nav-link text-start text-white" to='/Stock'>
                                <FontAwesomeIcon className='me-2' icon={faTable} />
                                Stock
                            </Link>
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
                    <a className="nav-link text-start text-white text-uppercase" data-bs-toggle="" href="#delivery" role="button" aria-expanded="true" aria-controls="shipment">Shipment</a>
                    <ul className="nav flex-column" id='delivery'>
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
                    <ul className="nav flex-column" id='statistic'>
                        <li className="nav-item w-100">
                            <Link className="nav-link text-start text-white" to='/Statistic'>
                                <FontAwesomeIcon className='me-2' icon={faChartColumn} />
                                Statistic
                            </Link>
                        </li>
                    </ul>
                </li>
                <li className="nav-item">
                    <a className="nav-link text-start text-white text-uppercase" data-bs-toggle="" href='#' role="button" aria-expanded="true" aria-controls="user">
                        User
                    </a>
                    <ul className="nav flex-column" id='user'>
                        <li className="nav-item w-100">
                            <Link className="nav-link text-start text-white" to='/Bill'>
                                <FontAwesomeIcon className='me-2' icon={faMoneyCheckAlt} />
                                Bill
                            </Link>
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
    )
}

export default SideBarAdmin