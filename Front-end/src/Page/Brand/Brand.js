import br1 from "../../Image/brands/brand1.png";
import br2 from "../../Image/brands/brand2.png";
import br3 from "../../Image/brands/brand3.png";
import br4 from "../../Image/brands/brand4.png";
import "./Brand.css";
import CardBrand from "./CardBrand";
function Brand() {
  const items = [
    { id: 1, img: br1 },
    { id: 2, img: br2 },
    { id: 3, img: br3 },
    { id: 4, img: br4 },
  ];
  return (
    <div className="brands">
      <div className="brands-container">
        <div className="row-brands">
          {items.map((i) => (
            <CardBrand imgSrc={i.img} key={i.id} />
          ))}
        </div>
      </div>
    </div>
  );
}
export default Brand;
