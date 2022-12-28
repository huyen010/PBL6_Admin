import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './style.scss'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Route, Link, NavLink, useNavigate, useParams } from 'react-router-dom'
import { useLocation } from 'react-router-dom';
import UploadAPI from '../../api/Upload';
import cateAPI from '../../api/Category';
import productAPI from '../../api/Product';
import { ProgressBar } from 'react-bootstrap';

UpdateProduct.propTypes = {
};

function UpdateProduct(props) {
    const { id } = useParams();
    const [product, setProduct] = useState({
        name: '',
        id_cate: '',
        description: '',
        price: '',
        urlImage: [],
    });

    const [isLoadingUpload, setIsLoadingUpload] = useState(false);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchProduct = async () => {
            const p = await productAPI.getById(id);
            const list = await cateAPI.getALL();
            setCategories(list);
            setProduct({
                name: p.name, id_cate: p.id_cate._id, description: p.description,
                price: p.price, urlImage: p.urlImage
            })
        }
        fetchProduct();
    }, [id])
    console.log(product)
    const [empty, setEmpty] = useState({
        name: false,
        description: false,
        price: false,
    })
    const navigate = useNavigate();
    const submit = async () => {
        console.log('11')
        if (!product.name.trim() || !product.description.trim()
            || !product.price.toString().trim()) {
            console.log('22')
            setEmpty({
                name: !product.name.trim(), description: !product.description.trim(),
                price: !product.price.toString().trim()
            })
            return;
        }
        var answer = window.confirm("Are you sure to update this product?");
        if (answer) {
            await productAPI.updateProduct(id, product)
            navigate("/products/all/1");
        }
        else {
            return;
        }
    }
    const upload = async () => {
        let formData = new FormData();
        let photo = document.getElementById("image-file").files;
        for (let i = 0; i < photo.length; i++) {
            formData.append("image", photo[i]);
        }
        setIsLoadingUpload(true)
        // const res = await fetch('/api/v1/cms/products/upload-image', { method: "POST", body: formData })
        const res = await UploadAPI.uploadFile(formData);
        console.log(res)
        setIsLoadingUpload(false)
        setProduct(prevSupply => ({ ...product, urlImage: res }))
        // setEmpty({ ...empty, image: true })
        // alert('Upload successful')
        // fetch('/upload/image', {method: "POST", body: formData});
    }
    return (
        <Form className='form-add' style={{ marginTop: "30px", marginBottom: "30px", maxHeight: '650px', overflowY: "scroll" }} >
            <div style={{ marginBottom: "15px" }}>
                {product.urlImage.map((val, key) => {
                    return <img key={key} src={val} style={{ width: "200px", height: "200px", marginRight: "6px" }} alt="" />
                }
                )}
            </div>
            <Form.Group className="mb-3" >
                <Form.Label>Name</Form.Label>
                <Form.Control onChange={(event) => {
                    setProduct(prevProduct => ({ ...product, name: event.target.value }))
                    setEmpty({ ...empty, name: true })
                }} value={product.name} type="text" placeholder="Name supply ..." />
                {!product.name.trim() && empty.name && <Form.Text className="text-muted">Missing name</Form.Text>}
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Category</Form.Label>
                <Form.Select onChange={(event) => {
                    setProduct(prevProduct => ({ ...product, id_cate: event.target.value }))
                }} value={product.id_cate} >
                    {categories.map((val, key) => (
                        <option value={val._id} key={key}>{val.name}</option>
                    ))}
                </Form.Select>

            </Form.Group>
            <Form.Group className="mb-3" >
                <Form.Label>Price</Form.Label>
                <Form.Control onChange={(event) => {
                    setProduct(prevProduct => ({ ...product, price: event.target.value }))
                    setEmpty({ ...empty, price: true })
                }} value={product.price} type="number" placeholder="Price ..." />
                {!product.price.toString().trim() && empty.price && <Form.Text className="text-muted">Missing price</Form.Text>}

            </Form.Group>
            <Form.Group className="mb-3" >
                <Form.Label>Description</Form.Label>
                <textarea onChange={(event) => {
                    setProduct(prevProduct => ({ ...product, description: event.target.value }))
                    setEmpty({ ...empty, description: true })
                }} value={product.description} class="form-control" id="exampleFormControlTextarea3" rows="7"></textarea>
            </Form.Group>
            <Form.Group className="mb-3" >
                <Form.Label>Image</Form.Label>
                <Form.Control id="image-file" multiple type="file" />
                <Button variant="light" style={{ marginLeft: "108px", marginTop: "10px" }} onClick={upload}>Upload</Button>
            </Form.Group>
            {isLoadingUpload && <ProgressBar style={{ width: 460, marginLeft: 120 }} animated now={100} />}
            <Button variant="primary" onClick={submit}>
                Submit
            </Button>
        </Form >
    );
}

export default UpdateProduct;