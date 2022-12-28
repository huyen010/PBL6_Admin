import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Route, Link, NavLink, useNavigate } from 'react-router-dom'
import './style.scss'

SearchForm.propTypes = {
    Categories: PropTypes.array.isRequired,
    HandleCateChange: PropTypes.func.isRequired,
    Slug: PropTypes.string.isRequired,
    Search: PropTypes.string
};
SearchForm.defaultProps = {
    Slug: '',
    Categories: [],
    HandleCateChange: null,
    Search: ''
}
function SearchForm(props) {
    const navigate = useNavigate();
    let searchValue = ''
    if (props.Search) searchValue = props.Search
    const Categories = props.Categories;
    const slug = props.Slug;
    const handleCateChange = props.HandleCateChange;
    const [search, setSearch] = useState(searchValue);
    const handleButtonSearch = () => {
        if (search === '') return;
        navigate(`/products/${slug}/${search}/1`)
    }
    return (
        <div style={{ display: "flex", marginTop: "30px" }} >
            <Form.Select aria-label="Default select example" style={{
                width: "150px", border: "1px solid #8975ff",
                height: "40px", marginRight: "10px"
            }} onChange={(event) => { handleCateChange(event.target.value) }} value={slug}>
                {Categories.map((val, key) => {
                    return <option key={key} value={val.slug}>{val.name}</option>
                })}
            </Form.Select >
            <Form className="d-flex">

                <Form.Control style={{ width: "230px", border: "1px solid #8975ff" }}
                    type="search"
                    placeholder="Name product ..."
                    className="me-2"
                    aria-label="Search"
                    onChange={(event) => { setSearch(event.target.value) }} value={search}
                />
                <Button variant="outline-success" style={{
                    border: "2px solid #8975ff", backgroundColor: "#8975ff",
                    color: 'white'
                }} onClick={handleButtonSearch}>Search</Button>
            </Form>
        </div >
    );
}

export default SearchForm;