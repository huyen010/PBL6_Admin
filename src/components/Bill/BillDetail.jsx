import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import billAPI from "../../api/Bill";
import { Table } from "react-bootstrap";
import "./style.scss";
BillDetail.propTypes = {};

function BillDetail(props) {
    const listStatus = [
        {
            id: "63691e673f2070927236ba3f",
            name: "Chờ xác nhận",
        },
        {
            id: "63691e7c3f2070927236ba40",
            name: "Đang chuẩn bị hàng",
        },
        {
            id: "63691e963f2070927236ba41",
            name: "Đang giao",
        },
        {
            id: "63691ea23f2070927236ba42",
            name: "Đã giao hàng thành công",
        },
    ];
    const [history, setHistory] = useState([]);
    const [newStatus, setNewStatus] = useState({});
    const [description, setDescription] = useState('');
    const [bill, setBill] = useState({
        history: [],
        isCancel: { status: false, description: '', date: '' },
        id_bill: {
            product: [
                {
                    id_product: { name: "" },
                    size: { name: "" },
                    color: { name: "" },
                    price: 0,
                    number: 0,
                }],
            payment_method: {
                _id: "636f3bfcaac49394ec9af6e2",
                name: "Transfer"
            },
            delivery: {
                _id: "636649ad61c8dff8737e0a92",
                "name": "Hỏa tốc"
            },
            totalPrice: 0,
            productPrice: 0,
            shipPrice: 0,
            createAt: "",
            id_info: {
                name: "",
                phone: "",
                address: {
                    id_province: {
                        _id: "",
                        name: ""
                    },
                    street: "",
                    id_commune: {
                        _id: "",
                        name: ""
                    },
                    id_district: {
                        _id: "",
                        name: ""
                    }
                }
            }
        },
    });
    const { id } = useParams();
    const formatDate = (dateStr) => {
        var date = new Date(dateStr);
        return (
            date.getDate() +
            "/" +
            (parseInt(date.getMonth()) + 1) +
            "/" +
            date.getFullYear()
        );
    };
    const formatDate2 = (dateStr) => {
        const dateArr = dateStr.split("/");
        return dateArr[1] + "/" + dateArr[0] + "/" + dateArr[2];
    };
    useEffect(() => {
        const fetchBill = async () => {
            const billItem = await billAPI.getById(id);
            setBill(billItem.bill);
            console.log(billItem)
            setHistory(billItem.bill.history);
            // const index = billItem.bill.history.at(-1)
            if (bill.isCancel.status === false) {
                const index = listStatus
                    .map((object) => object.id)
                    .indexOf(billItem.bill.history.at(-1).id_status._id);
                if (index === 3) {
                    setNewStatus({ id: "" });
                    return;
                }
                setNewStatus(listStatus[index + 1]);
            } else {
                setNewStatus({ id: "" });
                return;
            }
        };
        fetchBill();
    }, [id, listStatus.length]);
    const handleButtonUpdate = async (event) => {
        event.preventDefault();
        const data = { id_status: newStatus.id };
        const billUpdate = await billAPI.updateBill(id, data);
        setHistory(billUpdate.bill.history);
        const index = listStatus
            .map((object) => object.id)
            .indexOf(billUpdate.bill.history.at(-1).id_status._id);
        if (index === 3) {
            setNewStatus({ id: "" });
            return;
        }
        setNewStatus(listStatus[index + 1]);
    };
    const handleButtonCancel = async (event) => {
        event.preventDefault();
        if (description === '') return;
        var answer = window.confirm("Bạn có chắc chắn muốn hủy đơn hàng");
        const data = {
            reason: description,
        }
        if (answer) {
            await billAPI.canCelBill(id, data)
            window.location.reload();
        }
    }
    return (
        <div>
            <div>
                <h3>Lịch sử đơn hàng</h3>
                <div className="history" style={{ border: "2px solid slateblue", borderRadius: "5px", padding: "8px 15px 8px 15px", display: "inline-block" }}>
                    {history.map((val, index) => (
                        <li key={index}>
                            {formatDate(val.date) + ":  " + val.id_status.name}
                        </li>
                    ))}
                    {newStatus.id !== "" && bill.isCancel.status === false &&
                        <li>
                            {formatDate2(new Date().toLocaleDateString()) +
                                ": " +
                                newStatus.name}
                            <button onClick={handleButtonUpdate}>Cập nhật</button>
                        </li>
                    }
                    {bill.isCancel.status === true && <li>
                        {formatDate(bill.isCancel.date) +
                            ": " +
                            ': Đơn hàng đã bị hủy vì lý do ' + bill.isCancel.reason}
                    </li>}
                </div>
            </div>
            <div className="main_content">
                <div className="info_user">
                    <label htmlFor="">Người nhận: {bill.id_bill.id_info.name + " SDT: " + bill.id_bill.id_info.phone} </label>
                    <label htmlFor="">
                        Địa chỉ:{" "}
                        {bill.id_bill.id_info.address.street + ' ' +
                            bill.id_bill.id_info.address.id_commune.name + ' ' +
                            bill.id_bill.id_info.address.id_district.name + ' ' +
                            bill.id_bill.id_info.address.id_province.name}{" "}
                    </label>
                    <label htmlFor="">Phương thức thanh toán: {bill.id_bill.payment_method.name} </label>
                    <label htmlFor="">Đơn vị vận chuyển: {bill.id_bill.delivery.name} </label>
                    <label htmlFor="">Ngày đặt: {formatDate(bill.id_bill.createAt)} </label>
                    <label htmlFor="">Giá sản phẩm: {bill.id_bill.productPrice + " Phí ship: " + bill.id_bill.shipPrice + " Tổng tiền: " + bill.id_bill.totalPrice} </label>

                </div>

                <div className="App" style={{ height: "auto" }}>
                    <Table style={{ border: "solid 1px black" }}>
                        <thead>
                            <tr>
                                <th>STT</th>
                                <th>Tên sản phẩm</th>
                                <th>Màu sắc</th>
                                <th>Kích cỡ</th>
                                <th>Số lượng</th>
                                <th>Giá</th>
                            </tr>
                        </thead>
                        <tbody>
                            {bill.id_bill.product.map((val, key) => {
                                return (
                                    <tr key={key}>
                                        <td>{key + 1}</td>
                                        <td>{val.id_product.name}</td>
                                        <td>{val.size.name}</td>
                                        <td>{val.color.name}</td>
                                        <td>{val.number}</td>
                                        <td>{val.price}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </Table>
                    {bill.isCancel.status === false && <div className="bill_cancel">
                        <input onChange={(event) => { setDescription(event.target.value) }} value={description} name='description' type="text" placeholder="Lý do hủy đơn ..." />
                        <button onClick={handleButtonCancel} className="button_cancel">Hủy đơn</button>
                    </div>}
                </div>
            </div>
        </div>
    );
}

export default BillDetail;
