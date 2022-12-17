import React, { useEffect, useState } from "react";
import { Button, Modal, ModalTitle } from 'react-bootstrap'
import axios from 'axios'

const AddDiscount = (props) => {
    const [addDiscountShow, SetAddDiscountShow] = useState(false)
    const handleShow = () => { SetAddDiscountShow(true) }
    const hanldeClose = () => { SetAddDiscountShow(false) }

    

    return (
        <div>
            <button className="btn btn-primary" onClick={handleShow}>Add Discount</button>
            <div className='model-box-view'>
                <Modal
                    show={addDiscountShow}
                    onHide={hanldeClose}
                    backdrop="static"
                    keyboard={false}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Edit Discount</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div>
                            <p>Hello</p>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant='secondary' onClick={hanldeClose}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </div>
    )
}

export default AddDiscount