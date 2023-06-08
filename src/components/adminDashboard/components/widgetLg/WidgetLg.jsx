import "./widgetLg.css";
import { useEffect, useState } from "react";
import axios from "axios";
import asyncErrors from "../../../../middleware/AsyncErrors";
import { format } from "timeago.js";
import { VisibilityOutlined } from "@material-ui/icons";
import { Link, Outlet, useLocation } from "react-router-dom";
import { getUsers } from "../../../../apiServices/userService";



export default function WidgetLg() {
  const [orders, setOrders] = useState([]);
  const location = useLocation();
  const path = location.pathname.split('/')[2] === "orders";



  useEffect(() => {
    // fetch orders

    const cancelToken = axios.CancelToken.source();

    const getOrders = asyncErrors(async () => {
      // fetch orders
      const { data: orders } = await axios.get("/orders", { cancelToken: cancelToken.token });
      // fetch users
      const { data: users } = await getUsers({ cancelToken: cancelToken.token });

      // users -> orders
      const data = orders.map(order => {
        const user = users.find(user => user._id === order.userId);
        if (user) {
          return { username: user.username, image: user.image, ...order };
        } else {
          return { ...order };
        }
      });



      setOrders(path ? data : data.slice(0, 6));
    });
    getOrders();


    return () => {
      cancelToken.cancel();
    }

  }, [path]);




  const Button = ({ type }) => {
    return <button className={"widgetLgButton " + type}>{type}</button>;
  };
  return (
    <>
      <div className="widgetLg">
        <h3 className="widgetLgTitle">Latest Orders</h3>
        <table className="widgetLgTable">
          <thead>
            <tr className="widgetLgTr">
              <th className="widgetLgTh">Customer</th>
              <th className="widgetLgTh">Date</th>
              <th className="widgetLgTh">Amount</th>
              <th className="widgetLgTh">Status</th>
            </tr>
          </thead>
          <tbody>

            {orders.map(order => <tr className="widgetLgTr" key={order._id}>
              <td className="widgetLgUser">
                <img
                  src={order.image}
                  alt={order.username}
                  className="widgetLgImg"
                />
                <span className="widgetLgName">{order.username}</span>
              </td>
              <td className="widgetLgDate">{format(order.createdAt)}</td>
              <td className="widgetLgAmount">${order.amount}</td>
              <td className="widgetLgStatus">
                <Link to={`/admin/orders/${order._id}`} className="btn">
                  <Button type={order.status} /> <VisibilityOutlined />
                </Link>
              </td>
            </tr>)}
          </tbody>
        </table>
      </div>
      <Outlet />
    </>
  );
}
