import React, { useEffect, useState } from "react";
import { Button, Modal, ModalTitle } from 'react-bootstrap'
import axios from 'axios'

const BlackList = () => {
    const mainColor = 'linear-gradient(180deg, #7D89FF 0%, #AB40FF 66.67%)'
    const [Data, setData] = useState([]);
    const [ViewShow, SetViewShow] = useState(false)
    const handleViewShow = (item) => { 
        SetViewShow(true) 
        setBlackList({...item})
    }
    const hanldeViewClose = () => { SetViewShow(false) }
    //FOr Edit Model
    const [ViewEdit, SetEditShow] = useState(false)
    const handleEditShow = (item) => { 
        SetEditShow(true)
        setBlackList({...item})
    }
    const hanldeEditClose = () => { SetEditShow(false) }

    //FOr Add New Data Model
    const [ViewPost, SetPostShow] = useState(false)
    const handlePostShow = () => { SetPostShow(true) }
    const hanldePostClose = () => { SetPostShow(false) }

    //Define here local state that store the form Data

    //Delivery
    const [id_account, setIdAccount] = useState('')

    const [blackList, setBlackList ]= useState({
        id_account: ''
    })

    console.log(blackList)

    //Id for update record and Delete
    const GetBlackListData = () => {
        //here we will get all employee data
        const url = 'http://localhost:3002/api/v1/cms/blacklist/all'
        axios.get(url)
              .then(response => {
                const result = response?.data;
                const { message, blackList, status } = result;
                if (!status) {
                    alert(message, status)
                }
                else {
                    setData([...blackList])
                }
            })
            .catch(err => {
                console.log(err)
            })
    }
    const handleSubmite = () => {
        const url = 'http://localhost:3002/api/v1/cms/blacklist'
        const BlackList = { id_account }

        // console.log("heee"+name);
        axios.post(url, BlackList)
              .then(response => {
                const result = response?.data;
                const { status, blackList, message } = result;
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

     //handle Delete Function 
     const handleDelete = (id) =>{
        const url = `http://localhost:3002/api/v1/cms/blacklist/${id}`
        axios.delete(url)
            .then(response => {
                const {message} = response.data;
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
        GetBlackListData();
    }, [ViewEdit])
    return (
        <div>
            <div className='row'>
                <div className='mt-5 mb-4'>
                    <button className="btn text-white" style={{background: mainColor}} onClick={() => { handlePostShow() }}>
                        Add New BlackList
                    </button>
                </div>
            </div>
            <div className='row'>
                <div className='table-responsive'>
                    <table className='table table-striped table-hover table-bordered'>
                        <thead>
                            <tr>
                                <th className="text-center">Name Account</th>
                                <th className="text-center">Email</th>
                                <th className="text-center">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Data.map((item) =>
                                <tr key={item._id}>
                                    <td>{item.id_account.name}</td>
                                    <td>{item.id_account.email}</td>
                                    
                                    <td className="d-flex justify-content-center" style={{ minWidth: '100px' }}>
                                        <button className="btn text-white" style={{width: '80px',background: mainColor}} onClick={() => handleDelete(item._id)}>Delete</button>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
            {/* View Modal
            <div className='model-box-view'>
                <Modal
                    show={ViewShow}
                    onHide={hanldeViewClose}
                    backdrop="static"
                    keyboard={false}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>View BlackList Data</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div>
                            <div className='form-group'>
                                <input type="text" className='form-control' value={blackList.id_account} readOnly />
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant='secondary' onClick={hanldeViewClose}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </div> */}
            {/* Modal for submit data to database */}
            <div className='model-box-view'>
                <Modal
                    show={ViewPost}
                    onHide={hanldePostClose}
                    backdrop="static"
                    keyboard={false}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Add new BlackList</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div>
                            <div className='form-group'>
                                <input type="text" className='form-control' value={id_account} onChange={(e) => setIdAccount(e.target.value)} placeholder="Please enter Email Account" />
                            </div>
                            <Button type='submit' className='btn btn-success mt-4' onClick={handleSubmite}>Add BlackList</Button>
                            </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant='secondary' onClick={hanldePostClose}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </div>
          
        </div>
    );
};


export default BlackList