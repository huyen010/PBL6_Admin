import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Route, Link, NavLink, useParams } from 'react-router-dom'
import productAPI from '../../api/Product';
import supplyAPI from '../../api/Supply';
import ListSupply from './ListSupply';
import Paginate from '../Pagination/Paginate';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
IndexSupply.propTypes = {

};

function IndexSupply(props) {
    const { page } = useParams();
    const [count, setCount] = useState()
    const [Supplies, setSupplies] = useState([]);
    useEffect(() => {
        const fetchSupplygories = async () => {
            const suplies = await supplyAPI.getALL(page);
            setSupplies(suplies.supplies);
            setCount(suplies.count);
        }
        fetchSupplygories();
    }, []);
    let firstPage = 0;
    let lastPage = 0;
    if (count !== 0) {
        firstPage = parseInt((page - 1) / 5) + 1;
        lastPage = parseInt(page) + 4 <= count ? parseInt(page) + 4 : count
    }
    const handleDelete = async (value, key) => {
        var answer = window.confirm("Are you sure to delete this supply?");
        if (answer) {
            console.log(key);
            const res = await supplyAPI.DeleteSupply(value);
            alert(res.message);
            if (res.message !== 'Delete successful') return;
            let supplyClone = [...Supplies];
            supplyClone.splice(key, 1);
            setSupplies(supplyClone);
        }
        else {
            return;
        }
    }
    return (
        <div>
            {/* <Route path="/add" component={SearchForm} exac /> */}
            <ListSupply Supplies={Supplies} onDeleteClick={handleDelete} />
            <Paginate href='/supplies/' firstpage={firstPage} lastpage={lastPage} active={page} ></Paginate>
        </div>
    );
}

export default IndexSupply;