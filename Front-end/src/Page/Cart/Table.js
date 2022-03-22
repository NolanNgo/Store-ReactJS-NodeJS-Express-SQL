// // import InfoPro from "./CartProduct";
import React, { useEffect } from "react";
// import pro from "../../Image/product5.jpg";
import { myDelete } from "../../Global/myRequest";
import { toastSuccess, toastError } from "../../Global/myToast";

const Status = (props) =>{
  switch (props.indexStatus) {
    case 0:
      return <td> Giỏ Hàng </td>
    case 1:
      return <td> Chờ Xác Nhận </td>;
    case 2:
      return <td> Đã Xác Nhận Và Xử Lý </td>;
    case 3:
      return <td>Đang Vận Chuyển</td>
    case 4:
      return <td>Đã Giao</td>;
    case 5:
      return <td>Đã Nhận</td>;
    default:
      break;
  }
}
const Table =(props)=> {
  useEffect(() => {
    return () => {
      // This is the cleanup function
    }
  }, []);
  const list = props.listOrder;
  const DeleteProduct = async (e) => {
    const token = localStorage.getItem("jwtoken");
    const orderId = localStorage.getItem("orderID");
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    const resultDelete = myDelete(`Orders/${orderId}/Product/${e}`, headers);
    if(resultDelete.statusRes === true){
      toastSuccess(resultDelete.message);
    }else{
      toastError(resultDelete.message);
    }
  };
  return (
    <table className="table-Order">
      <thead>
        <tr>
          <th>Sản Phẩm</th>
          <th>Số Lượng</th>
          <th>Thành Tiền</th>
          <th>Tác Vụ</th>
          <th>Trạng thái</th>
        </tr>
      </thead>

      <tbody>
        {list && list.length > 0  && list.map((items, i) => {
          return (
            <tr key={i}>
              <td>
                <div className="cart-infor">
                  <img
                    className="cart-info-img"
                    src={items.Image}
                    alt="img-pro"
                  />
                  <div>
                    <p>
                      {items.ProductID} - {items.NameProduct}
                    </p>
                    <p>Pices: {items.Prices} VND</p>
                  </div>
                </div>
              </td>
              <td>
                <input
                  className="product-quantity"
                  type="number"
                  disabled="disabled"
                  value={items.countPro}
                  name="quantity"
                />
              </td>
              <td>Price: {items.Prices}</td>
              <td>
                  <button
                    type="button"
                    onClick={() => DeleteProduct(items.ProductID)}
                    className="btn btn-danger btn-delete-product"
                  >
                    Delete
                  </button>
                </td>
              <Status indexStatus={items.statusOrder} />
            </tr>
          );
        })}
      </tbody>

      <tfoot></tfoot>
    </table>
  );
}
export default Table;
