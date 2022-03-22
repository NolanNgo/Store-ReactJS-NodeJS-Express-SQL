// import pro from "../../Image/product5.jpg";
import EditProduct from "./formEditProduct/EditProduct";
import { myDelete, myGet } from "../../Global/myRequest";
import { toastSuccess, toastError } from "../../Global/myToast";
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";

function TableProduct(props) {
  const [listProduct, setListProduct] = useState([]);
  // const [currentPage, setCurrentPage] = useState(1);
  useEffect(() => {
    const getProduct = async ()=>
    {
      setListProduct(await myGet("Product"));
      localStorage.setItem("productID", `PR${(listProduct && listProduct.data && listProduct.data.length ? listProduct.data.length : 0) + 1}`);

    }
    getProduct();
    return () => {};
  });

  const DeleteProduct = async (e) => {
    const token = localStorage.getItem("jwtoken");
    // props.listPro
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const resultDelete = await myDelete(`Product/${e}`, headers);
    if(resultDelete && resultDelete.statusRes === true){
      toastSuccess(resultDelete.message);
    }else{
      toastError(resultDelete.message);
    }
    // .then((response) => {
    //   if (response.statusRes === true) {
    //     toastSuccess(response.message);
    //   } else {
    //     toastError(response.message);
    //   }
    // });
  };
  // console.log( Math.ceil(props.listPro.length / pageSize));
  return (
    <div className="table-product-admin">
      <h1>Bảng Sản Phẩm</h1>
      {/* <PaginationProduct list={props.listPro} /> */}
      <table className="table-product">
        <thead>
          <tr>
            <th>Sản Phẩm</th>
            <th>Số Lượng</th>
            <th>Thành Tiền</th>
            <th>Tác vụ</th>
          </tr>
        </thead>
        {listProduct && listProduct.data && listProduct.data.length > 0 && (
          <tbody>
            {listProduct.data.map((items, i) => {
              return (
                <tr key={i}>
                  <td>
                    <div className="cart-infor-admin">
                      <img
                        className="cart-info-img"
                        src={items.Image}
                        alt="img-pro"
                      />
                      <div className="text-name">
                        <p>
                          {items.ProductID} - {items.NameProduct}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td>
                    <input
                      className="product-quantity"
                      type="number"
                      disabled="disabled"
                      value={items.storage}
                      name="quantity"
                    />
                  </td>
                  <td>Tiền: {items.Prices} VND</td>
                  <td>
                    <EditProduct product={items} />
                    <button
                      type="button"
                      onClick={() => DeleteProduct(items.ProductID)}
                      className="btn"
                    >
                      <FontAwesomeIcon icon={faTrashAlt} />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        )}

        <tfoot></tfoot>
      </table>
    </div>
  );
}
export default TableProduct;
