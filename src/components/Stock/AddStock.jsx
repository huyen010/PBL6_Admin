import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import ProductItem from "./ProductItem";
import "./style.scss";
import { Button } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import stockAPI from "../../api/Stock";
import supplyAPI from "../../api/Supply";
AddStock.propTypes = {};

function AddStock(props) {
    const location = useLocation();
    const navigate = useNavigate();
    const stock = location.state.stock;
    const [listProduct, setListProduct] = useState([])
    const [name, setName] = useState('')
    const [productFields, setProductFields] = useState([
        {
            id_product: "",
            receive: [{ color: "63500315c91b810653035912", size: "63500189c91b81065303590a", number: 0 }],
            price: "0",
        },
    ]);
    useEffect(() => {
        const fetchProducts = async () => {
            const listP = await supplyAPI.getListProduct(stock.id_supply)
            let cloneProduct = [...productFields]
            console.log(listP.product[0]._id)
            cloneProduct[0].id_product = listP.product[0]._id
            setProductFields(cloneProduct)
            setListProduct(listP.product)
            setName('SUPPLY: ' + listP.name)
        }
        fetchProducts()
    }, [stock.id_supply])
    // const handleProductChange = () => {
    //     let newProductFields = [...productFields];
    //     newProductFields[index][event.target.name] = event.target.value;
    //     setProductFields(newProductFields);
    // }
    function handleAddmoreProduct(event) {
        event.preventDefault();
        let object = {
            id_product: "",
            receive: [{ color: "63500315c91b810653035912", size: "63500189c91b81065303590a", number: 0 }],
            price: "0",
        };
        const newProductFields = [...productFields, object];
        setProductFields(newProductFields);
    }
    const handleProductItemChange = (event, index) => {
        let newProductFields = [...productFields];
        newProductFields[index][event.target.name] = event.target.value;
        setProductFields(newProductFields);
    };
    const handleCateChange = (index, id) => {
        let newProductFields = [...productFields];
        newProductFields[index].id_product = id;
        setProductFields(newProductFields);
    }
    const submitStock = async () => {
        let price = 0
        productFields.forEach(product => {
            price = price + parseInt(product.price)
        });
        const receive = productFields
        const data = {
            id_supply: stock.id_supply,
            status: stock.status,
            dateReceive: stock.dateReceive,
            totalPrice: price,
            receive
        };
        var answer = window.confirm("Are you sure to insert stock?");
        if (answer) {
            await stockAPI.insertStock(data)
            navigate("/stock/1");
        }
        else {
            return;
        }
    };
    const handleAddTypeItem = (index) => {
        let newProductFields = [...productFields];
        let object = { color: "63500315c91b810653035912", size: "63500189c91b81065303590a", number: 0 }
        newProductFields[index].receive.push(object);
        setProductFields(newProductFields);
    };
    const handleChangeTypeItem = (event, index, indexProduct) => {
        let newProductFields = [...productFields];
        // setProductFields(newProductFields);
        newProductFields[indexProduct].receive[index][event.target.name] =
            event.target.value;
        setProductFields(newProductFields);
    };
    const handleDeleteTypeItem = (index, indexProduct) => {
        let newProductFields = [...productFields];
        // setProductFields(newProductFields);
        newProductFields[indexProduct].receive.splice(index, 1);
        setProductFields(newProductFields);
    };
    const deleteProductItem = (index) => {
        if (productFields.length === 1) {
            setProductFields([
                {
                    product: "",
                    type: [{ color: "63500315c91b810653035912", size: "63500189c91b81065303590a", number: 0 }],
                    price: "0",
                },
            ]);
            return;
        }
        let newProductFields = [...productFields];
        // setProductFields(newProductFields);
        newProductFields.splice(index, 1);
        setProductFields(newProductFields);
    };
    return (
        <form action="" className="form" style={{ marginTop: "30px", marginBottom: "30px", maxHeight: '650px', overflowY: "scroll" }}  >
            <div className="supply">
                <label htmlFor="">{name}</label>
            </div>
            <ProductItem
                ListProduct={listProduct}
                ProductFields={productFields}
                HandleProductItemChange={handleProductItemChange}
                HandleDeleteProductItem={deleteProductItem}
                HandleDeleteItem={handleDeleteTypeItem}
                HandleChangeItem={handleChangeTypeItem}
                HandleAddTypeItem={handleAddTypeItem}
                HandleCateChange={handleCateChange}
            />
            <div className="addmore">
                <button onClick={handleAddmoreProduct}>Add More</button>
            </div>
            <div>
                <Button onClick={submitStock}>Submit</Button>
            </div>
        </form>
    );
}

export default AddStock;
