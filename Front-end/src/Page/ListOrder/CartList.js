// import { useState } from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faCheckDouble, faPenSquare, faCheck } from "@fortawesome/free-solid-svg-icons";
import { myPost } from "../../Global/myRequest";
import { toastSuccess, toastError } from "../../Global/myToast";

const Status = (props) => {
  switch (props.indexStatus) {
    case 0:
      return <td> Giỏ Hàng </td>;
    case 1:
      return <td> Chờ Xác Nhận </td>;
    case 2:
      return <td> Đang Xử Lý </td>;
    case 3:
      return <td>Đang Vận Chuyển</td>;
    case 4:
      return <td>Đã Giao</td>;
    case 5:
      return <td>Đã Nhận</td>;
    case 6:
      return <td>Hủy</td>;
    default:
      break;
  }
};

const Table = (props) => {
  // const [statusOrder, setStatus] = useState(0);
  // useEffect(() => {
  //   return () => {
  //     // This is the cleanup function
  //   }
  // }, []);
  
  const ConfirmOrder = async (e, id, status, updateState) => {
    e.preventDefault();
    // console.log(id, status, updateState);
    if (status !== updateState ) {
      const token = localStorage.getItem("jwtoken");
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const data1 = {
        statusOrder: updateState,
      };
      const resultDH1 = await myPost(`Orders/status/${id}`, headers, data1);
      if (resultDH1 && resultDH1.statusRes === true) {
        toastSuccess(resultDH1.message);
      } else {
        toastError(resultDH1.message);
      }
    }else{
      toastError("Cập Nhật Trạng Thái Thất Bại");
    }
  };
  const list = props.listOrder;
  return (
    <table className="table-Order">
      <thead>
        <tr>
          <th>{props.titleOrder}/Sản Phẩm</th>
          <th>Số Lượng</th>
          <th>Thành Tiền</th>
          <th>Trạng Thái Đơn Hàng</th>
          <th>Tác Vụ</th>
        </tr>
      </thead>

      <tbody>
        {list &&
          list.length > 0 &&
          list.map((items, i) => {
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
                <td>Prices: {items.countPro * items.Prices}</td>
                <Status indexStatus={items.statusOrder} />
                <td>
                  {items.statusOrder === 4 ? (
                    <button
                      type="button"
                      className="btn btn-danger mx-1 mb-2 w-100"
                      onClick={(e) =>
                        ConfirmOrder(e, props.titleOrder, items.statusOrder, 5)
                      }
                    >
                      Xác Nhận
                    </button>
                  ) : null}
                  {items.statusOrder >0 && items.statusOrder < 2 ? (
                    <button
                      type="button"
                      className="btn btn-danger mx-1 mb-2 w-100"
                      onClick={(e) =>
                        ConfirmOrder(e, props.titleOrder, items.statusOrder, 6)
                      }
                    >
                      Hủy Đơn
                    </button>
                  ) : null}
                </td>
              </tr>
            );
          })}
      </tbody>

      <tfoot></tfoot>
    </table>
  );
};
export default Table;
