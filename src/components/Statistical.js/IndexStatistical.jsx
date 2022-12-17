import OrderofMonth from "./OrderofMonth";
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import OrderStatus from "./OrderStatus";
import BestSellProduct from "./BestSellProduct";
import statisticalAPI from "../../api/Statistical";

IndexStatistical.propTypes = {

};

function IndexStatistical(props) {
    const [products, setProducts] = useState([{ name: '', sold: 0, id_cate: { name: '' }, price: 0 }])
    const [listStatus, setListStatus] = useState([{ status: '', number: 0 }])
    const [listOrder, setListOrder] = useState([{ day: '', number: 0, revenue: 0 }])
    const [month, setMonth] = useState(1)
    const handleMonthChange = (newMonth) => {
        setMonth(newMonth)
    }
    useEffect(() => {
        const fetchProducts = async () => {
            const listProduct = await statisticalAPI.getBestSeller()
            setProducts(listProduct.products)
        };
        const fetchOrderStatus = async () => {
            const listOrder = await statisticalAPI.getOrderStatus()
            setListStatus(listOrder.number)
        }
        const fetchOrderByMonth = async () => {
            const listOrderByMonth = await statisticalAPI.getOrderByMonth(month)
            setListOrder(listOrderByMonth.order)
        }
        fetchProducts();
        fetchOrderStatus();
        fetchOrderByMonth();
    }, [month]);
    return (
        <div>
            <div style={{ display: "flex" }}>
                <OrderStatus ListStatus={listStatus} />
                <BestSellProduct Products={products} />
            </div>
            <div style={{ marginTop: "-250px" }}>
                <OrderofMonth Month={month} ListOrder={listOrder} HandleMonthChange={handleMonthChange} />
            </div>
        </div>
    );
}

export default IndexStatistical;
