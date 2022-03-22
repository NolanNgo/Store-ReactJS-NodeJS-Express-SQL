import { useParams, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { myGet , myPost } from "../../Global/myRequest";
import "./ProductDetails.css";
import {createOrderID} from "../../Global/helpful";
import {toastSuccess, toastError} from "../../Global/myToast";
import Categories from "../Categories/Categorie";

function ProductDetail() {
  const params = useParams();
  const [products, setProduct] = useState([]);
  const [countProduct, setcountProduct] = useState(0);
  const [result, setResult] = useState([]);
  const [ProductID , setProductId] = useState("");
  const id = params.id;
  let navigate = useNavigate();




  useEffect( () => {
      setProductId(id);
      const getDetailPro = async (id) =>{
        const inForPro = await myGet(`Product/${id}`);
        setProduct(inForPro.data[0]);
      }
      const getAllProductSameType = async (id) => {
        const allProSameType = await myGet(`Product/type/${id}`)
        setResult(allProSameType.data);
      }
      getDetailPro(id);
      getAllProductSameType(products.ProductTypeID);
      return () => {
        // This is the cleanup function
      }
  }, [id,products]);



  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("jwtoken");
    if(token === null)
    {
      toastError("Bạn Cần Đăng Nhập");
      navigate("/signin");
    }else{
      const orderId =  createOrderID();
      const headers = {
        'Content-Type': 'application/json',
        "Authorization" : `Bearer ${token}`
      }
      // let countProduct = 
      const data = {
        orderId,
        ProductID,
        "countProduct": parseInt(countProduct),
        "statusOrder" : 0
      }
      // console.log(data,)
      const resultAddOrder = await myPost("Orders",headers,data);
      if(resultAddOrder && resultAddOrder.statusRes === true)
      {
        toastSuccess(resultAddOrder.message);
      }else{
        toastError(resultAddOrder.message);
      }
    }
    // console.log(products);
  };





  return (
    <div className="product-detail-container">
      <div className="row row-product-details">
        <div className="col-2-product">
          <img
            className="img-product-detail"
            src={products.Image}
            alt="product1"
          ></img>
        </div>
        <div className="col-2-product-details">
          <h2 className="name-product">
            {products.ProductID} - {products.NameProduct}
          </h2>
          <h4 className="cost-product">{products.Prices} VND </h4>
          <h3 className="title-details">Chi Tiết Sản Phẩm</h3>
          <p className="product-details">
            {products.description}
          </p>
          <form onSubmit={handleSubmit}>
            <input
              className="input-count"
              value={countProduct}
              onChange={(e) => {
                setcountProduct(e.target.value);
              }}
              name="countProduct"
              type="number"
            />
            <button className="btn-primary btn-add-cart">Add to Cart</button>
          </form>
        </div>
      </div>
      <Categories listPro={result} productPros={true} />
    </div>
  );
}
export default ProductDetail;
