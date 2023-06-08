import React, { useState } from 'react'
import { Route, Routes, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Home from './pages/Home/Home';
import Announcement from './components/Announcement/Announcement';
import Navbar from './components/Navbar/Navbar';
import Product from './pages/Product/Product';
import ProductList from './pages/productList/ProductList';
import Categories from './pages/category/Category';
import Cart from './pages/cart/Cart';
import Login from "./pages/form/Login";
import AdminDashboard from './components/adminDashboard/Admin';
import Footer from './components/footer/Footer';
import Logout from './pages/Logout';
import { currentUser } from './apiServices/authService';
import SuccessPage from './pages/Success';
import ProfilePage from './pages/profile/Profile';
import Orders from './pages/orders/Orders';
import Order from './pages/orders/Order';
import WishList from './pages/wishlist/WishList';



const App = () => {
  const [openBurger, setIsOpen] = useState(false);
  const [openned, setOppened] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const path = useLocation().pathname === "/login";
  const adminPath = useLocation().pathname.split('/')[1] === "admin";



  function closeAll() {
    setIsOpen(false);
    setOppened(false);
  }
  const toggle = () => {
    closeAll();
    setModalOpen(false);
  };

  const user = currentUser();
  console.log({ user })

  return (
    <>
      {!adminPath && <header>
        <Announcement />
        <Navbar setModalOpen={setModalOpen} modalOpen={modalOpen} user={user} setOpen={setIsOpen} isOpen={openBurger} setOppened={setOppened} openned={openned} closeAll={closeAll} />
        {(modalOpen && !path) && <Login />}
      </header>}
      <main onClick={toggle}>

        <ToastContainer />
        <Routes>
          <Route index element={<Home />} />
          <Route path='home' element={<Home />} />
          <Route path='logout' element={<Logout />} />
          <Route path='login' element={<Login />} />
          <Route path='profile' element={<ProfilePage user={user} />} />
          <Route path='orders' element={<Orders user={user} />} />
          <Route path='order/:id' element={<Order />} />
          <Route path='wishlist' element={<WishList user={user} />} />
          <Route path='admin/*' element={<AdminDashboard />} />

          <Route path='product/:id' element={<Product />} />
          <Route path='success' element={<SuccessPage />} />
          <Route path='cart' element={<Cart />} />
          <Route path='categories/:name' element={<Categories />} />
          <Route path='category/:id' element={<ProductList />} />
          <Route path='*' element={<Home />} />
        </Routes>
      </main>

      <footer onClick={toggle}>
        <Footer />
      </footer>
    </>
  )
}

export default App;






