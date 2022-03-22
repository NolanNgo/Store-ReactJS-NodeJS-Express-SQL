import { useNavigate } from "react-router-dom";
import {useEffect} from "react";
function CellProduct(props)
{
    useEffect(()=>{

    },[])
    const products = props.items;
    let navigate = useNavigate();
    function handleClick() {
        navigate(`/product/${products.ProductID}`);
    };
    return(
        <div className="col-4-pro" onClick={handleClick}>
            <img className="img-theme" src={products.Image} alt="img-pro"></img>
            <h6>{products.ProductID} - {products.NameProduct}</h6>
            <p>{products.Prices}</p>
        </div>
    )
}
export default CellProduct;