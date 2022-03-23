// import EditProduct from "./formEditProduct/EditProduct";
import { myGetWithToken } from "../../Global/myRequest";
// import { toastSuccess, toastError } from "../../Global/myToast";
import React, { useState, useEffect, useContext } from "react";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'
// import classNames from 'classnames';
import { AdminContext } from "../../Context/AdminContext";
function TableUser(props) {
  const [listUser, setListUser] = useState([]);
  const { setResult1 } = useContext(AdminContext);
  useEffect(() => {
    const getUser = async () => {
      const token = localStorage.getItem("jwtoken");
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      setListUser(await myGetWithToken("User", headers));
    };
    getUser();
    setResult1(listUser && listUser.data && listUser.data.length > 0 ? listUser.data.length : 0);
    return () => {};
  });
  return (
    <div className="table-user-admin">
      <h1>Bảng Người Dùng</h1>
      {/* <PaginationProduct list={props.listPro} /> */}
      <table className="table-user">
        <thead>
          <tr>
            <th>Email - Họ và Tên</th>
            <th>Phone - Mã Tài Khoản </th>
            <th>Địa Chỉ</th>
          </tr>
        </thead>
        {listUser && listUser.data && listUser.data.length > 0 && (
          <tbody>
            {listUser.data.map((items, i) => {
              return (
                <tr key={i}>
                  <td>
                    <div className="cart-infor-1">
                      <div>
                        <p>
                          {items.email} <br /> {items.name}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td>
                    {items.phone} <br />
                    {items.accountId}{" "}
                  </td>
                  <td>{items.address}</td>
                </tr>
              );
            })}
          </tbody>
        )}
        {/* <tbody>
          {props.listUser.map((items, i) => {
            return (
              <tr key={i}>
                <td >
                  <div className="cart-infor-1">
                    <div>
                      <p>
                        {items.email} <br/> {items.name}
                      </p>
                    </div>
                  </div>
                </td>
                <td>{items.phone} <br/>{items.accountId}  </td>
                <td>
                    {items.address}
                </td>
              </tr>
            );
          })}
        </tbody> */}
        <tfoot></tfoot>
      </table>
    </div>
  );
}
export default TableUser;
