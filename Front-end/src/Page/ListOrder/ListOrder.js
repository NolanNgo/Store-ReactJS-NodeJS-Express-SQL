import Table from "./CartList";
import React, { useState, useEffect ,useMemo } from "react";
import { myGetWithToken } from "../../Global/myRequest";
import { useNavigate } from "react-router-dom";
import "./ListOrder.css";

function ListOrder() {
  let navigate = useNavigate();
  const [listOrder, setListOrder] = useState([]);
  const token = localStorage.getItem("jwtoken");
  let headers = useMemo(() => [], []);
  headers = {
    Authorization: `Bearer ${token}`,
  };
  const test = (response) =>{
    // console.log(response);
    let result = response.reduce((r, a) => {
      r[a.orderId] = r[a.orderId] || [];
      r[a.orderId].push(a);
      return r;
    }, Object.create(null));
    let result1 = Object.keys(result).map((key) => [ key , result[key]]);
    // console.log(result1);
    setListOrder(result1);
  }
  useEffect(() => {
    const getList = async ()=>{
      const resultListOrder = await myGetWithToken("Orders/User", headers);
      test(resultListOrder.data);
      // // return resultListOrder
      // // console.log(Orders);
    }
    if (token === null) {
      navigate("/signin");
    }else{
      getList();
      // console.log(result.data);
      // test(result);
      // myGetWithToken("Orders", headers).then((response) => {
      //   test(response);
      // });
    }
    
  },[headers,token , navigate]);
  // console.log(typeof (listOrder));
  return (
    <div className="cart-container">
      {listOrder.map((items, i)=> (
        <Table titleOrder={items[0]} listOrder={items[1]} key={i}></Table>
      ))}
    </div>
  );
}
export default ListOrder;
