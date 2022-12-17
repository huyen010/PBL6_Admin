import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './style.scss'
import { Route, Link, NavLink } from 'react-router-dom'

ListCate.propTypes = {
    Categories: PropTypes.array.isRequired,
    onDeleteClick: PropTypes.func
};
ListCate.defaultProps = {
    Categories: [],
    onDeleteClick: null
}
function ListCate(props) {
    const onDeleteClick = props.onDeleteClick;
    const Categories = props.Categories;
    function handleButtonDelete(value, key) {
        onDeleteClick(value, key);
    }
    return (
        <div className='App'>
            <button>
                <Link to="/category/add" exact="true">Thêm </Link>
            </button>
            <div>
                <table>
                    <tr>
                        <th>STT</th>
                        <th>Danh mục</th>
                        <th>Thao tác</th>
                    </tr>
                    {Categories.map((val, key) => {
                        return (
                            <tr key={key}>
                                <td>{key + 1}</td>
                                <td>{val.name}</td>
                                <td>
                                    <button onClick={() => handleButtonDelete(val._id, key)}>Xóa</button>
                                    <button>
                                        <Link exact="true" to={{
                                            pathname: `/category/update/${val.slug}`
                                        }}>Cập nhật</Link>
                                    </button>
                                </td>
                            </tr>
                        )
                    })}
                </table>
            </div>
        </div >
    );
}

export default ListCate;