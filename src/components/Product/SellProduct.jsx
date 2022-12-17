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

SellProduct.propTypes = {
};

function SellProduct(props) {
    const { id } = useParams();
    const [product, setProduct] = useState({
        name: '',
        cate: '',
    });
    const [data, setData] = useState({
        description: '',
        price: '',
        urlImage: [],
    });
    const [isLoadingUpload, setIsLoadingUpload] = useState(false);

    useEffect(() => {
        const fetchProduct = async () => {
            const p = await productAPI.getById(id);
            console.log(p)
            setProduct({
                name: p.name, cate: p.id_cate.name
            })
        }
        fetchProduct();
    }, [id])
    const [empty, setEmpty] = useState({
        urlImage: false,
        description: false,
        price: false,
    })
    const navigate = useNavigate();
    const submit = async () => {
        if (data.urlImage.length === 0 || !data.description.trim()
            || !data.price.toString().trim()) {
            setEmpty({
                urlImage: data.urlImage.length === 0, description: !data.description.trim(),
                price: !data.price.toString().trim()
            })
            return;
        }
        var answer = window.confirm("Are you sure to sell this product?");
        if (answer) {
            await productAPI.sellProduct(id, data)
            navigate("/products/all/1");
        }
        else {
            return;
        }
    }
    const upload = async () => {
        let formData = new FormData();
        let photo = document.getElementById("image-file").files;
        if (photo.length === 0) {
            return;
        }
        for (let i = 0; i < photo.length; i++) {
            formData.append("image", photo[i]);
        }
        setIsLoadingUpload(true)
        // const res = await fetch('/api/v1/cms/products/upload-image', { method: "POST", body: formData })
        const res = await UploadAPI.uploadFile(formData);
        console.log(res)
        setIsLoadingUpload(false)
        setData(prevData => ({ ...data, urlImage: res }))
        setEmpty({ ...empty, urlImage: true });
        // setEmpty({ ...empty, image: true })
        // alert('Upload successful')
        // fetch('/upload/image', {method: "POST", body: formData});
    }
    return (
        <Form className='form-add' style={{ marginTop: "20px" }} >
            <Form.Group className="mb-3" >
                <Form.Label>Tên sản phẩm</Form.Label>
                <Form.Control value={product.name} type="text" disabled />
            </Form.Group>
            <Form.Group className="mb-3" >
                <Form.Label>Danh mục</Form.Label>
                <Form.Control value={product.cate} type="text" disabled />
            </Form.Group>
            <Form.Group className="mb-3" >
                <Form.Label>Giá</Form.Label>
                <Form.Control onChange={(event) => {
                    setData(prevData => ({ ...data, price: event.target.value }))
                    setEmpty({ ...empty, price: true })
                }} value={data.price} type="number" />
                {!data.price.toString().trim() && empty.price && <Form.Text className="text-muted">Missing price</Form.Text>}

            </Form.Group>
            <Form.Group className="mb-3" >
                <Form.Label>Mô tả</Form.Label>
                <textarea onChange={(event) => {
                    setData(prevData => ({ ...data, description: event.target.value }))
                    setEmpty({ ...empty, description: true })
                }} value={data.description} className="form-control" id="exampleFormControlTextarea3" rows="7"></textarea>
                {!data.description.toString().trim() && empty.description && <Form.Text className="text-muted">Missing description</Form.Text>}
            </Form.Group>
            <Form.Group className="mb-3" >
                <Form.Label>Hình ảnh</Form.Label>
                <Form.Control id="image-file" multiple type="file" />
                {data.urlImage.length === 0 && empty.urlImage && (
                    <Form.Text className="text-muted">Missing image</Form.Text>
                )}
                <Button variant="light" style={{ marginLeft: "108px", marginTop: "10px" }} onClick={upload}>Upload</Button>
            </Form.Group>
            {isLoadingUpload && <ProgressBar style={{ width: 460, marginLeft: 120 }} animated now={100} />}
            <Button variant="primary" onClick={submit}>
                Đăng Bán
            </Button>
        </Form >
    );
}

export default SellProduct;