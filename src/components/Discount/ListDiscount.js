import React, { useState } from "react";
import PropTypes from "prop-types";
import ReactTable from "react-table";
import "./style.scss";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { Route, Link, NavLink, useNavigate } from "react-router-dom";

ListDiscount.propTypes = {
  Discounts: PropTypes.array.isRequired,
  onDeleteClick: PropTypes.func,
};
ListDiscount.defaultProps = {
  Discounts: [],
  onDeleteClick: null,
};
function ListDiscount(props) {
  const navigate = useNavigate();
  const onDeleteClick = props.onDeleteClick;
  const Discounts = props.Discounts;
  function handleButtonDelete(key, value) {
    onDeleteClick(key, value);
  }

  return (
    <div className="App">
      <Link
        className="btn btn-primary"
        style={{ backgroundColor: "#8975ff", marginBottom: "20px" }}
        to="/admin/discount/add"
        exact="true"
      >
        Add new
      </Link>
      <Table style={{ border: "solid 1px black" }}>
        <thead>
          <tr>
            <th>STT</th>
            <th>Date start</th>
            <th>Date end</th>
            <th>Percent</th>
            <th>Product</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {Discounts.map((val, key) => {
            return (
              <tr key={key}>
                <td>{key + 1}</td>
                <td>{val.date_create.date + " " + val.date_create.time}</td>
                <td>{val.dateEnd.date + " " + val.dateEnd.time}</td>
                <td>{val.percent + " "}</td>
                <td>{val.listProduct.length}</td>
                {val.status && <td>Use</td>}
                {!val.status && <td>Unuse</td>}
                <td>
                  <Button
                    style={{ backgroundColor: "#8975ff" }}
                    onClick={() => handleButtonDelete(key, val._id)}
                    variant="success"
                    size="sm"
                  >
                    Delete
                  </Button>{" "}
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
}

export default ListDiscount;
