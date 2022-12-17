import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Form } from "react-bootstrap";
import productAPI from "../../api/Product";

TypeItem.propTypes = {
    itemFields: PropTypes.array.isRequired,
    index: PropTypes.number.isRequired,
    OnchangeItem: PropTypes.func,
    OnDeleteClick: PropTypes.func,
};
TypeItem.defaultProps = {
    index: 0,
    itemFields: [],
    OnchangeItem: null,
    OnDeleteClick: null,
};
function TypeItem(props) {
    const [data, setData] = useState({ size: [], color: [] })
    const itemFields = props.itemFields;
    const indexProduct = props.index;
    const onDeleteClick = props.OnDeleteClick;
    const onchangeItem = props.OnchangeItem;
    useEffect(() => {
        const fetchProperties = async () => {
            const properties = await productAPI.getProperties()
            setData(properties)
        }
        fetchProperties()
    }, [])
    return itemFields.map((it, index) => {
        return (
            <div className="type_item" key={index}>
                <div>
                    <label htmlFor="">Size</label>
                    <select
                        name="size"
                        id="size"
                        onChange={(event) => {
                            onchangeItem(event, index, indexProduct);
                        }}
                        value={it.size}
                    >
                        {data.size.map((val, index) => (
                            <option key={index} value={val._id}>{val.name}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label htmlFor="">Color</label>
                    <select
                        name="color"
                        id="color"
                        onChange={(event) => {
                            onchangeItem(event, index, indexProduct);
                        }}
                        value={it.color}
                    >
                        {data.color.map((val, index) => (
                            <option key={index} value={val._id}>{val.name}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label htmlFor="">Amout</label>
                    <input
                        name="number"
                        id="amount"
                        type="number"
                        style={{ width: "100px" }}
                        onChange={(event) => {
                            onchangeItem(event, index, indexProduct);
                        }}
                        value={it.ammount}
                    />
                </div>
                <div>
                    <button
                        onClick={(event) => {
                            event.preventDefault();
                            onDeleteClick(index, indexProduct);
                        }}
                    >
                        Remove
                    </button>
                </div>
            </div>
        );
    });
}

export default TypeItem;
