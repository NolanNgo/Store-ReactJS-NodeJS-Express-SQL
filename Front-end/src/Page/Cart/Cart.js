import Table from "./Table";
import TotalPrices from "./TotalPrices";
import "./Cart.css";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { myGetWithToken ,myPost } from "../../Global/myRequest";
import { useNavigate } from "react-router-dom";
import { toastSuccess,toastError } from "../../Global/myToast";
// import { useReactToPrint } from 'react-to-print';
// import { ComponentToPrint } from './Payment';

const Cart = () => {
  let navigate = useNavigate();
  const params = useParams();
  // const componentRef = useRef(null);
  const [listOrders, setListOrders] = useState([]);
  const [totalprice, setTotalPrice] = useState(0);
  //   const [totalPrices, setTotalPrices] = useState(0);
  const orderID = params.id;
  const [user, setUser] = useState({
    userName: "",
    name: "",
    email: "",
    address: "",
    phone: "",
  });

  useEffect(() => {
    const token = localStorage.getItem("jwtoken");
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const getOrderWithId = async () => {
      const resultGet = await myGetWithToken(`Orders/${orderID}`, headers);
      if(resultGet && resultGet.data  &&  resultGet.data.length > 0) {
          setListOrders(resultGet.data);
      }else{
        localStorage.removeItem("orderID");
        navigate("/");
      }
    }

    if (token === null ) {
      navigate("/signin");
    } else {
      getOrderWithId();
      let items = JSON.parse(localStorage.getItem("user"));
      setUser(items);
      const totalprice = () =>{
        let sum = 0;
        // console.log(listOrders);
        listOrders.map((items, i)=>(sum += (items.countPro * items.Prices)))
        setTotalPrice(sum);
        // console.log(sum)
      }
      totalprice()
    }

    // //https://localhost:44359/api/Order/orderID/HD001
  }, [orderID, navigate, listOrders]);
  // const SubmitOrder  = useReactToPrint({
  //   content: () => componentRef.current,
  //   onAfterPrint: ()  =>{
  //     localStorage.removeItem("orderID");
  //   },
  // });

  // Được dùng để đặt hàng và chuyển trạng thái đơn hàng 
  //sang 1 và xóa mã đơn hàng lưu trong local
  const SubmitOrder  = async() =>
  {
    const token = localStorage.getItem("jwtoken");
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const data = {
      "statusOrder":1
    }
    const resultDH = await myPost(`Orders/status/${orderID}`, headers, data);
    if(resultDH && resultDH.statusRes === true){
      toastSuccess(resultDH.message);
      navigate("/listorder")
    }else{
      toastError(resultDH.message);
    }
    localStorage.removeItem("orderID");
  }




  return (
    <div className="cart-container">
      {/* <ComponentToPrint  orderID={orderID} listOrders={listOrders} total={totalprice}  ref={componentRef} /> */}
      <h1 className="title-payment">Hóa Đơn Của Bạn: {orderID} </h1>
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
      <Table listOrder={listOrders} />
      <TotalPrices total={totalprice} />
      <button className="btn btn-primary" onClick={SubmitOrder}>Đặt Hàng</button>
    </div>
  );
}


export default Cart;
