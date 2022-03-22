import React from "react";
import Table from "./Table";
import TotalPrices from "./TotalPrices";
import {useEffect , useState} from "react";
import { useNavigate } from "react-router-dom";
export const ComponentToPrint = React.forwardRef((props, ref) => {
    let navigate = useNavigate();
    const [user, setUser] = useState({
        userName: "",
        name: "",
        email: "",
        address: "",
        phone: "",
      });
      useEffect(() => {
        if (localStorage.getItem("jwtoken") === null) {
          navigate("/signin");
        }else{
          let items = JSON.parse(localStorage.getItem("user"));
          setUser(items);
        }
      }, [navigate]);
  return (
    <div className="container-payment" ref={ref}>
        <h1 className="title-payment">Hóa Đơn Của Bạn: {props.orderID} </h1>
      <form>
        <div className="form-row">
          <div className="form-group col-md-6">
            <label>Họ Và Tên: {user.name}</label>
          </div>
          <div className="form-group col-md-6">
            <label>Phone: {user.phone}</label>
          </div>
        </div>
        <div className="form-row">
          <div className="form-group col-md-6">
          <label>Address: {user.address}</label>
          </div>
          <div className="form-group col-md-6">
            <label >Email: {user.email}</label>
          </div>
        </div>
      </form>
      <Table listOrder={props.listOrders} />
      <TotalPrices total={props.total} />
    </div>
  );
});
