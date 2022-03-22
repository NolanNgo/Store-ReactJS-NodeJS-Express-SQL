import Slide from "../Slide/Slide";
import Categories from "../Categories/Categorie";
import {myGet } from "../../Global/myRequest";
import React, { useState, useEffect } from "react";
function MainPage() {
  const [result, setResult] = useState([]);

  useEffect(() => {
    const getAllProduct = async () =>{
      const result = await myGet("Product");
      // console.log(result.data);
      setResult(result.data);
    }
    getAllProduct();

  }, []);

  return (
    <div>
      <Slide />
      <Categories productPros={false} />
      <Categories listPro={result} productPros={true} />
      {/* <Categories listPro={slicedArray2} productPros={true} /> */}
    </div>
  );
}
export default MainPage;
