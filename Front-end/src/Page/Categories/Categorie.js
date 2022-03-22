import Cell from "./Cell";
import Cell2 from "./CellProducts";
import "./Categorie.css";
import cate1 from "../../Image/1.jpg";
import cate2 from "../../Image/2.jfif";
import cate3 from "../../Image/3.jpg";
import {useEffect} from "react";
// import pro1 from "../../Image/product1.jpg";
// import pro2 from "../../Image/product3.jpg";
// import pro3 from "../../Image/product4.jpg";
// import pro4 from "../../Image/product5.jpg";

function Categories(props) {
  useEffect(()=>{

  },[])
  let isProduct = props.productPros;
  let listProduct = props.listPro;
  // console.log(listProduct);
  if (isProduct) {
    return (
      <div>
        <ProductsUI list={listProduct} />
      </div>
    );
  }
  return <CategoryUI />;
}
function CategoryUI() {
  const items = [
    { id: 1, img: cate1 },
    { id: 2, img: cate2 },
    { id: 3, img: cate3 },
  ];
  return (
    <div className="category-container">
      <div className="row-category-cate">
        {items.map((i) => (
          <Cell imgSrc={i.img} key={i.id} />
        ))}
      </div>
    </div>
  );
}
function ProductsUI(props) {
  const items = props.list;
  // const items = [
  //   {
  //     productID: "PR01",
  //     nameProduct: "Bàn phím Keychron K6",
  //     prices: 3500000,
  //     storage: 20,
  //     image:
  //       "https://res.cloudinary.com/dd1vmklog/image/upload/v1637693506/dev_setup/product1_hhkoho.jpg",
  //     productTypeID: 5,
  //   },
  //   {
  //     productID: "PR02",
  //     nameProduct: "Bàn phím Keychron K6",
  //     prices: 3500000,
  //     storage: 20,
  //     image:
  //       "https://res.cloudinary.com/dd1vmklog/image/upload/v1637693506/dev_setup/product1_hhkoho.jpg",
  //     productTypeID: 5,
  //   },
  //   {
  //     productID: "PR03",
  //     nameProduct: "Bàn phím Keychron K6",
  //     prices: 3500000,
  //     storage: 20,
  //     image:
  //       "https://res.cloudinary.com/dd1vmklog/image/upload/v1637693506/dev_setup/product1_hhkoho.jpg",
  //     productTypeID: 5,
  //   },
  //   {
  //     productID: "PR04",
  //     nameProduct: "Bàn phím Keychron K6",
  //     prices: 3500000,
  //     storage: 20,
  //     image:
  //       "https://res.cloudinary.com/dd1vmklog/image/upload/v1637693506/dev_setup/product1_hhkoho.jpg",
  //     productTypeID: 5,
  //   },
  // ];
  return (
    <div className="category-container">
      <h2 className="title">Products</h2>
      <div className="row-category">
        {items.map((items, index) => (
          <Cell2 items={items} key={index} />
        ))}
      </div>
    </div>
  );
}
export default Categories;
