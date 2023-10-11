import './App.css';
import Homepage from './pages/Homepage';
import RegistrationForm from './pages/RegistrationPage';
import Header from './components/Header';
import Footer from './components/Footer';
import ResetPassword from './pages/ResetPassword';
import ResetSuccess from './pages/ResetSuccess';
import NewPassword from './pages/NewPassword';
import AboutUsPage from './pages/AboutUsPage';
import ContactUs from './pages/ContactUs';
import { Route, Routes } from 'react-router-dom';
import Shop from './pages/Shop';
import ProductPage from './pages/ProductPage';
import CartPage from './pages/CartPage';
import CheckourPage from './pages/CheckoutPage';
import UserPage from './pages/UserPage';
import LikePage from './pages/LikePage';
import React, { useState, useEffect } from 'react';
import axios from "axios";
import LoginHook from './pages/LoginHook';
import { Context } from './context';
import getOrderDetails from './API/getOrderDetails';
import getOrders from './API/getOrders';
import getProducts from './API/getProducts';
import { useToggle } from './hooks/useToggle';

function App() {

  const [authorized, setAuthorized] = useState(false)
  const [currentUser, setCurrentUser] = useState({})
  const [urlData, setUrlData] = useState({})
  let [products, setProducts] = useState([]);
  let [orders, setOrders] = useState([]);
  let [orderDetails, setOrderDetails] = useState([]);
  let [iAmState, toggleIAmState] = useToggle(false);
  let [stateForShopItemQuantity, setStateForShopItemQuantity] = useState(false);
  
  axios.defaults.withCredentials = true;

  useEffect(() => {
    axios.get('http://localhost:3100/users/currentUser')
      .then(result => {
        if (!result.data.failure) {
          setAuthorized(true)
          setCurrentUser(result.data)
        } else {
          setCurrentUser({})
        }
      })
      .catch(err => console.log(err))
  }, [authorized])

  const handleAuthorization = (bool) => {
    setAuthorized(bool)
  }

  const handleLogout = () => {
    axios.get('http://localhost:3100/users/logout')
      .then(res => {
        setAuthorized(false)
        setCurrentUser({})
        window.location.reload(true);
      }).catch(err => console.log(err))
  }

  const handleUrlData = (data) => {
    setUrlData(data)
    console.log(data)
  }

  useEffect(() => {
    console.log("Fetching products...");
    getOrderDetails(setOrderDetails);
    getOrders(setOrders);
    getProducts(setProducts);
  }, [iAmState, stateForShopItemQuantity])
 
  return (
    <Context.Provider value={{
      products,
      currentUser,
      orders,
      orderDetails,
      iAmState,
      toggleIAmState,
      setStateForShopItemQuantity,
      stateForShopItemQuantity
    }}>
      <>
        <Header currentUser={currentUser} authorized={authorized} handleLogout={handleLogout} />
        <Routes>
          <Route path="/homepage" element={<Homepage />} />
          <Route path="/registration_form" element={<RegistrationForm />} />
          <Route path="/login_page" element={<LoginHook handleAuthorization={handleAuthorization} />} />
          <Route path="/reset_password" element={<ResetPassword handleUrlData={handleUrlData} />} />
          <Route path="/reset_success" element={<ResetSuccess />} />
          <Route path="/new_password" element={<NewPassword urlData={urlData} />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/shop/:name?" element={<Shop />} />
          <Route path="/cart_page" element={<CartPage />} />
          <Route path="/checkout_page" element={<CheckourPage />} />
          <Route path="/about-us" element={<AboutUsPage />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/user-page" element={<UserPage />} />
          <Route path="/wish-list" element={<LikePage />} />
        </Routes>
        <Footer />
      </>
    </Context.Provider>
  );
}

export default App;
