import { Switch, Route, Routes } from "react-router";
import { BrowserRouter as Router } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./components/home";
import Register from "./components/register";
import Login from "./components/login";
import NavigationBar from "./components/nav";
import Cart from "./components/cart/cart";
import Buynow from "./components/buynow";
import "./App.css";
import Footer from "./components/footer";
function App() {
  return (
    <div className="App">
      <Router>
        <NavigationBar />
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/getproductDetail/:id" element={<Cart />}></Route>
          <Route path="/buynow" element={<Buynow />}></Route>
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
