// import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import { Button, Table } from 'react-bootstrap';

ListStock.propTypes = {
    Stocks: PropTypes.array.isRequired,
    onDeleteClick: PropTypes.func
};
ListStock.defaultProps = {
    Stocks: [],
    onDeleteClick: null
}
function ListStock(props) {
    const checkStatus = (status) => {
        if (status) {
            return 'Đã thanh toán';
        }
        return 'Chưa thanh toán';
    }
    const formatDate = (dateStr) => {
        var date = new Date(dateStr);
        return date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear()
    }
    const navigate = useNavigate();
    // const onDeleteClick = props.onDeleteClick;
    const Stocks = props.Stocks;
    return (
        <div className='App'>
            <Link className="btn btn-primary" style={{ backgroundColor: "#8975ff", marginBottom: "20px" }} to="/product/add" exact="true">Thêm mới</Link>
            <Table style={{ border: "solid 1px black" }}>
                <thead>
                    <tr>
                        <th>STT</th>
                        <th>Nhà cung cấp</th>
                        <th>Ngày nhập</th>
                        <th>Sản phẩm</th>
                        {/* <th>Hình ảnh</th> */}
                        <th>Tổng tiền</th>
                        <th>Tình trạng</th>
                        <th>Chi tiết</th>
                        <th>Thao tác</th>
                    </tr>
                </thead>
                <tbody>
                    {Stocks.map((val, key) => {
                        return (
                            <tr key={key}>
                                <td>{key + 1}</td>
                                <td>{val.id_supply.name}</td>
                                <td>{formatDate(val.dateReceive)}</td>
                                <td>{(val.receive).length}</td>
                                <td>{val.totalPrice}</td>
                                <td>{checkStatus(val.status)}</td>
                                <td><Link to="/category/add" exact="true">Xem </Link></td>
                                <td>
                                    <Button variant="success" onClick={() => {
                                        Navigate(`/product/update/${val._id}`)
                                    }} style={{ backgroundColor: "#8975ff" }} size="sm">
                                        Sửa
                                    </Button>{' '}
                                    <Button style={{ backgroundColor: "#8975ff" }} variant="success" size="sm">
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

export default ListStock; 