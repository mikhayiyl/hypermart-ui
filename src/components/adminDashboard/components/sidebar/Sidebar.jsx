import "./sidebar.css";

import {
  LineStyle,
  Timeline,
  TrendingUp,
  PermIdentity,
  Storefront,
  AttachMoney,
  BarChart,
  MailOutline,
  DynamicFeed,
  ChatBubbleOutline,
  WorkOutline,
  Report,
  AddShoppingCartOutlined,
  AddAPhotoOutlined,
  ShoppingBasket,
  CancelOutlined,
  ShoppingCartSharp,
} from "@material-ui/icons";
import { Link } from "react-router-dom";

export default function Sidebar({ close }) {
  return (
    <div className="sidebar">
      <CancelOutlined className="cancel" onClick={close} />
      <div className="sidebarWrapper">

        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Dashboard</h3>
          <ul className="sidebarList">
            <Link to="/admin" className="link">
              <li className="sidebarListItem active">
                <LineStyle className="sidebarIcon" />
                Home
              </li>
            </Link>
            <li className="sidebarListItem">
              <Timeline className="sidebarIcon" />
              Analytics
            </li>
            <li className="sidebarListItem">
              <TrendingUp className="sidebarIcon" />
              Sales
            </li>
            <li className="sidebarListItem">
              <AttachMoney className="sidebarIcon" />
              Transactions
            </li>
            <li className="sidebarListItem">
              <BarChart className="sidebarIcon" />
              Reports
            </li>

          </ul>
        </div>

        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Products</h3>
          <ul className="sidebarList">

            <Link to="/admin/categories" className="link">
              <li className="sidebarListItem">
                <ShoppingCartSharp className="sidebarIcon" />
                Categories
              </li>
            </Link>
            <Link to="/admin/products/new" className="link">
              <li className="sidebarListItem">
                <AddShoppingCartOutlined className="sidebarIcon" />
                Add
              </li>
            </Link>
            <Link to="/admin/products" className="link">
              <li className="sidebarListItem">
                <Storefront className="sidebarIcon" />
                Products
              </li>
            </Link>
            <Link to="/admin/orders" className="link">
              <li className="sidebarListItem">
                <ShoppingBasket className="sidebarIcon" />
                Orders
              </li>
            </Link>
          </ul>
        </div>

        <div className="sidebarMenu">
          <h3 className="sidebarTitle">users</h3>
          <ul className="sidebarList">
            <Link to="/admin/users" className="link">
              <li className="sidebarListItem">
                <PermIdentity className="sidebarIcon" />
                Users
              </li>
            </Link>
            <Link to="/admin/users/new" className="link">
              <li className="sidebarListItem">
                <AddAPhotoOutlined className="sidebarIcon" />
                Add User
              </li>
            </Link>
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Notifications</h3>
          <ul className="sidebarList">
            <li className="sidebarListItem">
              <MailOutline className="sidebarIcon" />
              Mail
            </li>
            <li className="sidebarListItem">
              <DynamicFeed className="sidebarIcon" />
              Feedback
            </li>
            <li className="sidebarListItem">
              <ChatBubbleOutline className="sidebarIcon" />
              Messages
            </li>
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Staff</h3>
          <ul className="sidebarList">
            <li className="sidebarListItem">
              <WorkOutline className="sidebarIcon" />
              Manage
            </li>
            <li className="sidebarListItem">
              <Timeline className="sidebarIcon" />
              Analytics
            </li>
            <li className="sidebarListItem">
              <Report className="sidebarIcon" />
              Reports
            </li>
          </ul>
        </div>

      </div>
    </div>
  );
}
