import "./widgetSm.css";
import { Visibility } from "@material-ui/icons";
import { useEffect, useState } from "react";
import axios from "axios";
import { getUsers } from "../../../../apiServices/userService";
import asyncErrors from "../../../../middleware/AsyncErrors";
import { Link } from "react-router-dom";

export default function WidgetSm() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // fetch users

    const cancelToken = axios.CancelToken.source();

    const populateUsers = asyncErrors(async () => {
      const { data } = await getUsers({ cancelToken: cancelToken.token });
      setUsers(data);
    });
    populateUsers();


    return () => {
      cancelToken.cancel();
    }

  }, []);


  return (
    <div className="widgetSm">
      <span className="widgetSmTitle">New Join Members</span>
      <ul className="widgetSmList">
        {users.slice(0, 5).map(user => <li className="widgetSmListItem" key={user._id}>
          <img
            src={user.image}
            alt={user.name}
            className="widgetSmImg"
          />
          <div className="widgetSmUser">
            <span className="widgetSmUsername">{user.username}</span>
          </div>
          <Link to={`/admin/users/${user._id}`} className="btn btn-sm bg-light ">
            <Visibility className="widgetSmIcon" />
            Display
          </Link>
        </li>)}

      </ul>
    </div>
  );
}
