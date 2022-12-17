import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './style.scss'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import cateAPI from '../../api/Category';
import { Route, Link, NavLink, useNavigate } from 'react-router-dom'

AddCate.propTypes = {
};

function AddCate(props) {
    const [name, setName] = useState("")
    const navigate = useNavigate();
    const submit = async () => {
        const data = { name: name };
        var answer = window.confirm("Are you sure to insert this category?");
        if (answer) {
            await cateAPI.addCate(data);
            navigate("/categories");
        }
        else {
            return;
        }
    }
    return (
        <Form style={{ marginTop: "30px" }}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Tên Danh Mục</Form.Label>
                <Form.Control onChange={(event) => {
                    setName(event.target.value)
                }} value={name} type="text" placeholder="Tên danh mục ..." />
                <Form.Text className="text-muted">
                </Form.Text>
            </Form.Group>
            {/* <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Form.Check type="checkbox" label="Check me out" />
            </Form.Group> */}
            <Button variant="primary" onClick={submit}>
                Thêm
            </Button>
        </Form>
    );
}

export default AddCate;