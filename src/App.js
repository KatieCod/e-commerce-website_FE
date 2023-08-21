import './App.css';
import Homepage from './Homepage';
import RegistrationForm from './RegistrationPage';
import Header from './Header';
import Footer from './Footer';
import Login from './Login';
import { Route, Routes } from 'react-router-dom';
import Shop from './Shop';
import ProductPage from './ProductPage';
import CartPage from './CartPage';
import CheckourPage from './CheckoutPage';
import React, { useState, useEffect } from 'react';
import axios from "axios";
import { useNavigate } from "react-router-dom";

function App() {

  const [currentUser, setCurrentUser] = useState({})

  axios.defaults.withCredentials = true;

  useEffect(() => {
      axios.get('http://localhost:3100/users/currentUser')
          .then(result => {
              if (!result.data.failure) {
                  // setAuth(true)
                  setCurrentUser(result.data)
                  console.log('hi')
                  console.log(result)
              } else {
                console.log('bye')
              }
          })
          .catch(err => console.log(err))
  }, [])

  return (
    <>
      <Header />
    <Routes>
      <Route path="/homepage" element={<Homepage/>}/>
      <Route path="/registration_form" element={<RegistrationForm/>} />
      <Route path="/login_page" element={<Login />} />
      <Route path="/shop" element={<Shop/>} />
      <Route path="/product_page" element={<ProductPage/>} />
      <Route path="/cart_page" element={<CartPage/>} />
      <Route path="/checkout_page" element={<CheckourPage />} />
    </Routes>
    <Footer />
    </>
  );
}

export default App;
