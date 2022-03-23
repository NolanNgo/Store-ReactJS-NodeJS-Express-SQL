import Card from "./Card";
import srcUser from "../../Image/SVG/account.png";
import srcProduct from "../../Image/gift.png";
import TableList from "./TableList";
// import { myGet, myGetWithToken } from "../../Global/myRequest";
import React, { useEffect, useState } from "react";
import { AdminContext } from "../../Context/AdminContext";

function ContainerAdmin() {
  const [result, setResult] = useState(0);
  const [result1, setResult1] = useState(0);
  const [result2, setResult2] = useState(0);

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

  // const getUser = () => {}
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
  // console.log(result);
  return (
    <AdminContext.Provider value={{result,result1,result2 , setResult,setResult1,setResult2 }}>
      <div className="contrainer container-fluid mt-3">
        <div className="container-1 container-fluid">
          <div className="row">
            <Card src={srcUser} nametag={"Người Dùng"} count={result1} />
          <Card src={srcProduct} nametag={"Hóa Đơn"} count={result2} />
            <Card
              src={srcProduct}
              nametag={"Sản Phẩm"}
              count={result}
            />
          </div>
        </div>
        <br />
        <TableList />
      </div>
    </AdminContext.Provider>
  );
}
export default ContainerAdmin;
