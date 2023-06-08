import "./productList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Link, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import asyncErrors from '../../../../middleware/AsyncErrors';
import { deleteProduct, getProducts } from "../../../../apiServices/productsApi"
import axios from "axios";
import logger from "../../../../apiServices/logger";



export default function ProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // fetch products

    const cancelToken = axios.CancelToken.source();

    const populateProducts = asyncErrors(async () => {
      const { data } = await getProducts({ cancelToken: cancelToken.token });
      setProducts(data);

    });
    populateProducts();


    return () => {
      cancelToken.cancel();
    }

  }, []);


  const handleDelete = async (id) => {
    const originalProducts = products;
    try {

      setProducts(originalProducts.filter((product) => product._id !== id));
      await deleteProduct(id);
    } catch (e) {
      logger.log(e);
      setProducts(originalProducts);
      if (e.response.status === 404) window.location.reload();
    }


  };

  const columns = [
    {
      field: "product",
      headerName: "Product",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            <img className="productListImg" src={params.row.image} alt={params.row.image} />
            {params.row.title}
          </div>
        );
      },
    },
    { field: "numberInStock", headerName: "Stock", width: 160 },
    { field: "sizes", headerName: "Size", width: 130 },
    { field: "color", headerName: "Color", width: 130 },


    {
      field: "sex",
      headerName: "Price",
      width: 160,
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/admin/products/" + params.row._id} className="btn btn-sm btn-success">
              Edit
            </Link>
            <span className="badge badge-pill bg-danger m-1" onClick={() => handleDelete(params.row._id)}>
              <DeleteOutline
                className="productListDelete"

              />
            </span>
          </>
        );
      },
    },
  ];

  return (
    <>
      <div className="productList">
        <DataGrid
          rows={products}
          disableSelectionOnClick
          columns={columns}
          pageSize={8}
          checkboxSelection
          getRowId={row => row._id}
        />
      </div>
      <Outlet />
    </>
  );
}
