import React, { useEffect, useState } from "react";
import { Button, Modal, ModalTitle } from 'react-bootstrap'
import axios from 'axios'
import AddDiscount from "./AddDiscount";

const Promotion = () => {
    const mainColor = 'linear-gradient(180deg, #7D89FF 0%, #AB40FF 66.67%)'
    const [Data, setData] = useState([]);
    const [ViewShow, SetViewShow] = useState(false)
    const handleViewShow = (item) => { 
        SetViewShow(true) 
        setDiscount({...item})
    }
    const hanldeViewClose = () => { SetViewShow(false) }
    //FOr Edit Model
    const [ViewEdit, SetEditShow] = useState(false)
    const handleEditShow = (item) => { 
        SetEditShow(true)
        setDiscount({...item})
    }
    const hanldeEditClose = () => { SetEditShow(false) }
    //FOr Add New Data Model
    const [ViewPost, SetPostShow] = useState(false)
    const handlePostShow = () => { SetPostShow(true) }
    const hanldePostClose = () => { SetPostShow(false) }

    //Define here local state that store the form Data

    //discount
    const [id_product, setIdProduct] = useState([])
    const [percent, setPercent] = useState('')
    const [date_create, setDateCreate] = useState('')
    const [status, setStatus] = useState(false)
    const [time, setTime] = useState('')

    const [discount, setDiscount ]= useState({
      id_product: [], 
      percent: '',
      date_create: '',
      status: '',
      time: ''
    })

    console.log(discount)

    //Id for update record and Delete
    const GetDiscountData = () => {
        //here we will get all employee data
        const url = 'http://localhost:3002/api/v1/cms/discounts'
        axios.get(url)
            .then(response => {
                const result = response?.data;
                const { status, discount, message } = result;
                if (!status) {
                    alert(message, status)
                }
                else {
                    setData([...discount])
                }
            })
            .catch(err => {
                console.log(err)
            })
    }
   
    const handleSubmite = () => {
        const url = 'http://localhost:3002/api/v1/cms/discounts'
        const Discount = { id_product, percent, date_create, status, time }
        axios.post(url, Discount)
            .then(response => {
                const result = response?.data;
                const { status, discount, message } = result;
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
        const{percent, value} = e.target
        setDiscount({...discount, [percent]: value})
    }

    const handleEdit = () =>{
        const url = `http://localhost:3002/api/v1/cms/discounts/${discount._id}`
        
        const Discount = { id_product: discount.id_product, percent: discount.percent, status: discount.status, date_create: discount.date_create, time: discount.time}
        console.log('edit', Discount)
        axios.put(url, Discount)
            .then(response => {
                const result = response?.data;
                const { status, discount, message } = result;
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
        GetDiscountData();
    }, [ViewEdit])
    return (
        <div>
            <div className='row'>
                <div className='mt-5 mb-4'>
                    <button className="btn text-white" style={{background: mainColor}} onClick={() => { handlePostShow() }}>
                        Add New Discount
                    </button>
                </div>
            </div>
            <div className='row'>
                <div className='table-responsive'>
                    <table className='table table-striped table-hover table-bordered'>
                        <thead>
                            <tr>
                                <th className="text-center">Date create</th>
                                <th className="text-center">Time</th>
                                <th className="text-center">Percent</th>
                                <th className="text-center">Status</th>
                                <th className="text-center">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Data.map((item) =>
                                <tr key={item._id}>
                                    <td>{item.date_create}</td>
                                    <td>{item.time}</td>
                                    <td>{item.percent}</td>
                                    <td>{item.status?'Use':'Unuse'}</td>
                                    
                                    <td className="d-flex justify-content-center" style={{ minWidth: '100px' }}>
                                        <button className="btn text-white me-3" style={{width: '60px', background: mainColor}} onClick={() => handleViewShow(item) }>View</button>
                                        <button className="btn text-white" style={{width: '60px',background: mainColor}} onClick={()=> handleEditShow(item)}>Edit</button>
                                        <AddDiscount id={item._id}/>
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
                        <Modal.Title>View Discount Data</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div>
                        {/* id_product, percent, date_create, status, time */}
                            <div className='form-group'>
                                <label>Percent:</label>
                                <input type="text" className='form-control' value={discount.percent} readOnly />
                            </div>
                            <div className='form-group mt-3'>
                                <label>Date create:</label>
                                <input type="text" className='form-control' value={discount.date_create} readOnly />
                            </div>
                            <div className='form-group mt-3'>
                                <label>Time:</label>
                                <input type="date" className='form-control' value={discount.time} readOnly />
                            </div>
                            <div className='form-group mt-3'>
                                <label>Status:</label>
                                <input type="text" className='form-control' value={discount.status?"Use":"Unuse"} readOnly />
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
                        <Modal.Title>Add new Discount</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div>
                            <div className='form-group'>
                                <input type="text" className='form-control' value={percent} onChange={(e) => setPercent(e.target.value)} placeholder="Please enter Percent" />
                            </div>
                            <div className='form-group mt-3'>
                                <input type="date" className='form-control' value={date_create} onChange={(e) => setDateCreate(e.target.value)} placeholder="Please enter Time" />
                            </div>
                            <div className='form-group mt-3'>
                                <input type="t" className='form-control' value={time} onChange={(e) => setTime(e.target.value)} placeholder="Please enter Time" />
                            </div>
                            <div className='form-group mt-3'>
                                {/* <input type="text" className='form-control' value={status} onChange={(e) => setStatus(e.target.value)} placeholder="Please enter status" /> */}
                                <select onChange={(e) => setStatus(e.target.value)} value={status} className="form-select">
                                    <option value='true'>Use</option>
                                    <option value='false'>Unuse</option>
                                </select>
                            </div>
                            
                            <Button type='submit' className='btn btn-success mt-4' onClick={handleSubmite}>Add Discount</Button>
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
                        <Modal.Title>Edit Discount</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div>
                            <div className='form-group'>
                                <label>Percent</label>
                                <input type="text" className='form-control' onChange={(e) => handleOnChange(e) } name='percent' placeholder="Please enter Percent" value={discount.percent}/>
                            </div>
                            <div className='form-group mt-3'>
                                <label>Date Create</label>
                                <input type="text" className='form-control' onChange={(e) => handleOnChange(e) } name='date_create' placeholder="Please enter Date create" value={discount.date_create} />
                            </div>
                            <div className='form-group mt-3'>
                                <label>Time</label>
                                <input type="date" className='form-control' onChange={(e) => handleOnChange(e) } name='time' placeholder="Please enter time" value={discount.time}/>
                            </div>
                            <div className='form-group mt-3'>
                                <label>Status</label>
                                {/* <input type="text" className='form-control' onChange={(e) => handleOnChange(e) } name='status' placeholder="Please enter Status" value={discount.status}/> */}
                                <select value={discount.status} onChange={(e) => handleOnChange(e) } name='status' className="form-select">
                                    <option value='false'>Use</option>
                                    <option value='true'>Unuse</option>
                                </select>
                            </div>
                            
                            <Button type='submit' className='btn btn-warning mt-4' onClick={handleEdit}>Edit Discount</Button>
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

export default Promotion;