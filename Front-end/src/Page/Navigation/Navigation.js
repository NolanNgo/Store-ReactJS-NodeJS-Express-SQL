import logo from "../../Image/logo.png";
import "./Navigation.css";
import {useEffect} from "react";
import {toastError} from "../../Global/myToast";
// import home from "../../Image/SVG/home.png";
// import account from "../../Image/SVG/account.png";
// import shoping from "../../Image/SVG/shopping-bag.png";
// import search from "../../Image/SVG/search.png";
// import admin from "../../Image/SVG/admin.png";
import { useNavigate } from "react-router-dom";
function Navigation() {
  const user = JSON.parse(localStorage.getItem("user"));
  let navigate = useNavigate();
  function handleClick() {
    navigate("/");
  }
  useEffect(() => {
    return () => {
      // This is the cleanup function
    }
  }, []);

  return (
    <div className="navigation ">
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="my-logo" onClick={handleClick}>
        <img className="my-logo-img" src={logo} width="150px" alt="logo"></img>
      </div>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>

  <div className="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
    <ul className="navbar-nav ml-auto ul-navigation">
      <li className="nav-item active li-navigation">
        {  user === null || user.role !== 0  ? null : <Admin/>}
      </li>
      <li className="nav-item active li-navigation">
        <Home />
      </li>
      <li className="nav-item li-navigation">
        {user === null ? null : <Shopping />}
      </li>
      <li className="nav-item li-navigation">
        {user === null ? <SignInUp/> : <Account />}
      {/* <Account /> */}
      </li>
      {/* <li className="nav-item li-navigation">
        <Search/>
      </li> */}
    </ul>
      </div>
      </nav>
    </div>
  );
}
function Home() {
  let navigate = useNavigate();
  function handleClick() {
    navigate("/");
  }
  return (
    <button className="btn-nav" onClick={handleClick}>
      Trang Chủ
    </button>
  );
}


function SignInUp() {
  let navigate = useNavigate();
  function handleClick() {
    navigate("/signin");
  }
  return (
    <button className="btn-nav" onClick={handleClick}>
      Đăng Nhập
    </button>
  );
}


function Account() {
  const user = JSON.parse(localStorage.getItem("user"));
  // console.log(user);
  let navigate = useNavigate();
  const handleClick=(e)=> {
    navigate('/account');
  }
    const SignOut = (e) => {
    localStorage.removeItem("jwtoken");
    localStorage.removeItem("user");
    navigate("/signin");
  }
  const ChangePassForm = (e)=>{
    navigate("/editpass");
  }
  // return  <button className="btn-nav" onClick={handleClick}> <img className="logo-nav"  src={account} alt="icon-home"></img> </button>
  return (
    <div className="dropdown">
      <div className="dropbtn btn-nav"> Tài Khoản </div>
      <div className="dropdown-content">
        <div className="dropdow-btn-nav" onClick={handleClick} >{user && user.name ? user.name : user.email}</div>
        <div className="dropdow-btn-nav" onClick={SignOut}>Đăng xuất</div>
        <div className="dropdow-btn-nav" onClick={ChangePassForm}>Đổi mật khẩu</div>
      </div>
    </div>
  );
}



const Shopping = ()=> {
  let navigate = useNavigate();
  const handleClick =()=> {
    const orderId = localStorage.getItem("orderID");
    if(orderId === null)
    {
      toastError("Vui Lòng Tiến Hành Đặt Hàng");
    }else{
      navigate(`/order/${orderId}`);
    }
  }
  const ListOrder = () =>{
    navigate("/listorder")
  }
  return (

    <div className="dropdown">
    <button className="btn-nav">
      Đơn Hàng
    </button>
    <div className="dropdown-content">
      <div className="dropdow-btn-nav" onClick={handleClick}>Đơn Hàng Hiện Tại</div>
      <div className="dropdow-btn-nav" onClick={ListOrder}>Danh Sách Đơn Hàng</div>
    </div>
  </div>
  );
}
// function Search() {
//   // let navigate = useNavigate();
//   // function handleClick() {
//   //   navigate("/search");
//   // }
//   return (
//     <form className="form-inline justify-content-center my-2 my-lg-0">
//       <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"/>
//       <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
//     </form>
//   );
// }
function Admin() {
  let navigate = useNavigate();
  function handleClick() {
    navigate("/admin");
  }
  return (
    <button className="btn-nav" onClick={handleClick}>
      Admin
      {/* {" "}
      <img className="logo-nav" src={admin} alt="icon-home"></img>{" "} */}
    </button>
  );
}
export default Navigation;
