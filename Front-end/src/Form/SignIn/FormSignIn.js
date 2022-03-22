import React, { useState, useEffect } from "react";
import { myPost } from "../../Global/myRequest";
import "./FormSignIn.css";
import { toastSuccess, toastError } from "../../Global/myToast";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLongArrowAltLeft } from "@fortawesome/free-solid-svg-icons";
import { GoogleLogin } from "react-google-login";

const FormLogin = () => {
  const [valueName, setValueName] = useState("");
  const [valuePass, setValuePass] = useState("");

  const [accGoogle, setaccGoogle] = useState({
    name: "",
    email: "",
    isGmail: true,
    idGoogle: "",
    role: 1,
  });

  let navigate = useNavigate();
  const BackHome = (e) => {
    e.preventDefault();
    navigate("/");
  };
  useEffect(() => {
    const user = localStorage.getItem("user");
    const jwt = localStorage.getItem("jwtoken");
    if (user && jwt) {
      navigate("/");
    }
  }, [navigate]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { userName: valueName, password: valuePass };
    const headers = {
      "Content-Type": "application/json",
    };
    const resultLogin = await myPost("User/signIn", headers, data);
    localStorage.setItem("jwtoken", resultLogin.AccessToken);
    localStorage.setItem("user", JSON.stringify(resultLogin.data));
    if (resultLogin.statusRes) {
      if (resultLogin.data.role === 0) {
        navigate("/admin");
        return toastSuccess(resultLogin.message);
      } else {
        navigate("/");
        return toastSuccess(resultLogin.message);
      }
    } else {
      return toastError(resultLogin.message);
    }
  };

  const handleLogin = async (resGoogle) => {
    setaccGoogle({
      ...accGoogle,
      name: resGoogle.profileObj.name,
      email: resGoogle.profileObj.email,
      idGoogle: resGoogle.googleId,
    });

    let newAcc = {
      ...accGoogle , 
      name: resGoogle.profileObj.name,
      email: resGoogle.profileObj.email,
      idGoogle: resGoogle.googleId,
    }

    const headers = {
      "Content-Type": "application/json",
    };
    const resultLoginGoogle = await myPost("User/signInGoogle", headers,newAcc);
    // console.log(resultLoginGoogle);
    localStorage.setItem("jwtoken", resultLoginGoogle.AccessToken);
    localStorage.setItem("user", JSON.stringify(resultLoginGoogle.data[0]));
    if(resultLoginGoogle.statusRes)
    {
      if(resultLoginGoogle && resultLoginGoogle.data.role === 0){
        navigate("/admin");
        return toastSuccess(resultLoginGoogle.message);
      }else{
        navigate("/");
        return toastSuccess(resultLoginGoogle.message);
      }
    }else{
      return toastError(resultLoginGoogle.message);
    }
    // console.log(resultLoginGoogle);
  };

  const handleFailure = (result) => {
    console.log(result);
  };
  const onChangeValueName = (e) => {
    setValueName(e.target.value);
  };
  const onChangeValuePass = (e) => {
    setValuePass(e.target.value);
  };
  return (
    <div className="sign-in-container">
      <h1 className="title-sign-in">Sign In</h1>
      <form className="sign-in-form" onSubmit={handleSubmit}>
        <div className="field">
          <input
            type="text"
            name=""
            value={valueName}
            onChange={onChangeValueName}
            required
          />
          <span></span>
          <label>Username</label>
        </div>
        <div className="field">
          <input
            type="password"
            name=""
            value={valuePass}
            onChange={onChangeValuePass}
            required
          />
          <span></span>
          <label>Password</label>
        </div>
        {/* <div className="forget_pass">Forget Password</div> */}
        <input
          className="btn_submit"
          type="submit"
          name="login"
          value="Sign In"
        ></input>
        <div className="signup-link">
          <div>
            Not a member ? <Link to="/signup">Sign Up</Link>
          </div>
          <button className="btn btn-primary" onClick={BackHome}>
            <FontAwesomeIcon icon={faLongArrowAltLeft} />
          </button>
          <GoogleLogin
            clientId="827944562040-ak8ensv84eb0po061pvlsapik6j8ge65.apps.googleusercontent.com"
            onFailure={handleFailure}
            onSuccess={handleLogin}
            cookiePolicy={"single_host_origin"}
          />
        </div>
      </form>
    </div>
  );
};
export default FormLogin;
