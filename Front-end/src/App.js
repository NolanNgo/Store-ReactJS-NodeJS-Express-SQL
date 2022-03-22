import "./App.css";
import FormSignin from "./Form/SignIn/FormSignIn";
import FormSignUp from "./Form/SignUp/FormSignUp";
import Page from "./Page/Page";
import MainPage from "./Page/MainPage/MainPage";
// import {} from "react-router";
import { Routes, Route, useLocation } from "react-router-dom";
import Cart from "./Page/Cart/Cart";
// import Navigation from "./Page/Navigation";
import ErrorPage from "./Page/ErrorPage";
import Products from "./Page/Products/ProductDetail";
import { ToastContainer } from "react-toastify";
import Account from "./Page/MyAccount/MyAccount";
import ChangePassForm from "./Form/Changepass/ChangePassForm";
import ListOrder from "./Page/ListOrder/ListOrder";
import AdminPage from "./Page/Admin/AdminPage";
import { AnimationPage, AnimationPage1 } from "./Animation/Animation";
import { AnimatePresence } from "framer-motion";

function App() {
  const location = useLocation();

  return (
    <div className="App">
      <AnimatePresence exitBeforeEnter>
        <Routes key={location.pathname} location={location}>
          <Route path="/" element={<Page />}>
            <Route
              path="/"
              element={
                <AnimationPage>
                  <MainPage />
                </AnimationPage>
              }
            />
            <Route
              path="/product/:id"
              element={
                <AnimationPage>
                  {" "}
                  <Products />
                </AnimationPage>
              }
            />
            <Route
              path="/Order/:id"
              element={
                <AnimationPage>
                  <Cart />
                </AnimationPage>
              }
            />
            <Route
              path="/listorder"
              element={
                <AnimationPage>
                  <ListOrder />
                </AnimationPage>
              }
            />
          </Route>
          <Route path="/account" element={<Account />} />
          <Route
            path="/admin"
            element={
              <AnimationPage1>
                <AdminPage />
              </AnimationPage1>
            }
          />
          <Route path="/editpass" element={<ChangePassForm />} />
          <Route path="/signin" element={<FormSignin />} />
          <Route path="/signup" element={<FormSignUp />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </AnimatePresence>
      <ToastContainer />
    </div>
  );
}
export default App;
