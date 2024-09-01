import React, { useEffect, useState } from "react"
import axios from 'axios';
import "./App.css"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import Header from "./common/header/Header"
import Pages from "./pages/Pages"
import Cart from "./common/Cart/Cart"
import Footer from "./common/footer/Footer"
import Notfound from "./components/Notfound"
import Editarproducto from "./components/MainPage/Editarproducto";
import Adminpanel from "./components/Adminpanel";
import Listproductos from "./components/MainPage/Listproductos";
import Loginadm from "./components/Loginadm";

function App() {
  const [productItems, setProducts] = useState([]);
  const [tokenr, setTokenr] = useState([]);
  const [userid,setUserId] = useState([]);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('https://localhost:7270/PRODUCT/ListAll');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);
  const [CartItem, setCartItem] = useState([])
  const addToCart = (product) => {
    const productExit = CartItem.find((item) => item.iD_PRODUCTO === product.iD_PRODUCTO)
    if (productExit) {
      setCartItem(CartItem.map((item) => (item.iD_PRODUCTO === product.iD_PRODUCTO ? { ...productExit, qty: productExit.qty + 1 } : item)))
    } else {
      setCartItem([...CartItem, { ...product, qty: 1 }])
    }
  }
  const handleVerification = (token, id) => {
    setTokenr(token);
    setUserId(id);
  };
  const deleteQty = (product) => {
    setCartItem(CartItem.filter((item) => item.iD_PRODUCTO !== product.iD_PRODUCTO))
  }
  const decreaseQty = (product) => {
    const productExit = CartItem.find((item) => item.iD_PRODUCTO === product.iD_PRODUCTO)
    if (productExit.qty === 1) {
      setCartItem(CartItem.filter((item) => item.iD_PRODUCTO !== product.iD_PRODUCTO))
    } else {
      setCartItem(CartItem.map((item) => (item.iD_PRODUCTO === product.iD_PRODUCTO ? { ...productExit, qty: productExit.qty - 1 } : item)))
    }
  }
  return (
    <Router>
      <Header CartItem={CartItem} />
      <Switch>
        <Route path="/" exact>
          <Pages productItems={productItems} addToCart={addToCart} component={Listproductos} />
        </Route>
        <Route path="/cart" exact>
          <Cart
            CartItem={CartItem}
            productItems={productItems}
            addToCart={addToCart}
            decreaseQty={decreaseQty}
            deleteQty={deleteQty}
          />
        </Route>
          <Route path="/LoginModal">
            <Notfound />
          </Route>
          <Route path="/LoginAdm">
            <Loginadm onVerif={handleVerification} />
          </Route> 
        <Route path="/Adminpanel">
        
          <Adminpanel productItems={productItems} CartItem={CartItem} addToCart={addToCart} tokenr1={tokenr} iduser1={userid}/>
       
        </Route>
      </Switch>
      <Footer />
    </Router>
  );
}
export default App
