import React, { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import TypeItem from './TypeItem';
import productAPI from '../../api/Product';
// import Form from "react-bootstrap/Form";
ProductItem.propTypes = {
    ListProduct: PropTypes.array.isRequired,
    ProductFields: PropTypes.array.isRequired,
    HandleAddTypeItem: PropTypes.func.isRequired,
    HandleChangeItem: PropTypes.func.isRequired,
    HandleDeleteItem: PropTypes.func.isRequired,
    HandleDeleteProductItem: PropTypes.func.isRequired,
    HandleProductItemChange: PropTypes.func.isRequired,
    HandleCateChange: PropTypes.func.isRequired,
};
ProductItem.defaultProps = {
    ListProduct: [],
    ProductFields: [],
    HandleAddTypeItem: null,
    HandleChangeItem: null,
    HandleDeleteItem: null,
    HandleDeleteProductItem: null,
    HandleProductItemChange: null,
    HandleCateChange: null,
};
function ProductItem(props) {
    const [products, setProducts] = useState(props.ListProduct)

    const listProduct = props.ListProduct
    const productFields = props.ProductFields
    const handleAddTypeItem = props.HandleAddTypeItem
    const handleChangeItem = props.HandleChangeItem
    const handleDeleteItem = props.HandleDeleteItem
    const handleDeleteProduct = props.HandleDeleteProductItem
    const handleProductItemChange = props.HandleProductItemChange
    const handleCateChange = props.HandleCateChange

    let listCate = listProduct.map(item => {
        return item.id_cate
    })
    const uniqueCate = [...new Map(listCate.map(item => [item['_id'], item])).values()]
    const firstUniqueCateId = uniqueCate[0]?._id
    // var products = listProduct.filter((product) => product.id_cate._id === uniqueCate[0]._id)
    useEffect(() => {
        if (uniqueCate.length !== 0) {
            const listP = listProduct.filter((product) => product.id_cate._id === firstUniqueCateId)
            setProducts(listP)
        }
    }, [firstUniqueCateId, uniqueCate.length])
    // setCate(uniqueCate[0]._id)
    function handleChangeCate(event, index) {
        const listP = listProduct.filter((product) => product.id_cate._id === event.target.value)
        setProducts(listP)
        handleCateChange(index, listP[0]._id)
    }
    const handleItemChange = (event, index) => {
        event.preventDefault();
        handleProductItemChange(event, index)
    }
    function handleAddmoreTypeItem(event, index) {
        event.preventDefault();
        handleAddTypeItem(index)
    }

    const handleTypeItemChange = (event, index, indexProduct) => {
        event.preventDefault();
        handleChangeItem(event, index, indexProduct)
    }
    const handleDeleteTypeItem = (index, indexProduct) => {
        handleDeleteItem(index, indexProduct)
    }
    function handleDeleteProductItem(index) {
        handleDeleteProduct(index)
    }
    return productFields.map((it, index) => (
        <div className="product_item" key={index}>
            <div className="product">
                <div>
                    <label htmlFor="">Category</label>
                    <select name="cate" id="cate" onChange={(event) => { handleChangeCate(event, index) }}>
                        {uniqueCate.map((val, index) => (
                            <option key={index} value={val._id}>{val.name}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label htmlFor="">Product</label>
                    <select name="id_product" id="product" onChange={(event) => { handleItemChange(event, index) }}>
                        {products.map((val, index) => (
                            <option key={index} value={val._id}>{val.name}</option>
                        ))}
                    </select>
                </div>
            </div>
            <TypeItem itemFields={it.receive} index={index} OnchangeItem={handleTypeItemChange} OnDeleteClick={handleDeleteTypeItem} />
            <button className='add_product' onClick={(event) => handleAddmoreTypeItem(event, index)}>Add more</button>
            <div className='price'>
                <label htmlFor="">Price</label>
                <input onChange={(event) => { handleItemChange(event, index) }} name="price" id="price" type="number" />
            </div>
            <button style={{ margin: "25px 30px 0px 30px" }} onClick={(event) => { handleDeleteProductItem(event, index) }}>Remove</button>
        </div>
    ))
}

export default ProductItem;