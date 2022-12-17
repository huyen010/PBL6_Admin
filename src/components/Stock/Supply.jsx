import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import "./style.scss";
import supplyAPI from '../../api/Supply';
import { useNavigate } from 'react-router-dom';

Supply.propTypes = {

};

function Supply(props) {
    const navigate = useNavigate();
    const [stock, setStock] = useState({
        'id_supply': '',
        'status': 'true',
        'dateReceive': ''
    })
    const [supplies, setSupplies] = useState([]);
    useEffect(() => {
        const fetchSupplies = async () => {
            const listSupply = await supplyAPI.getALL();
            setSupplies(listSupply.supplies);
            let cloneStock = { ...stock }
            cloneStock.id_supply = listSupply.supplies[0]._id
            console.log(cloneStock)
            setStock(cloneStock)
        }
        fetchSupplies();
    }, [])
    const handleClickRadio = (event) => {
        setStock({ ...stock, status: event.target.value })
    }
    const handleClickButton = (event) => {
        event.preventDefault();
        navigate("/stock/list-product", {
            state: { stock: stock },
        });
    }
    const handleDateChange = (event) => {
        setStock({ ...stock, dateReceive: event.target.value })
    }
    const handleSupplyChange = (event) => {
        setStock({ ...stock, id_supply: event.target.value })
    }
    return (
        <form action="" className="form">
            <div>
                <label htmlFor="">Supply</label>
                <select name="id_supply" id="id_supply" onChange={handleSupplyChange} value={stock.id_supply}>
                    {supplies.map((val, key) => (
                        <option value={val._id} key={key}>{val.name}</option>
                    ))}
                </select>
            </div>
            <div>
                <label htmlFor="">Receive Day</label>
                <input className="input" name="dateReceive" type="date" onChange={handleDateChange} value={stock.dateReceive} />
            </div>
            <div>
                <label htmlFor="">Status</label>
                <input type="radio" onClick={handleClickRadio} value="true" name="status" />
                <label htmlFor="">Paid</label>
                <input type="radio" onClick={handleClickRadio} value="false" name="status" />
                <label htmlFor="">Unpaid</label>
            </div>
            <div>
                <Button onClick={handleClickButton}>Submit</Button>
            </div>
        </form>
    );
}

export default Supply;