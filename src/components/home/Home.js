import React, { useEffect } from "react";
import { Col } from "react-bootstrap";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import BillDetail from "../Bill/BillDetail";
import IndexBill from "../Bill/IndexBill";
import Navbar from "../Navbar/Navbar";
import AddProduct from "../Product/Add";
import Index from "../Product/Index";
import SearchProduct from "../Product/SearchProduct";
import SellProduct from "../Product/SellProduct";
import UpdateProduct from "../Product/Update";
import IndexStatistical from "../Statistical.js/IndexStatistical";
import AddStock from "../Stock/AddStock";
import IndexStock from "../Stock/IndexStock";
import Supply from "../Stock/Supply";
import Addrepresentative from "../Supply/AddRepresentative";
import AddSupply from "../Supply/AddSupply";
import IndexSupply from "../Supply/IndexSupply";
import UpdateRepresentative from "../Supply/UpdateRepresentative";
import UpdateSupply from "../Supply/UpdateSupply";
import ManageComment from "../TM/ManageComment";
import staffAPI from "../../api/Staff";
import NotAvailble from "../NotAvailble/NotAvailble";

export default function Home() {
  const navigate = useNavigate();
  useEffect(() => {
    const CheckToken = async () => {
      if (!localStorage.getItem("token")) {
        return navigate("/login");
      } else {
        try {
          await staffAPI.getRole();
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
          <Route exact="true" path="/access-denied" element={<NotAvailble />} />

          <Route
            exact="true"
            path="/products/:slug/:page"
            element={<Index />}
          />
          <Route
            exact="true"
            path="/product/sell/:id"
            element={<SellProduct />}
          />
          <Route exact="true" path="/product/add" element={<AddProduct />} />
          <Route exact="true" path="/product/detail" element={<Index />} />
          <Route
            exact="true"
            path="/product/update/:id"
            element={<UpdateProduct />}
          />
          <Route
            exact="true"
            path="/products/:slug/:search/:page"
            element={<SearchProduct />}
          />
          <Route
            exact="true"
            path="/supplies/:page"
            element={<IndexSupply />}
          />
          <Route exact="true" path="/supply/add" element={<AddSupply />} />
          <Route
            exact="true"
            path="/representative/add"
            element={<Addrepresentative />}
          />
          <Route
            exact="true"
            path="/representative/update/:ids/:idre"
            element={<UpdateRepresentative />}
          />
          <Route
            exact="true"
            path="/supply/update/:ids/:idre"
            element={<UpdateSupply />}
          />
          <Route
            exact="true"
            path="/stock/:page"
            element={<IndexStock />}
          ></Route>
          <Route exact="true" path="/stock/add" element={<Supply />}></Route>
          <Route
            exact="true"
            path="/stock/list-product"
            element={<AddStock />}
          ></Route>
          <Route
            exact="true"
            path="/bill/:page"
            element={<IndexBill />}
          ></Route>
          <Route
            exact="true"
            path="/bill/:stt/:deliver/:page"
            element={<IndexBill />}
          ></Route>
          <Route
            exact="true"
            path="/bill/detail/:id"
            element={<BillDetail />}
          ></Route>

          <Route path="/ManageComment" element={<ManageComment />} />
        </Routes>
      </Col>
    </>
  );
}
