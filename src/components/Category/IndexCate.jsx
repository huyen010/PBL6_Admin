import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Route, Link, NavLink } from 'react-router-dom'
import productAPI from '../../api/Product';
import cateAPI from '../../api/Category';
import ListCate from './ListCate';
IndexCate.propTypes = {

};

function IndexCate(props) {
    const [categories, setCategories] = useState([]);
    useEffect(() => {
        const fetchCategories = async () => {
            const listCate = await cateAPI.getALL();
            setCategories(listCate);
        }
        fetchCategories();
    }, []);
    const handleDelete = async (value, key) => {
        var answer = window.confirm("Are you sure to delete product?");
        if (answer) {
            console.log(key);
            const res = await cateAPI.deleteCate(value);
            alert(res.message);
            let cateClone = [...categories];
            cateClone.splice(key, 1);
            setCategories(cateClone);
        }
        else {
            return;
        }
    }
    return (
        <div>
            {/* <Route path="/add" component={SearchForm} exac /> */}
            <ListCate Categories={categories} onDeleteClick={handleDelete} />
        </div>
    );
}

export default IndexCate;