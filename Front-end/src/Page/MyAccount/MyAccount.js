import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./MyAccount.css";
import {myPut} from '../../Global/myRequest';
import {toastSuccess, toastError} from "../../Global/myToast";

function Account() {
  let navigate = useNavigate();
  const [user, setUser] = useState({
    userName: "",
    name: "",
    email: "",
    address: "",
    phone: "",
  });
  const [dis, setDisable] = useState(true);

  const myEdit = (e) => {
    e.preventDefault();
    setDisable(!dis);
  };
  const handleSubmit = (e)=>{
    e.preventDefault();
    const token = localStorage.getItem("jwtoken");
    const headers = {
      Authorization: `Bearer ${token}`,
    };
  
    
    myPut("Account",headers , user ).then((response)=>{
      if(response.statusRes === true) {
        // console.log(response);
        localStorage.setItem('user', JSON.stringify(response.objAcc) );
        toastSuccess(response.message);
        navigate('/');
      }else{
        toastError(response.message);
      }
    })
  }
  useEffect(() => {
    if (localStorage.getItem("jwtoken") === null) {
      navigate("/signin");
    }
    let items = JSON.parse(localStorage.getItem("user"));
    setUser(items);
  }, [navigate]);
  return (
    <div className="my-profile-container">
      <h1 className="title-my-profile">Thông Tin của bạn</h1>
      <form className="my-profile-form" onSubmit={handleSubmit}>
        <div className="field">
          <input
            type="text"
            name=""
            value={user.address}
            disabled={dis}
            onChange={(e) => setUser({ ...user, address: e.target.value })}
            required
          />
          <span></span>
          <label>Address</label>
        </div>
          <div className="field field-name">
            <input
              type="text"
              name=""
              value={user.name}
              disabled={dis}
              onChange={(e) => setUser({ ...user, name: e.target.value })}
              required
            />
            <span></span>
            <label>Your Name</label>
          </div>
          <div className="field field-phone">
            <input
              type="number"
              name=""
              value={user.phone}
              disabled={dis}
              onChange={(e) => setUser({ ...user, phone: e.target.value })}
              required
            />
            <span></span>
            <label>Your Phone</label>
          </div>
        <div>
          <input
            className="btn_submit"
            type="submit"
            name="sginin"
            value="Thay Đổi Thông Tin"
          ></input>
        </div>
        <div className="signup-link">
          Bạn có muốn chỉnh sửa ?{" "}
          <button className="btn-nav" onClick={myEdit}>
            <i className="fas fa-pencil-alt"></i>
          </button>
        </div>
      </form>
    </div>
  );
}
export default Account;
