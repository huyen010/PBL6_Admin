import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import ListProduct from './ListProduct';
import SearchForm from './SearchForm';
import { Route, Link, NavLink, useParams, useNavigate } from 'react-router-dom'
import productAPI from '../../api/Product';
import cateAPI from '../../api/Category';
import Paginate from '../Pagination/Paginate';
Index.propTypes = {

};
function Index(props) {
    const navigate = useNavigate();
    let { page, slug } = useParams();
    page = parseInt(page)
    const [count, setCount] = useState(1)
    const [products, setProducts] = useState([])
    const [categories, setCategories] = useState([]);
    const href = '/products/' + slug + '/'
    useEffect(() => {
        const fetchProducts = async () => {
            let listPr = []
            if (slug === 'all') {
                listPr = await productAPI.getALL('all', page);
            } else {
                listPr = await productAPI.getALL(slug, page);
            }
            setProducts(listPr.products);
            setCount(listPr.count)
        };
        const fetchCategories = async () => {
            let cates = [{ _id: "all", name: "All", slug: "all" }]
            const listCate = await cateAPI.getALL();
            cates = [...cates, ...listCate]
            setCategories(cates);
        }
        fetchProducts();
        fetchCategories();
    }, [page, slug]);
    let firstPage = 0;
    let lastPage = 0;
    if (count !== 0) {
        firstPage = parseInt((page - 1) / 5) + 1;
        lastPage = parseInt(page) + 4 <= count ? parseInt(page) + 4 : count
    }
    const handleCateChange = async (value) => {
        navigate(`/products/${value}/1`)

        // const listPr = await productAPI.getALL(value, page);
        // setProducts(listPr.products);
    }
    const handleDelete = async (key, value) => {
        var answer = window.confirm("Are you sure to delete product?");
        if (answer) {
            await productAPI.deleteProduct(value);
            let productClone = [...products];
            productClone.splice(key, 1);
            setProducts(productClone);
        }
        else {
            return;
        }
    }
    return (
        <div>
            <SearchForm Slug={slug} Categories={categories} HandleCateChange={handleCateChange} />
            {/* <Route path="/add" component={SearchForm} exac /> */}
            <ListProduct Products={products} onDeleteClick={handleDelete} />
            <Paginate href={href} count={count} firstpage={firstPage} lastpage={lastPage} active={page} ></Paginate>
        </div>
    );
}

export default Index;