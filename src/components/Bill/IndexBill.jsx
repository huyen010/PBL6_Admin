import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Route, Link, NavLink, useParams, useNavigate } from "react-router-dom";
import productAPI from "../../api/Product";
import cateAPI from "../../api/Category";
import Paginate from "../Pagination/Paginate";
import billAPI from "../../api/Bill";
import SearchForm from "./SearchForm";
import deliveryAPI from "../../api/Delivery";
import ListBill from "./ListBill";
IndexBill.propTypes = {};
function IndexBill(props) {
    const navigate = useNavigate();
    let { page, stt, deliver } = useParams();
    stt = parseInt(stt)
    page = parseInt(page);
    const [count, setCount] = useState(1);
    const [bills, setBills] = useState([]);
    const [isRender, setIsRender] = useState(false)
    const [delivery, setDelivery] = useState([
        {
            _id: "",
            _name: "",
        }
    ]);
    const [status, setStatus] = useState([
        {
            _id: 1,
            name: "Chờ xác nhận",
            id: "63691e673f2070927236ba3f"
        },
        {
            _id: 2,
            name: "Đang chuẩn bị hàng",
            id: "63691e7c3f2070927236ba40"
        },
        {
            _id: 3,
            name: "Đang giao",
            id: "63691e963f2070927236ba41"
        },
        {
            _id: 4,
            name: "Đã giao hàng thành công",
            id: "63691ea23f2070927236ba42"
        },
    ]);
    // const [categories, setCategories] = useState([]);
    const href = "/bill/" + stt + '/' + deliver + '/';
    useEffect(() => {
        const fetchDelivery = async () => {
            const listDelivery = await deliveryAPI.getALL();
            setDelivery(listDelivery.delivery);
            let listBill = await billAPI.getTypeBill(stt, deliver, page);
            setBills(listBill.bills);
            setCount(listBill.count);
        };
        fetchDelivery();
        // fetchCategories();
    }, [page, stt, deliver]);
    let firstPage = 0;
    let lastPage = 0;
    if (count !== 0) {
        firstPage = parseInt((page - 1) / 5) + 1;
        lastPage = parseInt(page) + 4 <= count ? parseInt(page) + 4 : count;
    }
    const handleChange = async (s, d) => {
        // console.log
        navigate(`/bill/${s}/${d}/1`)

    };
    const handleUpdateSTT = async (listUpdate) => {
        const index = status.map(object => object._id).indexOf(stt)
        const data = {
            listID: listUpdate,
            id_status: status[index + 1].id
        }
        var answer = window.confirm("Bạn có muốn cập nhật trạng thái của hóa đơn thành " + status[index + 1].name);
        if (answer) {
            await billAPI.upDateManyBill(data)
            window.location.reload();
        }
    }
    return (
        <div >
            <SearchForm STT={stt} ID_Delivery={deliver} Status={status} Delivery={delivery} HandleChange={handleChange} />
            {/* <Route path="/add" component={SearchForm} exac /> */}
            <ListBill Bills={bills} STT={stt} HandleUpdateClick={handleUpdateSTT} />
            <Paginate
                count={count}
                href={href}
                firstpage={firstPage}
                lastpage={lastPage}
                active={page}
            ></Paginate>
        </div>
    );
}

export default IndexBill;
