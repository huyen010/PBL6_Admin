import React, { useEffect } from "react";
import { Col } from "react-bootstrap";
import { Route, Routes, useNavigate } from "react-router-dom";
import BillDetail from "../Bill/BillDetail";
import IndexBill from "../Bill/IndexBill";
import AddCate from "../Category/AddCate";
import IndexCate from "../Category/IndexCate";
import UpdateCate from "../Category/UpdateCate";
import AddDiscount from "../Discount/AddDiscount";
import IndexDiscount from "../Discount/IndexDiscount";
import Navbar from "../Navbar/Navbar";
import Delivery from "../TM/Delivery";
import ManageComment from "../TM/ManageComment";
import Management from "../TM/Management";
import Staff from "../TM/Staff";
import Category from "../TM/Category";
import { Navigate } from "react-router-dom";
import staffAPI from "../../api/Staff";
import NotAvailble from "../NotAvailble/NotAvailble";
import IndexStatistical from "../Statistical.js/IndexStatistical";

export default function HomeAdmin() {
  const navigate = useNavigate();
  useEffect(() => {
    const CheckToken = async () => {
      if (!localStorage.getItem("token")) {
        return navigate("/login");
      } else {
        try {
          const res = await staffAPI.getRole();
          if (res.id_role === "1") {
            return navigate("/access-denied");
          }
        } catch (ex) {
          return navigate("/login");
        }
      }
    };
    CheckToken();
  }, []);
  return (
    <>
      <Col md="3">
        <Navbar />
      </Col>
      <Col>
        <Routes>
          <Route exact="true" path="/category/add" element={<AddCate />} />
          <Route
            exact="true"
            path="/category/update/:slug"
            element={<UpdateCate />}
          />

          <Route path="/category" element={<Category />} />

          <Route path="/promotion" element={<IndexDiscount />} />
          <Route path="/discount/add" element={<AddDiscount />} />

          <Route path="/delivery" element={<Delivery />} />
          <Route path="/danagement" element={<Management />} />
          <Route path="/staff" element={<Staff />} />
          <Route
            exact="true"
            path="/statistical"
            element={<IndexStatistical />}
          ></Route>
        </Routes>
      </Col>
    </>
  );
}
