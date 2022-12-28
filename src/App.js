import logo from "./logo.svg";
import Container from "react-bootstrap/Container";
import "./App.css";
import Header from "./components/Header/Header";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Footer from "./components/Footer/Footer";
import { Route, Routes, Link, NavLink } from "react-router-dom";
import Login from "./components/Login/Login";
import Home from "./components/home/Home";
import HomeAdmin from "./components/home/homeAdmin";
import NotAvailble from "./components/NotAvailble/NotAvailble";
function App() {
  return (
    <>
      <Header />
      <Container
        fluid
        style={{ paddingRight: "0px", paddingLeft: "0px", marginBottom: "0px" }}
      >
        <Row>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/*" element={<Home />}></Route>
            <Route path="/admin/*" element={<HomeAdmin />}></Route>
          </Routes>
        </Row>
      </Container>
      <Footer />
    </>
  );
}

export default App;
