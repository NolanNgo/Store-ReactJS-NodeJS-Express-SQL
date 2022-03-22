// import Card from "./Card";
// import srcUser from "../../Image/SVG/account.png";
// import srcProduct from "../../Image/gift.png";
import TableList from "./TableList";
// import { myGet, myGetWithToken } from "../../Global/myRequest";
import React, { useEffect } from "react";
function ContainerAdmin() {
  // const [result, setResult] = useState([]);
  // const [result1, setResult1] = useState([]);
  // const [result2, setResult2] = useState([]);

  // let headers = useMemo(() => [], []);
  // const token = localStorage.getItem("jwtoken");
  // headers = {
  //   Authorization: `Bearer ${token}`,
  // };
  // const  GetUser = async (e) => {
  //   e.preventDefault();
  //   const token = localStorage.getItem("jwtoken");
  //   headers = {
  //     Authorization: `Bearer ${token}`,
  //   };
  //   setResult1(await myGetWithToken("User", headers));
  // };

  // const test = (response) =>{
  //   // console.log(response);
  //   let result = response.data.reduce((r, a) => {
  //     r[a.orderId] = r[a.orderId] || [];
  //     r[a.orderId].push(a);
  //     return r;
  //   }, Object.create(null));
  //   let result1 = Object.keys(result).map((key) => [ key , result[key]]);
  //   // console.log(resultReduce)
  //   setResult2(result1);
  // }



  // const  GetOrder = async (e) => {
  //   e.preventDefault();
  //   const token = localStorage.getItem("jwtoken");
  //   headers = {
  //     Authorization: `Bearer ${token}`,
  //   };
  //   test(await myGetWithToken("Orders/all", headers));
    
  // };
  useEffect(() => {

  //  const test1 = async ()=>
  //   {
  //     setResult(await myGet("Product"));
  //   }
  //   // async function test2()
  //   // {
  //   //   setResult1(await myGetWithToken("token", headers));
  //   // }

  //   test1();
  //   return () => {};
  });
  
  return (
    <div className="contrainer container-fluid mt-3">
      <div className="container-1 container-fluid">
        <div className="row">
          {/* <Card src={srcUser} nametag={"Người Dùng"} count={result1 && result1.data && result1.data.length ? result1.data.length : 0} />
          <Card src={srcProduct} nametag={"Sản Phẩm"} count={result && result.data && result.data.length ? result.data.length : 0} />
          <Card src={srcProduct} nametag={"Hóa Đơn"} count={result2 && result2.length ? result2.length : 0} /> */}
        </div>
      </div>
      <br />
      <TableList/>
    </div>
  );
}
export default ContainerAdmin;
