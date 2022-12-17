import React, { useEffect, useState } from "react";
import { Button, Modal, ModalTitle } from 'react-bootstrap'
import axios from 'axios'

const Categogy = () => {
    const mainColor = 'linear-gradient(180deg, #7D89FF 0%, #AB40FF 66.67%)'
    const [Data, setData] = useState([]);
    const [ViewShow, SetViewShow] = useState(false)
    const handleViewShow = (item) => {
        SetViewShow(true)
        setCategory({ ...item })
    }
    const hanldeViewClose = () => { SetViewShow(false) }
    //FOr Edit Model
    const [ViewEdit, SetEditShow] = useState(false)
    const handleEditShow = (item) => {
        SetEditShow(true)
        setCategory({ ...item })
    }
    const hanldeEditClose = () => { SetEditShow(false) }

    //FOr Add New Data Model
    const [ViewPost, SetPostShow] = useState(false)
    const handlePostShow = () => { SetPostShow(true) }
    const hanldePostClose = () => { SetPostShow(false) }

    //Define here local state that store the form Data

    //Delivery
    const [name, setName] = useState('')

    const [category, setCategory] = useState({
        name: ''
    })

    console.log(category)

    //Id for update record and Delete
    const GetCategoryData = () => {
        //here we will get all employee data
        const url = 'http://localhost:3002/api/v1/cms/categories/all'
        axios.get(url)
            .then(response => {
                const result = response?.data;
                setData([...result]);
            })
            .catch(err => {
                console.log(err)
            })
    }
    const handleSubmite = () => {
        const url = 'http://localhost:3002/api/v1/cms/categories/insert'
        const Category = { name }

        // console.log("heee"+name);
        axios.post(url, Category)
            .then(response => {
                const result = response?.data;
                // const {message , category, status } = result;
                var message = "success";
                var status = "true";
                if (!result) {
                    alert(message, status)
                }
                else {
                    window.location.reload()
                }
            })
            .catch(err => {
                console.log(err)
            })
    }

    const handleOnChange = (e) => {
        const { name, value } = e.target
        setCategory({ ...category, [name]: value })
    }

    const handleEdit = () => {
        const url = `http://localhost:3002/api/v1/cms/categories/update/${category.slug}`
        const Category = { name: category.name }
        console.log('edit', Category)
        axios.put(url, Category)
            .then(response => {
                const result = response?.data;
                // const {message , category, status } = result;
                var message = "success";
                var status = "true";
                if (!result) {
                    alert(message, status)
                }
                else {
                    SetEditShow(false)
                }
            })
            .catch(err => {
                console.log(err)
            })
    }

    //handle Delete Function 
    const handleDelete = (id) => {
        const url = `http://localhost:3002/api/v1/cms/categories/delete/${id}`
        axios.delete(url)
            .then(response => {
                const { message } = response.data;
                console.log(message);
                if (message !== 'Success') {
                    alert(message)
                }
                else {
                    alert(message)
                    window.location.reload()
                }
            })
            .catch(err => {
                console.log(err)
            })
    }

    //call this function in useEffect
    useEffect(() => {
        GetCategoryData();
    }, [ViewEdit])
    return (
        <div>
            <div className='row'>
                <div className='mt-5 mb-4'>
                    <button className="btn text-white" style={{ background: mainColor }} onClick={() => { handlePostShow() }}>
                        Add New Category
                    </button>
                </div>
            </div>
            <div className='row'>
                <div className='table-responsive'>
                    <table className='table table-striped table-hover table-bordered'>
                        <thead>
                            <tr>
                                <th className="text-center">Name</th>
                                <th className="text-center">Slug</th>
                                <th className="text-center">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Data.map((item) =>
                                <tr key={item._id}>
                                    <td>{item.name}</td>
                                    <td>{item.slug}</td>

                                    <td className="d-flex justify-content-center" style={{ minWidth: '100px' }}>
                                        <button className="btn text-white me-3" style={{ width: '60px', background: mainColor }} onClick={() => handleEditShow(item)}>Edit</button>
                                        <button className="btn text-white" style={{ width: '80px', background: mainColor }} onClick={() => handleDelete(item._id)}>Delete</button>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
            {/* View Modal */}
            <div className='model-box-view'>
                <Modal
                    show={ViewShow}
                    onHide={hanldeViewClose}
                    backdrop="static"
                    keyboard={false}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>View Category Data</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div>
                            <div className='form-group'>
                                <input type="text" className='form-control' value={category.name} readOnly />
                            </div>
                            <div className='form-group mt-3'>
                                <input type="text" className='form-control' value={category.slug} readOnly />
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant='secondary' onClick={hanldeViewClose}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </div>
            {/* Modal for submit data to database */}
            <div className='model-box-view'>
                <Modal
                    show={ViewPost}
                    onHide={hanldePostClose}
                    backdrop="static"
                    keyboard={false}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Add new Category</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div>
                            <div className='form-group'>
                                <input type="text" className='form-control' value={name} onChange={(e) => setName(e.target.value)} placeholder="Please enter Name" />
                            </div>
                            <Button type='submit' className='btn btn-success mt-4' onClick={handleSubmite}>Add Category</Button>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant='secondary' onClick={hanldePostClose}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </div>
            {/* Modal for Edit employee record */}
            <div className='model-box-view'>
                <Modal
                    show={ViewEdit}
                    onHide={hanldeEditClose}
                    backdrop="static"
                    keyboard={false}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Edit Category</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div>
                            <div className='form-group'>
                                <label>name</label>
                                <input type="text" className='form-control' onChange={(e) => handleOnChange(e)} name='name' placeholder="Please enter name" value={category.name} />
                            </div>
                            <Button type='submit' className='btn btn-warning mt-4' onClick={handleEdit}>Edit Category</Button>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant='secondary' onClick={hanldeEditClose}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </div>
    );
};

export default Categogy;