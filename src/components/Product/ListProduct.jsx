import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ReactTable from "react-table";
import './style.scss'
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { Route, Link, NavLink, useNavigate } from 'react-router-dom'

ListProduct.propTypes = {
    Products: PropTypes.array.isRequired,
    onDeleteClick: PropTypes.func
};
ListProduct.defaultProps = {
    Products: [],
    onDeleteClick: null
}
function ListProduct(props) {
    const navigate = useNavigate();
    const onDeleteClick = props.onDeleteClick;
    const Products = props.Products;
    function handleButtonDelete(key, value) {
        onDeleteClick(key, value);
    }

    return (
        <div className='App'>
            <Link className="btn btn-primary" style={{ backgroundColor: "#8975ff", marginBottom: "20px" }} to="/product/add" exact="true">Add new</Link>
            <Table style={{ border: "solid 1px black" }}>
                <thead>
                    <tr>
                        <th>Index</th>
                        <th>Name</th>
                        <th>Status</th>
                        <th>Sold</th>
                        <th>Price</th>
                        <th>Detail</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {Products.map((val, key) => {
                        return (
                            <tr key={key}>
                                <td>{key + 1}</td>
                                <td>{val.name}</td>
                                <td>{val.status + ' '}
                                    {val.status === 'Chưa bán' && <Link to={`/product/sell/${val._id}`} exact="true">Bán</Link>}
                                </td>
                                <td>{val.sold}</td>
                                {/* <td>
                            <img
                                src="http://vnnews24h.net/img_data/images/day-cho-con-lam-quen-khi-ve-nha-moi.jpg"
                                alt="" style={{ width: "150px", height: "100px" }}
                            />
                        </td> */}
                                <td>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(val.price)}</td>
                                <td><Link to="/category/add" exact="true">Xem </Link></td>
                                <td>
                                    <Button variant="success" onClick={() => {
                                        navigate(`/product/update/${val._id}`)
                                    }} style={{ backgroundColor: "#8975ff" }} size="sm">
                                        Edit
                                    </Button>{' '}
                                    <Button style={{ backgroundColor: "#8975ff" }} onClick={() => handleButtonDelete(key, val._id)} variant="success" size="sm">
                                        Delete
                                    </Button>{' '}
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>
        </div >
    );
}

export default ListProduct;