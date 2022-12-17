import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "./style.scss";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Route, Link, NavLink, useNavigate, json } from "react-router-dom";
import myData from "../Address/Address.json";
import { useLocation } from "react-router-dom";
import UploadAPI from "../../api/Upload";
import supplyAPI from "../../api/Supply";
import { ProgressBar } from "react-bootstrap";
AddSupply.propTypes = {};

function AddSupply(props) {
    const location = useLocation();
    const representative = location.state;
    const [supply, setSupply] = useState({
        name: "",
        phone: "",
        street: "",
        id_commune: "",
        image: "",
    });
    const [empty, setEmpty] = useState({
        name: false,
        phone: false,
        street: false,
        id_commune: false,
        image: false,
    });

    const { communes, districts, provinces } = myData

    const [isLoadingUpload, setIsLoadingUpload] = useState(false);

    const [selectedProvince, setSelectedProvince] = useState(provinces[0]._id.$oid);
    const [selectedDistrict, setSelectedDistrict] = useState(districts[0]._id.$oid);

    const [listDistricts, setListDistricts] = useState(districts);
    const [listCommunes, setListCommunes] = useState(communes);

    /**
     * Rưa xun đi tí núa
     * 
     */
    useEffect(() => {
        const filteredDistricts = districts.filter(
            (value) => value.id_province.$oid === selectedProvince
        );

        setListDistricts(filteredDistricts);
        setSelectedDistrict(filteredDistricts[0]._id.$oid);
    }, [districts, selectedProvince]);

    useEffect(() => {
        const filteredCommnunes = communes.filter(
            (value) => value.id_district.$oid === selectedDistrict
        );

        setListCommunes(filteredCommnunes);

        setSupply((prevSupply) => ({
            ...prevSupply,
            id_commune: filteredCommnunes[0]._id.$oid,
        }));
    }, [communes, selectedDistrict]);


    const navigate = useNavigate();
    const submit = async () => {
        if (
            !supply.name.trim() ||
            !supply.phone.trim() ||
            !supply.image.trim() ||
            !supply.street.trim()
        ) {
            setEmpty({
                name: !supply.name.trim(),
                phone: !supply.phone.trim(),
                street: !supply.street.trim(),
                image: !supply.image.trim(),
            });
            return;
        }
        const objSupply = { supply: supply };
        var answer = window.confirm("Are you sure to insert this Supply?");
        if (answer) {
            const data = { ...representative, ...objSupply };
            await supplyAPI.InsertSupply(data);
            navigate("/supplies/1");
        } else {
            return;
        }
    };
    const upload = async () => {
        let photo = document.getElementById("image-file").files[0];
        let formData = new FormData();

        formData.append("image", photo);
        setIsLoadingUpload(true);
        // const res = await fetch('/api/v1/cms/products/upload-image', { method: "POST", body: formData })
        const res = await UploadAPI.UploadFile(formData);
        setIsLoadingUpload(false);
        setSupply((prevSupply) => ({ ...supply, image: res[0] }));
        setEmpty({ ...empty, image: true });
        // alert('Upload successful')
        // fetch('/upload/image', {method: "POST", body: formData});
    };
    return (
        <Form
            className="form-add"
            style={{ marginTop: "30px", marginBottom: "30px" }}
        >
            <Form.Group className="mb-3">
                <Form.Label>Nhà cung cấp</Form.Label>
                <Form.Control
                    onChange={(event) => {
                        setSupply((prevSupply) => ({
                            ...supply,
                            name: event.target.value,
                        }));
                        setEmpty({ ...empty, name: true });
                    }}
                    value={supply.name}
                    type="text"
                    placeholder="Tên nhà cung cấp ..."
                />
                {!supply.name.trim() && empty.name && (
                    <Form.Text className="text-muted">Missing name</Form.Text>
                )}
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Số điện thoại</Form.Label>
                <Form.Control
                    onChange={(event) => {
                        setSupply((prevSupply) => ({
                            ...supply,
                            phone: event.target.value,
                        }));
                        setEmpty({ ...empty, phone: true });
                    }}
                    value={supply.phone}
                    type="number"
                    placeholder="Số điện thoại ..."
                />
                {!supply.phone.trim() && empty.phone && (
                    <Form.Text className="text-muted">Missing phone</Form.Text>
                )}
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Tỉnh</Form.Label>
                <Form.Select
                    onChange={(event) => {
                        setSelectedProvince(event.target.value);
                    }}
                    value={selectedProvince}
                >
                    {provinces.map((val, key) => (
                        <option value={val._id.$oid} key={key}>
                            {val.name}
                        </option>
                    ))}
                </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Quận</Form.Label>
                <Form.Select
                    onChange={(event) => {
                        setSelectedDistrict(event.target.value);
                    }}
                    value={selectedDistrict}
                >
                    {listDistricts.map((val, key) => (
                        <option value={val._id.$oid} key={key}>
                            {val.name}
                        </option>
                    ))}
                </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Phường</Form.Label>
                <Form.Select
                    onChange={(event) => {
                        setSupply((prevSupply) => ({
                            ...supply,
                            id_commune: event.target.value,
                        }));
                    }}
                    value={supply.commune}
                >
                    {listCommunes.map((val, key) => (
                        <option value={val._id.$oid} key={key}>
                            {val.name}
                        </option>
                    ))}
                </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Địa chỉ</Form.Label>
                <Form.Control
                    onChange={(event) => {
                        setSupply((prevSupply) => ({
                            ...supply,
                            street: event.target.value,
                        }));
                        setEmpty({ ...empty, street: true });
                    }}
                    value={supply.street}
                    type="text"
                    placeholder="Địa chỉ ..."
                />
                {!supply.street.trim() && empty.street && (
                    <Form.Text className="text-muted">Missing street</Form.Text>
                )}
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Hình ảnh</Form.Label>
                <Form.Control id="image-file" type="file" />
                {!supply.image.trim() && empty.image && (
                    <Form.Text className="text-muted">Missing image</Form.Text>
                )}

                <Button
                    variant="light"
                    style={{ marginLeft: "108px", marginTop: "10px" }}
                    onClick={upload}
                >
                    Upload
                </Button>
            </Form.Group>
            {isLoadingUpload && (
                <ProgressBar
                    style={{ width: 460, marginLeft: 200, marginBottom: "30px" }}
                    animated
                    now={100}
                />
            )}
            <Button
                variant="primary"
                onClick={submit}
                style={{ marginRight: "30px" }}
            >
                Quay lại
            </Button>
            <Button variant="primary" onClick={submit}>
                Thêm
            </Button>
        </Form>
    );
}

export default AddSupply;
