import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './style.scss'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import cateAPI from '../../api/Category';
import { Route, Link, NavLink, useNavigate, useParams } from 'react-router-dom'

UpdateCate.propTypes = {
};

function UpdateCate(props) {
    const { slug } = useParams();
    const [name, setName] = useState("")
    useEffect(() => {
        const fetchCates = async () => {
            const nameCate = (await cateAPI.getCate(slug)).name;
            setName(nameCate);
            console.log(name);
        };
        fetchCates();
    }, []);
    const navigate = useNavigate();
    const submit = async () => {
        const data = { name: name };
        var answer = window.confirm("Are you sure to edit this category?");
        if (answer) {
            await cateAPI.updateCate(data, slug);
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
                Cập nhật
            </Button>
        </Form>
    );
}

export default UpdateCate;