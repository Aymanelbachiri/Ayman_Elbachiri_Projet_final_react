import React from 'react';
import Nav from './layout/Nav';
import { Route, Routes } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import Home from './pages/home/Home';
import Shop from './pages/shop/Shop';
import Blog from './pages/blog/Blog';
import About from './pages/about/About';
import Contact from './pages/contact/Contact';
import Product from './pages/product/Product';
import Auth from './pages/auth/Auth';
import Footer from './layout/Footer';

const App = () => {
  return (
    <CartProvider>
      <Nav></Nav>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/shop' element={<Shop />} />
        <Route path='/blog' element={<Blog />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact  />} />
        <Route path='/product' element={<Product />} />
        <Route path='/auth' element={<Auth />} />
      </Routes>
      <Footer></Footer>
    </CartProvider>
  );
};

export default App;