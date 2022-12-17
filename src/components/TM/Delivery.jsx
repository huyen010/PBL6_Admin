import React, { useEffect, useState } from "react";
import { Button, Modal, ModalTitle } from 'react-bootstrap'
import axios from 'axios'

const Delivery = () => {
    const mainColor = 'linear-gradient(180deg, #7D89FF 0%, #AB40FF 66.67%)'
    const [Data, setData] = useState([]);
    const [ViewShow, SetViewShow] = useState(false)
    const handleViewShow = (item) => { 
        SetViewShow(true) 
        setDelivery({...item})
    }
    const hanldeViewClose = () => { SetViewShow(false) }
    //FOr Edit Model
    const [ViewEdit, SetEditShow] = useState(false)
    const handleEditShow = (item) => { 
        SetEditShow(true)
        setDelivery({...item})
    }
    const hanldeEditClose = () => { SetEditShow(false) }
    //FOr Add New Data Model
    const [ViewPost, SetPostShow] = useState(false)
    const handlePostShow = () => { SetPostShow(true) }
    const hanldePostClose = () => { SetPostShow(false) }

    //Define here local state that store the form Data

    //Delivery
    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [status, setStatus] = useState(false)
    const [note, setNote] = useState('')

    const [delivery, setDelivery ]= useState({
        name: '', 
        price: '',
        status: false,
        note: ''
    })

    console.log(delivery)

    //Id for update record and Delete
    const GetEmployeeData = () => {
        //here we will get all employee data
        const url = 'http://localhost:3002/api/v1/cms/deliveries/all'
        axios.get(url)
            .then(response => {
                const result = response?.data;
                const { message, delivery, status } = result;
                if (!status) {
                    alert(message, status)
                }
                else {
                    setData([...delivery])
                }
            })
            .catch(err => {
                console.log(err)
            })
    }
    const handleSubmite = () => {
        const url = 'http://localhost:3002/api/v1/cms/deliveries'
        const Delivery = { name, price, status, note }
        axios.post(url, Delivery)
            .then(response => {
                const result = response?.data;
                const { status, delivery, message } = result;
                if (!status) {
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

    const handleOnChange = (e) =>{
        const{name, value} = e.target
        setDelivery({...delivery, [name]: value})
    }

    const handleEdit = () =>{
        const url = `http://localhost:3002/api/v1/cms/deliveries/${delivery._id}`
        const Delivery = { name: delivery.name, price: delivery.price, status: delivery.status, note: delivery.note}
        console.log('edit', Delivery)
        axios.put(url, Delivery)
            .then(response => {
                const result = response?.data;
                const { status, delivery, message } = result;
                if (!status) {
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

    //call this function in useEffect
    useEffect(() => {
        GetEmployeeData();
    }, [ViewEdit])
    return (
        <div>
            <div className='row'>
                <div className='mt-5 mb-4'>
                    <button className="btn text-white" style={{background: mainColor}} onClick={() => { handlePostShow() }}>
                        Add New Delivery
                    </button>
                </div>
            </div>
            <div className='row'>
                <div className='table-responsive'>
                    <table className='table table-striped table-hover table-bordered'>
                        <thead>
                            <tr>
                                <th className="text-center">Name</th>
                                <th className="text-center">Price</th>
                                <th className="text-center">Status</th>
                                <th className="text-center">Note</th>
                                <th className="text-center">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Data.map((item) =>
                                <tr key={item._id}>
                                    <td>{item.name}</td>
                                    <td>{item.price}</td>
                                    <td>{item.status?'Unuse':'Use'}</td>
                                    <td>{item.note}</td>
                                    <td className="d-flex justify-content-center" style={{ minWidth: '100px' }}>
                                        <button className="btn text-white me-3" style={{width: '60px', background: mainColor}} onClick={() => handleViewShow(item) }>View</button>
                                        <button className="btn text-white" style={{width: '60px',background: mainColor}} onClick={()=> handleEditShow(item)}>Edit</button>
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
                        <Modal.Title>View Delivery Data</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div>
                            <div className='form-group'>
                                <label>Name:</label>
                                <input type="text" className='form-control' value={delivery.name} readOnly />
                            </div>
                            <div className='form-group mt-3'>
                                <label>Price:</label>
                                <input type="text" className='form-control' value={delivery.price} readOnly />
                            </div>
                            <div className='form-group mt-3'>
                                <label>Status:</label>
                                <input type="text" className='form-control' value={delivery.status?"Unuse":"Use"} readOnly />
                            </div>
                            <div className='form-group mt-3'>
                                <label>Note:</label>
                                <input type="text" className='form-control' value={delivery.note} readOnly />
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
                        <Modal.Title>Add new Delivery</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div>
                            <div className='form-group'>
                                <input type="text" className='form-control' value={name} onChange={(e) => setName(e.target.value)} placeholder="Please enter Name" />
                            </div>
                            <div className='form-group mt-3'>
                                <input type="text" className='form-control' value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Please enter price" />
                            </div>
                            <div className='form-group mt-3'>
                                {/* <input type="text" className='form-control' value={status} onChange={(e) => setStatus(e.target.value)} placeholder="Please enter status" /> */}
                                <select onChange={(e) => setStatus(e.target.value)} value={status} className="form-select">
                                    <option value='false'>Use</option>
                                    <option value='true'>Unuse</option>
                                </select>
                            </div>
                            <div className='form-group mt-3'>
                                <input type="text" className='form-control' value={note} onChange={(e) => setNote(e.target.value)} placeholder="Please enter note" />
                            </div>
                            <Button type='submit' className='btn btn-success mt-4' onClick={handleSubmite}>Add Delivery</Button>
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
                        <Modal.Title>Edit Delivery</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div>
                            <div className='form-group'>
                                <label>Name</label>
                                <input type="text" className='form-control' onChange={(e) => handleOnChange(e) } name='name' placeholder="Please enter Name" value={delivery.name}/>
                            </div>
                            <div className='form-group mt-3'>
                                <label>Price</label>
                                <input type="text" className='form-control' onChange={(e) => handleOnChange(e) } name='price' placeholder="Please enter Price" value={delivery.price} />
                            </div>
                            <div className='form-group mt-3'>
                                <label>Status</label>
                                {/* <input type="text" className='form-control' onChange={(e) => handleOnChange(e) } name='status' placeholder="Please enter Status" value={delivery.status}/> */}
                                <select value={delivery.status} onChange={(e) => handleOnChange(e) } name='status' className="form-select">
                                    <option value='false'>Use</option>
                                    <option value='true'>Unuse</option>
                                </select>
                            </div>
                            <div className='form-group mt-3'>
                                <label>Note</label>
                                <input type="text" className='form-control' onChange={(e) => handleOnChange(e) } name='note' placeholder="Please enter Note" value={delivery.note}/>
                            </div>
                            <Button type='submit' className='btn btn-warning mt-4' onClick={handleEdit}>Edit Employee</Button>
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

export default Delivery;