import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './style.scss';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';

import { Route, Link, NavLink, useNavigate } from 'react-router-dom'
ListSupply.propTypes = {
    Supplies: PropTypes.array.isRequired,
    onDeleteClick: PropTypes.func
};
ListSupply.defaultProps = {
    Supplies: [],
    onDeleteClick: null
}
function ListSupply(props) {
    const navigate = useNavigate();
    const onDeleteClick = props.onDeleteClick;
    const Supplies = props.Supplies;
    console.log(Supplies);
    function handleButtonDelete(value, key) {
        onDeleteClick(value, key);
    }
    return (
        <div className='App'>
            <Link className="btn btn-primary" style={{ backgroundColor: "#8975ff" }} to="/representative/add" exact="true">Thêm mới</Link>
            <Table style={{ border: "solid 1px black" }}>
                <thead>
                    <tr>
                        <th>STT</th>
                        <th>Nhà cung cấp</th>
                        <th>SDT</th>
                        <th>Địa chỉ</th>
                        {/* <th>Hình ảnh</th> */}
                        <th>Người đại diện</th>
                        <th>Chi tiết</th>
                        <th>Thao tác</th>
                    </tr>
                </thead>
                <tbody>
                    {Supplies.map((val, key) => {
                        return (
                            <tr key={key}>
                                <td>{key + 1}</td>
                                <td>{val.name}</td>
                                <td>{val.phone}</td>
                                <td>{val.id_commune.name + ' ' + val.id_commune.id_district.name + ' ' + val.id_commune.id_district.id_province.name}</td>
                                <td>{val.id_representative.name}</td>
                                <td><Link to="/category/add" exact="true" style={{ textDecoration: "none", color: "#8975ff" }}>Xem </Link></td>
                                <td>
                                    <Button variant="success" onClick={() => {
                                        navigate(`/representative/update/${val._id}/${val.id_representative._id}`)
                                    }} style={{ backgroundColor: "#8975ff" }} size="sm">
                                        Sửa
                                    </Button>{' '}
                                    <Button style={{ backgroundColor: "#8975ff" }} onClick={() => handleButtonDelete(val._id, key)} variant="success" size="sm">
                                        Xóa
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

export default ListSupply;