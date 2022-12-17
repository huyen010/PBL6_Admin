import React, { useEffect, useState } from "react";
import { Button, Modal, ModalTitle } from 'react-bootstrap'
import axios from 'axios'

const Staff = () => {
    const mainColor = 'linear-gradient(180deg, #7D89FF 0%, #AB40FF 66.67%)'
    const [Data, setData] = useState([]);
    const [ViewShow, SetViewShow] = useState(false)
    const handleViewShow = (item) => { 
        SetViewShow(true) 
        setStaff({...item})
    }
    const hanldeViewClose = () => { SetViewShow(false) }
    //FOr Edit Model
    const [ViewEdit, SetEditShow] = useState(false)
    const handleEditShow = (item) => { 
        SetEditShow(true)
        setStaff({...item})
    }
    const hanldeEditClose = () => { SetEditShow(false) }
    //FOr Add New Data Model
    const [ViewPost, SetPostShow] = useState(false)
    const handlePostShow = () => { SetPostShow(true) }
    const hanldePostClose = () => { SetPostShow(false) }

    //Define here local state that store the form Data

    //Delivery
    const [fullname, setFullname] = useState('')
    const [phone, setPhone] = useState('')
    const [gender, setGender] = useState('')
    const [urlImage, setUrlImage] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [staff, setStaff]= useState({
        fullname: '', 
        phone: '',
        gender:false,
        urlImage:'',
        email:'',
        password:''
    })

    console.log(staff)

    //Id for update record and Delete
    const GetStaffData = () => {
        //here we will get all employee data
        const url = 'http://localhost:3002/api/v1/cms/staff'
        axios.get(url)
            .then(response => {
                const result = response?.data;
                const { status, staff, message } = result;
                if (!status) {
                    alert(message, status)
                }
                else {
                    setData([...staff])
                }
            })
            .catch(err => {
                console.log(err)
            })
    }
    const handleSubmite = () => {
        const url = 'http://localhost:3002/api/v1/cms/staff'
        const Staff = { fullname, phone, gender, urlImage,email,password }
        axios.post(url, Staff)
            .then(response => {
                const result = response?.data;
                const { status, staff, message } = result;
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
        setStaff({...staff, [name]: value})
    }

    const handleEdit = () =>{
        const url = `http://localhost:3002/api/v1/cms/staff/${staff._id}`
        const Staff = { fullname: staff.fullname, phone: staff.phone, gender: staff.gender, status: staff.status, urlImage: staff.urlImage}
        console.log('edit', Staff)
        axios.put(url, Staff)
            .then(response => {
                const result = response?.data;
                const { status, staff, message } = result;
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
        GetStaffData();
    }, [ViewEdit])
    return (
        <div>
            <div className='row'>
                <div className='mt-5 mb-4'>
                    <button className="btn text-white" style={{background: mainColor}} onClick={() => { handlePostShow() }}>
                        Add New Staff
                    </button>
                </div>
            </div>
            <div className='row'>
                <div className='table-responsive'>
                    <table className='table table-striped table-hover table-bordered'>
                        <thead>
                            <tr>
                                <th className="text-center">Fullname</th>
                                <th className="text-center">Phone</th>
                                <th className="text-center">Gender</th>
                                <th className="text-center">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Data.map((item) =>
                                <tr key={item._id}>
                                    <td>{item.fullname}</td>
                                    <td>{item.phone}</td>
                                    <td>{item.gender?'Female':'Male'}</td>
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
                        <Modal.Title>View Staff Data</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div>
                            <div className='form-group'>
                                <label>Fullname:</label>
                                <input type="text" className='form-control' value={staff.fullname} readOnly />
                            </div>
                            <div className='form-group mt-3'>
                                <label>Phone:</label>
                                <input type="text" className='form-control' value={staff.phone} readOnly />
                            </div>
                            <div className='form-group mt-3'>
                                <label>Gender:</label>
                                <input type="text" className='form-control' value={staff.gender?'Female':'Male'} readOnly />
                            </div>
                            <div className='form-group mt-3'>
                                <label>Status:</label>
                                <input type="text" className='form-control' value={staff.status?'Doing':'Done'} readOnly />
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
                        <Modal.Title>Add new Staff</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div>
                            <div className='form-group'>
                                <input type="text" className='form-control' value={fullname} onChange={(e) => setFullname(e.target.value)} placeholder="Please enter fullname" />
                            </div>
                            <div className='form-group mt-3'>
                                <input type="text" className='form-control' value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Please enter phone" />
                            </div>
                            <div className='form-group mt-3'>
                                <select onChange={(e) => setGender(e.target.value)} value={gender} className="form-select">
                                    <option value='false'>Female</option>
                                    <option value='true'>Male</option>
                                </select>
                                {/* <input type="text" className='form-control' value={gender} onChange={(e) => setGender(e.target.value)} placeholder="Please enter gender" /> */}
                            </div>
                            <div className='form-group mt-3'>
                                <input type="text" className='form-control' value={urlImage} onChange={(e) => setUrlImage(e.target.value)} placeholder="Please enter urlImage" />
                            </div>
                            <div className='form-group mt-3'>
                                <input type="text" className='form-control' value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Please enter email" />
                            </div>
                            <div className='form-group mt-3'>
                                <input type="text" className='form-control' value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Please enter password" />
                            </div>
                            <Button type='submit' className='btn btn-success mt-4' onClick={handleSubmite}>Add Staff</Button>
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
                        <Modal.Title>Edit Staff</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div>
                            <div className='form-group'>
                                <label>Fullname</label>
                                <input type="text" className='form-control' onChange={(e) => handleOnChange(e) } name='fullname' placeholder="Please enter fullname" value={staff.fullname}/>
                            </div>
                            <div className='form-group mt-3'>
                                <label>Phone</label>
                                <input type="text" className='form-control' onChange={(e) => handleOnChange(e) } name='phone' placeholder="Please enter phone" value={staff.phone} />
                            </div>
                            <div className='form-group mt-3'>
                                <label>Gender</label>
                                <select value={staff.gender} onChange={(e) => handleOnChange(e) } name='gender' className="form-select">
                                    <option value='false'>Female</option>
                                    <option value='true'>Male</option>
                                </select>
                                {/* <input type="text" className='form-control' onChange={(e) => handleOnChange(e) } name='gender' placeholder="Please enter gender" value={staff.gender}/> */}
                            </div>
                            <div className='form-group mt-3'>
                                <label>Status</label>
                                <select value={staff.status} onChange={(e) => handleOnChange(e) } name='status' className="form-select">
                                    <option value='false'>Done</option>
                                    <option value='true'>Doing</option>
                                </select>
                                {/* <input type="text" className='form-control' onChange={(e) => handleOnChange(e) } name='gender' placeholder="Please enter gender" value={staff.gender}/> */}
                            </div>
                            <div className='form-group mt-3'>
                                <label>UrlImane</label>
                                <input type="text" className='form-control' onChange={(e) => handleOnChange(e) } name='urlImage' placeholder="Please enter urlImage" value={staff.urlImage}/>
                            </div>
                            <Button type='submit' className='btn btn-warning mt-4' onClick={handleEdit}>Edit Staff</Button>
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



export default Staff;


//Chừ TM làm chi tiếp đây
// chwof tí
//comment vs tạo mấy cái tên khác đi hồi coi có t đổi tên đc ko 