import { useNavigate } from "react-router-dom";

function createOrderID() {
  let OrderID = localStorage.getItem("orderID");
  if (!OrderID) {
    let today = new Date();
    OrderID =
      "HD" +
      today.getDate().toString() +
      (today.getMonth()+1).toString() +
      today.getFullYear().toString() +
      today.getHours().toString() +
      today.getMinutes().toString() +
      today.getSeconds().toString();
    localStorage.setItem("orderID", OrderID);
  }
  return OrderID;
}
function CheckLogin() {
  let navigate = useNavigate();
  if (localStorage.getItem("jwtoken") === null) {
    navigate("/signin");
  }
}
export { createOrderID, CheckLogin };
