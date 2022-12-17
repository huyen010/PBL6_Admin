import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './style.scss'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Route, Link, NavLink, useNavigate, json, useParams } from 'react-router-dom'
import ProgressBar from 'react-bootstrap/ProgressBar';
import UploadAPI from '../../api/Upload';
import supplyAPI from '../../api/Supply';
// import myData from '../../data/ProvinceData.json';

UpdateRepresentative.propTypes = {
};

function UpdateRepresentative(props) {
    const { ids, idre } = useParams();
    const [representative, setRepresentative] = useState({
        name: '',
        phone: '',
        possition: '',
        image: ''
    })
    useEffect(() => {
        const fetchRepresentative = async () => {
            const result = await supplyAPI.GetRepresentative(idre);
            setRepresentative({
                name: result.representative.name, phone: result.representative.phone,
                possition: result.representative.possition, image: result.representative.image
            })
        }
        fetchRepresentative();
    }, [idre]);
    console.log(representative);
    const [empty, setEmpty] = useState({
        name: false,
        phone: false,
        possition: false,
        image: false
    })
    const [isLoadingUpload, setIsLoadingUpload] = useState(false)
    const navigate = useNavigate();
    const submit = async () => {
        if (!representative.name.trim() || !representative.phone.trim()
            || !representative.possition.trim() || !representative.image.trim()) {
            console.log('1')
            setEmpty({
                name: !representative.name.trim(), phone: !representative.phone.trim(),
                possition: !representative.possition.trim(), image: !representative.image.trim()
            })
            return;
        }
        navigate(`/supply/update/${ids}/${idre}`, {
            state: { representative: representative },
        });
    }

    const upload = async () => {
        let photo = document.getElementById("image-file").files[0];
        console.log(photo);
        let formData = new FormData();

        formData.append("image", photo);
        setIsLoadingUpload(true)
        // const res = await fetch('/api/v1/cms/products/upload-image', { method: "POST", body: formData })
        const res = await UploadAPI.UploadFile(formData);

        setIsLoadingUpload(false)

        setRepresentative(prevSupply => ({ ...representative, image: res[0] }))
        setEmpty({ ...empty, image: true })
        // alert('Upload successful')
        // fetch('/upload/image', {method: "POST", body: formData});
    }

    return (
        <Form className='form-add' style={{ marginTop: "30px", marginBottom: "30px" }} >
            <img src={representative.image} style={{ width: "200px", height: "150px" }} alt="" />

            <Form.Group className="mb-3"  >
                <Form.Label>Người đại diện</Form.Label>
                <Form.Control onChange={(event) => {
                    setRepresentative(prevSupply => ({ ...representative, name: event.target.value }))
                    setEmpty({ ...empty, name: true })
                }} value={representative.name} type="text" className='mb-1' placeholder="Tên nhà cung cấp..." />
                {!representative.name.trim() && empty.name && <Form.Text className="text-muted">Missing name</Form.Text>}
            </Form.Group>
            <Form.Group className="mb-3" >
                <Form.Label>Số điện thoại</Form.Label>
                <Form.Control onChange={(event) => {
                    setRepresentative(prevSupply => ({ ...representative, phone: event.target.value }))
                    setEmpty({ ...empty, phone: true })
                }} value={representative.phone} type="number" placeholder="Số điện thoại ..." />
                {!representative.phone.trim() && empty.phone && <Form.Text className="text-muted">Missing phone</Form.Text>}

                <Form.Text className="text-muted">
                </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Vị trí</Form.Label>
                <Form.Control onChange={(event) => {
                    setRepresentative(prevSupply => ({ ...representative, possition: event.target.value }))
                    setEmpty({ ...empty, possition: true })
                }} value={representative.possition} type="text" placeholder="Vị trí ..." />
                {!representative.possition.trim() && empty.possition && <Form.Text className="text-muted">Missing position</Form.Text>}

                <Form.Text className="text-muted">
                </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Hình ảnh</Form.Label>
                <Form.Control id="image-file" type="file" />
                <Form.Text className="text-muted"></Form.Text>
                {!representative.image.trim() && empty.image && <Form.Text className="text-muted">Missing image</Form.Text>}
                <Button variant="light" style={{ marginLeft: "108px", marginTop: "10px" }} onClick={upload}>Upload</Button>
            </Form.Group>
            {isLoadingUpload && <ProgressBar style={{ width: 460, marginLeft: 120 }} animated now={100} />}

            <Button variant="primary" onClick={submit}>
                Tiếp theo
            </Button>
        </Form >
    );
}

export default UpdateRepresentative;