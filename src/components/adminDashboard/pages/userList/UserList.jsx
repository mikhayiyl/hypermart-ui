import "./userList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline, VisibilityOutlined } from "@material-ui/icons";
import { Link, Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import asyncErrors from '../../../../middleware/AsyncErrors';
import { deleteUser, getUsers } from "../../../../apiServices/userService";
import logger from "../../../../apiServices/logger";


export default function UserList() {
  const [data, setData] = useState([]);


  useEffect(() => {
    // fetch users

    const cancelToken = axios.CancelToken.source();

    const populateUsers = asyncErrors(async () => {
      const { data } = await getUsers({ cancelToken: cancelToken.token });
      setData(data);
    });
    populateUsers();


    return () => {
      cancelToken.cancel();
    }

  }, []);



  const handleDelete = async (id) => {
    const users = data;
    try {
      setData(users.filter((user) => user._id !== id));
      await deleteUser(id);

    } catch (e) {
      logger.log(e);
      setData(users);
      if (e.response.status === 404) window.location.reload();
    }
  };

  const columns = [
    { field: "_id", headerName: "ID", width: 90 },
    {
      field: "user",
      headerName: "User",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="userListUser">
            <img className="userListImg" src={params.row.image} alt={params.row.image} />
            {params.row.username}
          </div>
        );
      },
    },
    { field: "email", headerName: "Email", width: 200 },
    {
      field: "isAdmin",
      headerName: "Status",
      width: 120,
    },
    {
      field: "transaction",
      headerName: "Transaction Volume",
      width: 160,
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/admin/users/" + params.row._id} className="btn btn-sm btn-success m-1">
              View <VisibilityOutlined className="widgetSmIcon" />
            </Link>
            <span className="btn btn-sm btn-danger" onClick={() => handleDelete(params.row._id)}
            >

              <DeleteOutline
                className="userListDelete"
              />
            </span>
          </>
        );
      },
    },
  ];

  return (
    <>
      <div className="userList">
        <DataGrid
          rows={data}
          disableSelectionOnClick
          columns={columns}
          pageSize={8}
          getRowId={row => row._id}
          checkboxSelection
        />
      </div>
      <Outlet />
    </>
  );
}
