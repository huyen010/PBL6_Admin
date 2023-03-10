import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './style.scss'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Route, Link, NavLink, useNavigate, json, useParams } from 'react-router-dom'
import AddressAPI from '../../api/Address.js';
import { useLocation } from 'react-router-dom';
import UploadAPI from '../../api/Upload';
import supplyAPI from '../../api/Supply';
import myData from '../Address/Address.json';

UpdateSupply.propTypes = {
};

function UpdateSupply(props) {
    const location = useLocation();
    const representative = location.state;
    const { ids, idre } = useParams();
    const [supply, setSupply] = useState({
        name: '',
        phone: '',
        street: '',
        id_commune: '',
        id_district: '',
        id_province: '',
        image: ''
    });
    console.log(supply);
    const { communes, districts, provinces } = myData

    const [isLoadingUpload, setIsLoadingUpload] = useState(false);

    const [selectedProvince, setSelectedProvince] = useState(provinces[0]._id.$oid);
    const [selectedDistrict, setSelectedDistrict] = useState(districts[0]._id.$oid);

    const [listDistricts, setListDistricts] = useState(districts);
    const [listCommunes, setListCommunes] = useState(communes);
    useEffect(() => {
        const fetchSupply = async () => {
            const result = await supplyAPI.GetSupply(ids);
            setSupply({
                name: result.supply.name, phone: result.supply.phone, street: result.supply.street,
                id_commune: result.supply.id_commune._id, id_district: result.supply.id_commune.id_district._id,
                id_province: result.supply.id_commune.id_district.id_province._id,
                image: result.supply.image
            })
            setSelectedProvince(result.supply.id_commune.id_district.id_province._id)
        }
        fetchSupply();
    }, [])
    useEffect(() => {
        const filteredDistricts = districts.filter(
            (value) => value.id_province.$oid === selectedProvince
        );

        setListDistricts(filteredDistricts);
        setSelectedDistrict(supply.id_district);
    }, [districts, selectedProvince, supply.id_district]);

    useEffect(() => {
        const filteredCommnunes = communes.filter(
            (value) => value.id_district.$oid === selectedDistrict
        );
        setListCommunes(filteredCommnunes);

        // setSupply((prevSupply) => ({
        //     ...prevSupply,
        //     id_commune: filteredCommnunes[0]._id.$oid,
        // }));
    }, [communes, selectedDistrict]);
    const [empty, setEmpty] = useState({
        name: false,
        phone: false,
        street: false,
        id_commune: false,
        image: false
    })
    const navigate = useNavigate();
    const submit = async () => {
        if (!supply.name.trim() || !supply.phone.trim()
            || !supply.image.trim() || !supply.street.trim()) {
            setEmpty({
                name: !supply.name.trim(), phone: !supply.phone.trim(),
                street: !supply.street.trim(), image: !supply.image.trim()
            })
            return;
        }
        const objSupply = { supply: supply }
        var answer = window.confirm("Are you sure to update this Supply?");
        if (answer) {
            const data = { ...representative, ...objSupply };
            await supplyAPI.UpdateSupply(ids, data);
            navigate("/supplies/1");
        }
        else {
            return;
        }
    }
    const upload = async () => {
        let photo = document.getElementById("image-file").files[0];
        let formData = new FormData();

        formData.append("image", photo);
        setIsLoadingUpload(true)
        // const res = await fetch('/api/v1/cms/products/upload-image', { method: "POST", body: formData })
        const res = await UploadAPI.UploadFile(formData);
        setIsLoadingUpload(false)
        setSupply(prevSupply => ({ ...supply, image: res[0] }))
        setEmpty({ ...empty, image: true })
        // alert('Upload successful')
        // fetch('/upload/image', {method: "POST", body: formData});
    }
    return (
        <Form className='form-add' style={{ marginTop: "30px", marginBottom: "30px" }} >
            <Form.Group className="mb-3" >
                <Form.Label>Nh?? cung c???p</Form.Label>
                <Form.Control onChange={(event) => {
                    setSupply(prevSupply => ({ ...supply, name: event.target.value }))
                    setEmpty({ ...empty, name: true })
                }} value={supply.name} type="text" placeholder="T??n nh?? cung c???p ..." />
                {!supply.name.trim() && empty.name && <Form.Text className="text-muted">Missing name</Form.Text>}
            </Form.Group>
            <Form.Group className="mb-3" >
                <Form.Label>S??? ??i???n tho???i</Form.Label>
                <Form.Control onChange={(event) => {
                    setSupply(prevSupply => ({ ...supply, phone: event.target.value }))
                    setEmpty({ ...empty, phone: true })
                }} value={supply.phone} type="number" placeholder="S??? ??i???n tho???i ..." />
                {!supply.phone.trim() && empty.phone && <Form.Text className="text-muted">Missing phone</Form.Text>}

            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>T???nh</Form.Label>
                <Form.Select onChange={(event) => {
                    setSelectedProvince(event.target.value)
                }} value={selectedProvince} >
                    {provinces.map((val, key) => (
                        <option value={val._id.$oid} key={key}>{val.name}</option>
                    ))}
                </Form.Select>

            </Form.Group>
            <Form.Group className="mb-3" >
                <Form.Label>Qu???n</Form.Label>
                <Form.Select onChange={(event) => {
                    setSelectedDistrict(event.target.value)
                }} value={selectedDistrict} >
                    {listDistricts.map((val, key) => (
                        <option value={val._id.$oid} key={key}>{val.name}</option>
                    ))}
                </Form.Select>

            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Ph?????ng</Form.Label>
                <Form.Select onChange={(event) => {
                    setSupply(prevSupply => ({ ...supply, id_commune: event.target.value }))
                }} value={supply.commune} >
                    {listCommunes.map((val, key) => (
                        <option value={val._id.$oid} key={key}>{val.name}</option>
                    ))}
                </Form.Select>

            </Form.Group>
            <Form.Group className="mb-3" >
                <Form.Label>?????a ch???</Form.Label>
                <Form.Control onChange={(event) => {
                    setSupply(prevSupply => ({ ...supply, street: event.target.value }))
                    setEmpty({ ...empty, street: true })
                }} value={supply.street} type="text" placeholder="?????a ch??? ..." />
                {!supply.street.trim() && empty.street && <Form.Text className="text-muted">Missing street</Form.Text>}

            </Form.Group>
            <Form.Group className="mb-3" >
                <Form.Label>H??nh ???nh</Form.Label>
                <Form.Control id="image-file" type="file" />
                {!supply.image.trim() && empty.image && <Form.Text className="text-muted">Missing image</Form.Text>}

                <Button variant="light" style={{ marginLeft: "108px", marginTop: "10px" }} onClick={upload}>Upload</Button>
            </Form.Group>
            <Button variant="primary" onClick={submit} style={{ marginRight: "30px" }}>
                Quay l???i
            </Button>
            <Button variant="primary" onClick={submit}>
                C???p nh???t
            </Button>
        </Form >
    );
}

export default UpdateSupply;