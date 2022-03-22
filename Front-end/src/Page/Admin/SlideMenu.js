// import srclistUser from "../../Image/contacts.png";
// import srclistProduct from "../../Image/list.png";
// import srclistOrder from "../../Image/clipboard.png";
// import srcHome from "../../Image/home.png";
import { useNavigate } from "react-router-dom";
import logo from "../../Image/logo.png"
function SlideMenu() {
  let navigate = useNavigate();
  const handleClick = (e) => {
    e.preventDefault();
    navigate("/");
  };
  return (
    <div className="navigation container-navigation ">
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="my-logo" onClick={handleClick}>
          <img
            className="my-logo-img"
            src={logo}
            width="150px"
            alt="logo"
          ></img>
        </div>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className="collapse navbar-collapse justify-content-end"
          id="navbarSupportedContent"
        >
          <ul className="navbar-nav ml-auto ul-navigation">
            <li className="nav-item active li-navigation">
              <Home />
            </li>
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
// function Home() {

//   function handleClick() {
//     navigate("/");
//   }
//   return (
//     <button className="btn-nav" onClick={handleClick}>
//       {" "}
//       <img className="logo-nav" src={home} alt="icon-home"></img>{" "}
//     </button>
//   );
// <div className="slide-menu">
//   <div className="brand-name">
//     <h1>Dashboard</h1>
//   </div>
//   <ul className="list-admin">
//     <li className="nav-admin"> <img className="logo-nav-admin" src={srclistProduct} alt=""/> <span>List Product</span> </li>
//     <li className="nav-admin"> <img className="logo-nav-admin" src={srclistUser} alt=""/> <span>List User</span></li>
//     <li className="nav-admin"> <img className="logo-nav-admin" src={srclistOrder} alt=""/> <span>List Order</span> </li>
//     <li className="nav-admin" onClick={handleClick}> <img className="logo-nav-admin" src={srcHome} alt=""/> <span>Home</span></li>

//   </ul>
// </div>
export default SlideMenu;
