import Sidebar from "./components/sidebar/Sidebar";
import Topbar from "./components/topbar/Topbar";
import "./App.css";
import Home from "./pages/dashboardHome/Home";
import { Navigate, Route, Routes } from "react-router-dom";
import UserList from "./pages/userList/UserList";
import User from "./pages/user/User";
import ProductList from "./pages/productList/ProductList";
import Product from "./pages/product/Product";
import WidgetLg from "./components/widgetLg/WidgetLg";
import Orders from "./pages/orders/Orders";
import { currentUser } from '../../apiServices/authService';
import { useState } from "react";
import Categories from "./pages/categories/Categories";

function App() {

  const currentuser = currentUser();
  const [toggle, setToggle] = useState(true);

  function toggleMenu() {
    setToggle(!toggle);
  }


  if (!currentuser) return <Navigate to="/" replace={true} />;
  if (!currentuser.isAdmin) return <Navigate to="/" replace={true} />;

  return (
    <>

      <Topbar setOpen={toggleMenu} currentuser={currentuser} />

      <div className="Container" >
        {toggle && <Sidebar close={() => setToggle(!toggle)} />
        }

        <Routes >
          <Route index element={<Home />} />
          <Route path="users">
            <Route index element={<UserList />} />
            <Route path=":id" element={<User />} />
          </Route>
          <Route path="products"  >
            <Route index element={<ProductList />} />
            <Route path=":id" element={<Product />} />
          </Route>
          <Route path="orders" >
            <Route index element={<WidgetLg />} />
            <Route path=":id" element={<Orders />} />
          </Route>
          <Route path="categories" >
            <Route index element={<Categories />} />
          </Route>
        </Routes>
      </div>
    </>
  );
}

export default App;

