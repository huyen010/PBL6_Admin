import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useParams } from "react-router-dom";
import stockAPI from "../../api/Stock";
import supplyAPI from "../../api/Supply";
import ListStock from "./ListStock";
import Paginate from '../Pagination/Paginate';

IndexStock.propTypes = {

};

function IndexStock(props) {
    let { page } = useParams();
    page = parseInt(page)
    const [count, setCount] = useState(1)
    const [stock, setStock] = useState([])
    const [supplies, setSupplies] = useState([]);
    const href = '/stock/'
    useEffect(() => {
        const fetchStock = async () => {
            const listStock = await stockAPI.getALL(page);
            setStock(listStock.stock);
            setCount(listStock.count)
        };
        fetchStock();
    }, [page]);
    let firstPage = 0;
    let lastPage = 0;
    if (count !== 0) {
        firstPage = parseInt((page - 1) / 5) + 1;
        lastPage = parseInt(page) + 4 <= count ? parseInt(page) + 4 : count
    }
    const handleDelete = async (key, value) => {
        var answer = window.confirm("Are you sure to delete product?");
        if (answer) {
            // await stockAPI.DeleteProduct(value);
            // let productClone = [...products];
            // productClone.splice(key, 1);
            // setProducts(productClone);
        }
        else {
            return;
        }
    }
    return (
        <div>
            {/* <SearchForm Categories={categories} /> */}
            {/* <Route path="/add" component={SearchForm} exac /> */}
            <ListStock Stocks={stock} onDeleteClick={handleDelete} />
            <Paginate href={href} firstpage={firstPage} count={count} lastpage={lastPage} active={page} ></Paginate>
        </div>
    );
}

export default IndexStock; 