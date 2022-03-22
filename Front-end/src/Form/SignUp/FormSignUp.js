// import { Link } from "react-router-dom";
import React, { useState } from "react";
import { myPost } from "../../Global/myRequest";
import { toastSuccess, toastError } from "../../Global/myToast";
import { useNavigate, Link } from "react-router-dom";
import "./FormSignUp.css";
function FormSignUp() {
  const [Repassword, setRepassword] = useState("");
  // const [disable, setDisable] = useState(false);
  const [nameClass1, setnameClass1] = useState("");
  const [nameClass2, setnameClass2] = useState("");
  const [newUser, setNewuser] = useState({
    userName: "",
    password: "",
    name: "",
    email: "",
    cost: 0,
    address: "",
    phone: "",
    isGmail : false,
    role: 1,
  });
  let navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const headers = {
      "Content-Type": "application/json",
    };

    const resultSignUp = await myPost("User/signUp", headers, newUser);
    localStorage.setItem("jwtoken", resultSignUp.AccessToken);
    localStorage.setItem("user", JSON.stringify(resultSignUp.data));
    if (resultSignUp.statusRes) {
      navigate("/");
      toastSuccess(resultSignUp.message);
    } else {
      toastError(resultSignUp.message);
    }
    // myPost('Token/Register',headers,newUser).then((response) => {
    //   localStorage.setItem('jwtoken', response.jwtoken );
    //   localStorage.setItem('user', JSON.stringify(response.objAcc));
    //   if(response.statusRes)
    //   {
    //     console.log(response);
    //     navigate('/');
    //     toastSuccess(response.message);
    //   }else{
    //     toastError(response.message);
    //   }
    // });
    // console.log(newUser);
  };

  const handleOnChange = (e) => {
    let email = e.target.value;
    let re = /^[ ]*([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})[ ]*$/i;
    setNewuser({ ...newUser, email: e.target.value });
    if (re.test(email) || e.target.value === "") {
      //console.log("email valid");
      setnameClass1("");
    } else {
      //console.log("khonh hop le");
      setnameClass1("wrong-email");
    }
  };

  const onChangeValueRePass = (e) => {
    setRepassword(e.target.value);
    if (newUser.password === e.target.value || e.target.value === "") {
      setnameClass2("");
    } else {
      setnameClass2("wrong-password");
    }
  };

  const onChangeValuePass = (e) => {
    setNewuser({ ...newUser, password: e.target.value });
    if (newUser.password === e.target.value || e.target.value === "") {
      setnameClass2("");
    } else {
      setnameClass2("wrong-password");
    }
  };
  return (
    <div className="sign-up-container">
      <h1 className="title-sign-up">Sign Up</h1>
      <form className="sign-up-form" onSubmit={handleSubmit}>
        <div className="field">
          <input
            type="text"
            name=""
            value={newUser.userName}
            onChange={(e) =>
              setNewuser({ ...newUser, userName: e.target.value })
            }
            required
          />
          <span></span>
          <label>Username</label>
        </div>
        <div className="field">
          <input
            type="text"
            name=""
            value={newUser.address}
            onChange={(e) =>
              setNewuser({ ...newUser, address: e.target.value })
            }
            required
          />
          <span></span>
          <label>Address</label>
        </div>
        <div className="row row-password">
          <div className="field field-password-1">
            <input
              type="password"
              name=""
              value={newUser.password}
              onChange={onChangeValuePass}
              required
            />
            <span></span>
            <label>Password</label>
          </div>
          <div className={"field field-password-2 " + nameClass2}>
            <input
              type="password"
              name=""
              value={Repassword}
              onChange={onChangeValueRePass}
              required
            />
            <span></span>
            <label>Re-Password</label>
          </div>
        </div>
        <div className="row row-name-phone">
          <div className="field field-name">
            <input
              type="text"
              name=""
              value={newUser.name}
              onChange={(e) => setNewuser({ ...newUser, name: e.target.value })}
              required
            />
            <span></span>
            <label>Your Name</label>
          </div>
          <div className="field field-phone">
            <input
              type="number"
              name=""
              value={newUser.phone}
              onChange={(e) =>
                setNewuser({ ...newUser, phone: e.target.value })
              }
              required
            />
            <span></span>
            <label>Your Phone</label>
          </div>
        </div>
        <div className={"field " + nameClass1}>
          <input
            type="email"
            name=""
            value={newUser.email}
            onChange={handleOnChange}
            required
          />
          <span></span>
          <label>Email</label>
        </div>

        <input
          className="btn_submit"
          type="submit"
          name="sginin"
          value="Sign up"
        ></input>
        <div className="signup-link">
          Not a member ? <Link to="/signin">Sign In</Link>{" "}
        </div>
      </form>
    </div>
  );
}
export default FormSignUp;
