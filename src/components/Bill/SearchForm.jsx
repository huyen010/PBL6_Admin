import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Route, Link, NavLink } from 'react-router-dom'
import './style.scss'

SearchForm.propTypes = {
    Status: PropTypes.array.isRequired,
    HandleChange: PropTypes.func.isRequired,
    Delivery: PropTypes.array.isRequired,
    ID_Delivery: PropTypes.string.isRequired,
    STT: PropTypes.number.isRequired
};
SearchForm.defaultProps = {
    Status: [],
    HandleChange: null,
    Delivery: [],
    ID_Delivery: '',
    STT: 1,
}
function SearchForm(props) {
    const listStatus = props.Status;
    const listDelivery = props.Delivery;
    const handleChange = props.HandleChange;
    const id_deliver = props.ID_Delivery;
    const stt = props.STT;
    const [search, setSearch] = useState('');
    const handleButtonSearch = () => {

    }
    return (
        <div style={{ display: "flex", marginTop: "30px", marginLeft: "-45px" }} >
            <Form.Select aria-label="Default select example" style={{
                width: "200px", border: "1px solid #8975ff",
                height: "60px", marginRight: "10px"
            }} onChange={(event) => { handleChange(event.target.value, id_deliver) }} value={stt}>
                {listStatus.map((val, key) => {
                    return <option key={key} value={val._id}>{val.name}</option>
                })}
            </Form.Select >
            <Form.Select aria-label="Default select example" style={{
                width: "200px", border: "1px solid #8975ff",
                height: "60px", marginRight: "10px"
            }} onChange={(event) => { handleChange(stt, event.target.value) }} value={id_deliver}>
                {listDelivery.map((val, key) => {
                    return <option key={key} value={val._id}>{val.name}</option>
                })}
            </Form.Select >
            {/* <Form className="d-flex">

                <Form.Control style={{ width: "230px", border: "1px solid #8975ff" }}
                    type="search"
                    placeholder="Nhập tên sản phẩm ..."
                    className="me-2"
                    aria-label="Search"
                    onChange={(event) => { setSearch(event.target.value) }} value={search}
                />
                <Button variant="outline-success" style={{
                    border: "2px solid #8975ff", backgroundColor: "#8975ff",
                    color: 'white'
                }} onClick={handleButtonSearch}>Tìm kiếm</Button>
            </Form> */}
        </div >
    );
}

export default SearchForm;