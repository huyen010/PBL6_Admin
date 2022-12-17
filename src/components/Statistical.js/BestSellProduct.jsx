import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'react-bootstrap';

BestSellProduct.propTypes = {
    Products: PropTypes.array.isRequired,

};
BestSellProduct.defaultProps = {
    Products: []
}
function BestSellProduct(props) {
    const Products = props.Products;
    return (
        <div className='App' style={{ width: "500px", marginLeft: "50px" }}>
            <div>Top sản phẩm bán chạy</div>
            <Table style={{ border: "solid 1px black" }}>
                <thead>
                    <tr>
                        <th>STT</th>
                        <th>Tên sản phẩm</th>
                        <th>Danh mục</th>
                        <th>Đã bán</th>
                    </tr>
                </thead>
                <tbody>
                    {Products.map((val, key) => {
                        return (
                            <tr key={key}>
                                <td>{key + 1}</td>
                                <td>{val.name}</td>
                                <td>{val.id_cate.name}</td>
                                <td>{val.sold}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>
        </div >
    );
}

export default BestSellProduct;