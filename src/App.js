import logo from "./logo.svg";
import Container from "react-bootstrap/Container";
import "./App.css";
import Header from "./components/Header/Header";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Footer from "./components/Footer/Footer";
import Navbar from "./components/Navbar/Navbar";
import Index from "./components/Product/Index";
import { Route, Routes, Link, NavLink } from "react-router-dom";
import AddProduct from "./components/Product/Add";
import IndexCate from "./components/Category/IndexCate";
import AddCate from "./components/Category/AddCate";
import UpdateCate from "./components/Category/UpdateCate";
import AddSupply from "./components/Supply/AddSupply";
import IndexSupply from "./components/Supply/IndexSupply";
import Addrepresentative from "./components/Supply/AddRepresentative";
import UpdateRepresentative from "./components/Supply/UpdateRepresentative";
import UpdateSupply from "./components/Supply/UpdateSupply";
import UpdateProduct from "./components/Product/Update";
import IndexStock from "./components/Stock/IndexStock";
import AddStock from "./components/Stock/AddStock";
import Supply from "./components/Stock/Supply";
import IndexBill from "./components/Bill/IndexBill";
import BillDetail from "./components/Bill/BillDetail";
import SellProduct from "./components/Product/SellProduct";
import SearchProduct from "./components/Product/SearchProduct";
import IndexStatistical from "./components/Statistical.js/IndexStatistical";


import Delivery from './components/TM/Delivery';
import Category from './components/TM/Category';
import Staff from './components/TM/Staff';
import Product from './components/TM/Product';
import Stock from './components/TM/Stock';
import Promotion from './components/TM/Promotion';
import Management from './components/TM/Management';
import Statistic from './components/TM/Statistic';
import ManageComment from './components/TM/ManageComment';
import BlackList from './components/TM/BlackList';
function App() {
  return (
    <>
      <Header />
      <Container
        fluid
        style={{ paddingRight: "0px", paddingLeft: "0px", marginBottom: "0px" }}
      >
        <Row>
          <Col md="3">
            <Navbar />
          </Col>
          <Col>
            <Routes>
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
              <Route
                exact="true"
                path="/product/add"
                element={<AddProduct />}
              />
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
              <Route exact="true" path="/categories" element={<IndexCate />} />
              <Route exact="true" path="/category/add" element={<AddCate />} />
              <Route
                exact="true"
                path="/category/update/:slug"
                element={<UpdateCate />}
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
              <Route
                exact="true"
                path="/stock/add"
                element={<Supply />}
              ></Route>
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
              <Route
                exact="true"
                path="/statistical"
                element={<IndexStatistical />}
              ></Route>

              <Route path = '/Category' element = {<Category />}/>
              <Route path="/Promotion" element={<Promotion />} />
              <Route path="/Delivery" element={<Delivery />} />
              <Route path="/Management" element={<Management />} />
              <Route path="/ManageComment" element={<ManageComment />} />
              <Route path="/BlackList" element={<BlackList />} />
              <Route path="/Staff" element={<Staff />} />
            </Routes>
          </Col>
        </Row>
      </Container>
      <Footer />
    </>
  );
}

export default App;
