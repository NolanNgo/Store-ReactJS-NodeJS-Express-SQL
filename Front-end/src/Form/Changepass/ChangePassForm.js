import "./ChangePassForm.css";
import React, { useState } from "react";
import { myPut } from "../../Global/myRequest";
import { toastSuccess, toastError } from "../../Global/myToast";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLongArrowAltLeft } from "@fortawesome/free-solid-svg-icons";

//fa-long-arrow-left
function ChangePassForm() {
  let navigate = useNavigate();
  const [objPass, setObjPass] = useState({
    oldPassword: "",
    newPassword: "",
  });
  const BackHome = (e) => {
    e.preventDefault();
    navigate("/");
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("jwtoken");
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const resultChangePass = await myPut("User/changePass", headers, objPass);
    if (resultChangePass.statusRes === true) {
      toastSuccess(resultChangePass.message);
      navigate("/");
    } else {
      toastError(resultChangePass.message);
    }

    // myPut("Account/changePass",headers ,objPass ).then((response) =>{
    //   if(response.statusRes === true)
    //   {
    //     toastSuccess(response.message);
    //     navigate('/');
    //   }else{
    //     toastError(response.message);
    //   }
    // })
  };
  return (
    <div className="edit-pass-container">
      <h1 className="title-edit-pass">Change Password</h1>
      <form className="edit-pass-form" onSubmit={handleSubmit}>
        <div className="field">
          <input
            type="password"
            name=""
            value={objPass.oldPassword}
            onChange={(e) =>
              setObjPass({ ...objPass, oldPassword: e.target.value })
            }
            required
          />
          <span></span>
          <label>Current Password</label>
        </div>
        <div className="field">
          <input
            type="password"
            name=""
            value={objPass.newPassword}
            onChange={(e) => {
              setObjPass({ ...objPass, newPassword: e.target.value });
            }}
            required
          />
          <span></span>
          <label>New Password</label>
        </div>
        <input
          className="btn btn-primary btn-change"
          type="submit"
          name="login"
          value="Edit Password"
        ></input>
        <div className="signup-link">
          <button className="btn btn-primary" onClick={BackHome}>
            <FontAwesomeIcon icon={faLongArrowAltLeft} />
          </button>
        </div>
      </form>
    </div>
  );
}
export default ChangePassForm;
