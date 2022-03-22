import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckDouble,
  faPenSquare,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";
import { myPost, myGetWithToken } from "../../Global/myRequest";
// import { useNavigate } from "react-router-dom";
import { toastSuccess, toastError } from "../../Global/myToast";
import React, { useState, useEffect } from "react";
const Status = (props) => {
  switch (props.indexStatus) {
    case 0:
      return <td rowSpan={props.rowSpan}> Giỏ Hàng </td>;
    case 1:
      return <td rowSpan={props.rowSpan}> Chờ Xác Nhận </td>;
    case 2:
      return <td rowSpan={props.rowSpan}> Đang Xử Lý </td>;
    case 3:
      return <td rowSpan={props.rowSpan}>Đang Vận Chuyển</td>;
    case 4:
      return <td rowSpan={props.rowSpan}>Đã Giao</td>;
    case 5:
      return <td rowSpan={props.rowSpan}>Đã Nhận</td>;
    case 6:
      return <td rowSpan={props.rowSpan}>Hủy</td>;
    default:
      break;
  }
};

const TableOrder = (props) => {
  const [listOrder, setListOrder] = useState([]);

  useEffect(() => {
    const formatData = (response) => {
      // console.log(response);
      let result = response.data.reduce((r, a) => {
        r[a.orderId] = r[a.orderId] || [];
        r[a.orderId].push(a);
        return r;
      }, Object.create(null));
      let result1 = Object.keys(result).map((key) => [ key , result[key]]);
      // console.log(resultReduce)
      setListOrder(result1);
    };
    const getUset = async () => {
      const token = localStorage.getItem("jwtoken");
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      formatData(await myGetWithToken("Orders/all", headers));
    };
    getUset();
  });

  const ConfirmOrder = async (e, id, status, updateState) => {
    e.preventDefault();
    // alert(e.target);
    // console.log(id, status);
    const token = localStorage.getItem("jwtoken");
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    switch (status) {
      case 0:
        break;
      case 1:
        const data1 = {
          statusOrder: updateState,
        };
        const resultDH1 = await myPost(`Orders/status/${id}`, headers, data1);
        if (resultDH1 && resultDH1.statusRes === true) {
          toastSuccess(resultDH1.message);
        } else {
          toastError(resultDH1.message);
        }
        break;
      case 2:
        const data2 = {
          statusOrder: updateState,
        };
        const resultDH2 = await myPost(`Orders/status/${id}`, headers, data2);
        if (resultDH2 && resultDH2.statusRes === true) {
          toastSuccess(resultDH2.message);
        } else {
          toastError(resultDH2.message);
        }
        // toastError("Đơn Hàng Xác Nhận Và Xử lý");
        break;
      case 3:
        const data3 = {
          statusOrder: updateState,
        };
        const resultDH3 = await myPost(`Orders/status/${id}`, headers, data3);
        if (resultDH3 && resultDH3.statusRes === true) {
          toastSuccess(resultDH3.message);
        } else {
          toastError(resultDH3.message);
        }
        break;
      case 4:
        toastError("Đơn Hàng Đã Giao");
        break;
      case 5:
        toastError("Đơn Hàng Đã Nhận");
        break;
      case 6:
        toastError("Đơn Hàng Đã Hủy");
        break;
      default:
        break;
    }
  };
  return (
    <div className="table-order-admin">
      <h1>Bảng Hóa Đơn</h1>
      {listOrder &&
        listOrder.length > 0 &&
        listOrder.map((items1, i) => {
          return (
            <table className="table-Order" key={i}>
              <thead>
                <tr>
                  <th>{items1[0]}/Sản Phẩm</th>
                  <th>Thông Tin Khách Hàng</th>
                  <th>Số Lượng</th>
                  <th>Thành Tiền</th>
                  <th>Trạng Thái Đơn Hàng</th>
                  <th>Tác Vụ</th>
                </tr>
              </thead>
              <tbody>
                {items1[1] &&
                  items1[1].length > 0 &&
                  items1[1].map((items, i) => {
                    return (
                      <tr key={i}>
                        <td>
                          <div className="cart-infor-admin-order">
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
                        {i === 0 ? (
                          <td rowSpan={listOrder.length}>
                            Email : {items.email} <br />
                            Name : {items.name} <br />
                            Phone : {items.phone} <br />
                          </td>
                        ) : null}
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
                        {i === 0 ? (
                          <Status
                            rowSpan={listOrder.length}
                            indexStatus={items.statusOrder}
                          />
                        ) : null}
                        <td>
                          <button type="button" className="btn">
                            <FontAwesomeIcon
                              icon={faCheck}
                              onClick={(e) =>
                                ConfirmOrder(
                                  e,
                                  props.titleOrder,
                                  items.statusOrder,
                                  2
                                )
                              }
                            />
                          </button>
                          <button
                            type="button"
                            className="btn"
                            onClick={(e) =>
                              ConfirmOrder(
                                e,
                                props.titleOrder,
                                items.statusOrder,
                                3
                              )
                            }
                          >
                            <FontAwesomeIcon icon={faCheckDouble} />
                          </button>
                          <button
                            type="button"
                            className="btn"
                            onClick={(e) =>
                              ConfirmOrder(
                                e,
                                props.titleOrder,
                                items.statusOrder,
                                4
                              )
                            }
                          >
                            <FontAwesomeIcon icon={faPenSquare} />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
              <tfoot></tfoot>
            </table>
          );
        })}
    </div>

  );
};
export default TableOrder;
