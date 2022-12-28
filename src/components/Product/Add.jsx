import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './style.scss'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import cateAPI from '../../api/Category';
import productAPI from '../../api/Product';
import { Route, Link, NavLink, useNavigate } from 'react-router-dom'

AddProduct.propTypes = {
};

function AddProduct(props) {
    const navigate = useNavigate();
    const [Categories, setCates] = useState([])
    const [name, setName] = useState("")
    const [cate, setCate] = useState("");
    useEffect(() => {
        // navigate("/products/all/1");
        const fetchCates = async () => {
            const listCate = await cateAPI.getALL();
            setCates(listCate);
            setCate(listCate[0]._id)
        };
        fetchCates();
    }, []);
    const submit = async () => {
        const data = { name: name, id_cate: cate };
        var answer = window.confirm("Are you sure to insert product?");
        if (answer) {
            await productAPI.addProduct(data);
            navigate("/products/all/1");
        }
        else {
            return;
        }
    }
    return (
        <Form style={{ marginTop: "30px" }}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Name</Form.Label>
                <Form.Control onChange={(event) => {
                    setName(event.target.value)
                }} value={name} type="text" placeholder="Tên sản phẩm ..." />
                <Form.Text className="text-muted">
                </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Category</Form.Label>
                <Form.Select onChange={(event) => {
                    setCate(event.target.value)
                }} value={cate} >
                    {Categories.map((val, key) => (
                        <option value={val._id} key={key}>{val.name}</option>
                    ))}
                </Form.Select>

            </Form.Group>
            {/* <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Form.Check type="checkbox" label="Check me out" />
            </Form.Group> */}
            <Button variant="primary" onClick={submit}>
                Submit
            </Button>
        </Form>
    );
}

export default AddProduct;