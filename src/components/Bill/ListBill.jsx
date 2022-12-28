import React, { useState } from "react";
import PropTypes from "prop-types";
import ReactTable from "react-table";
import "./style.scss";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { Route, Link, NavLink, useNavigate } from "react-router-dom";

ListBill.propTypes = {
    Bills: PropTypes.array.isRequired,
    HandleUpdateClick: PropTypes.func,
};
ListBill.defaultProps = {
    Bills: [],
    HandleUpdateClick: null,
};
function ListBill(props) {
    const navigate = useNavigate();
    const handleUpdateClick = props.HandleUpdateClick;
    const bills = props.Bills;
    console.log(bills)
    const [listUpdate, setListUpdate] = useState([])
    const handleButtonUpdate = () => {
        if (listUpdate.length === 0) return;
        handleUpdateClick(listUpdate)
    }
    const formatDate = (dateStr) => {
        var date = new Date(dateStr);
        return date.getDate() + "/" + (parseInt(date.getMonth()) + 1) + "/" + date.getFullYear()
    }
    const handleClickCheckBox = (event) => {
        if (event.target.checked) {
            // console.log('1')
            const cloneList = [...listUpdate, event.target.value]
            setListUpdate(cloneList)
        } else {
            const index = listUpdate.indexOf(event.target.value);
            const cloneList = [...listUpdate]
            cloneList.splice(index, 1)
            setListUpdate(cloneList)
        }
    }
    return (
        <div className="App">
            <div className="button_update">
                <button onClick={handleButtonUpdate}>Update status</button>
            </div>
            <Table style={{ border: "solid 1px black" }}>
                <thead>
                    <tr>
                        <th>Index</th>
                        <th>ID bill</th>
                        <th>Date create</th>
                        <th>Status</th>
                        <th>Address</th>
                        {/* <th>Hình ảnh</th> */}
                        <th>Delivery</th>
                        <th>Total price</th>
                        <th>Detail</th>
                    </tr>
                </thead>
                <tbody>
                    {bills.map((val, key) => {
                        return (
                            <tr key={key}>
                                <td>
                                    {val.history.length !== 4 && <input type="checkbox" value={val._id} name="choose" onClick={handleClickCheckBox} />}
                                    {key + 1}
                                </td>
                                <td>{val.id_bill._id}</td>
                                <td>{formatDate(val.history.at(-1).date)}</td>
                                <td>{val.history.at(-1).id_status.name}</td>
                                <td>
                                    {val.id_bill.id_info.address.street + ' ' +
                                        val.id_bill.id_info.address.id_district.name + ' ' +
                                        val.id_bill.id_info.address.id_commune.name + ' ' +
                                        val.id_bill.id_info.address.id_province.name}
                                </td>
                                <td>{val.id_bill.delivery.name}</td>
                                <td>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(val.id_bill.totalPrice)}</td>
                                <td>
                                    <Link to={`/bill/detail/${val._id}`} exact="true">
                                        Chi tiết{" "}
                                    </Link>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </Table>
        </div>
    );
}

export default ListBill;
