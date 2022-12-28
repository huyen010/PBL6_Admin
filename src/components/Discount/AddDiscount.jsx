import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './style.scss'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import cateAPI from '../../api/Category';
import productAPI from '../../api/Product';
import { Route, Link, NavLink, useNavigate } from 'react-router-dom'
import { faCreativeCommonsPd } from '@fortawesome/free-brands-svg-icons';
import { MultiSelect } from 'react-multi-select-component';
import discountAPI from '../../api/Discount';

AddDiscount.propTypes = {
};

function AddDiscount(props) {
    const [error, setError] = useState('')
    const [options, setOptions] = useState([])
    const [percent, setPercent] = useState(0)
    const [date, setDate] = useState('')
    const [dateEnd, setDateEnd] = useState('')
    const [selected, setSelected] = useState([]);
    useEffect(() => {
        const fetchProducts = async () => {
            const listPr = await productAPI.getAllProducts();
            const data = [];
            listPr.listproducts.map((item) => (
                data.push({ label: item.name, value: item._id })
            ))
            setOptions(data)
        };
        fetchProducts();
    }, []);
    const navigate = useNavigate();
    const submit = async () => {
        if (selected.length === 0 || percent <= 0 || percent >= 100 || dateEnd === '' || date === '') {
            console.log('1')
            return setError('Vui lòng nhập thông tin hợp lệ')
        }
        const products = []
        selected.map((item) => (
            products.push(item.value)
        ))
        const data = {
            percent: percent,
            date_create: {
                date: date.split('T')[0],
                time: date.split('T')[1],
            },
            dateEnd: {
                date: dateEnd.split('T')[0],
                time: dateEnd.split('T')[1],
            },
            listProduct: products
        }
        var answer = window.confirm("Are you sure to insert discount?");
        if (answer) {
            discountAPI.addDiscount(data)
            setTimeout(() => {
                console.log("Delayed for 1 second.");
            }, 3000)
            navigate("admin/Promotion");
        }
        else {
            return;
        }
    }
    return (
        <Form style={{ marginTop: "30px" }}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Start day</Form.Label>
                <Form.Control onChange={(event) => {
                    setDate(event.target.value)
                }} value={date} type="datetime-local" placeholder="Tên sản phẩm ..." />
                <Form.Text className="text-muted">
                </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Percent</Form.Label>
                <Form.Control onChange={(event) => {
                    setPercent(event.target.value)
                }} value={percent} type="number" step={1} min={1} max={100} placeholder="Percent ..." />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Time(hour)</Form.Label>
                <Form.Control min={date} onChange={(event) => {
                    setDateEnd(event.target.value)
                }} value={dateEnd} type="datetime-local" placeholder="Tên sản phẩm ..." />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>List product</Form.Label>
                <MultiSelect
                    options={options}
                    value={selected}
                    onChange={setSelected}
                    labelledBy={"Select"}
                    isCreatable={true}
                />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
                {error.trim() && <p style={{ color: 'red' }}>{error}</p>}
            </Form.Group>
            <Button variant="primary" onClick={submit} style={{ marginTop: "20px" }}>
                Submit
            </Button>
        </Form>
    );
}

export default AddDiscount;