import pro from "../../Image/product5.jpg";
function CartProduct() {
  return (
    <div className="cart-infor">
      <img className="cart-info-img" src={pro} alt="img-pro" />
      <div>
        <p>
          ID - Name
        </p>
        <p>Pices: 500000 VND</p>
      </div>
    </div>
  );
}
export default CartProduct;
