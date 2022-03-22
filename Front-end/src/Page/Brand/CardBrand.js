function CardBrand(props)
{
    return(
        <div className="col-4 col-4-brands">
            <img className="image-brand" src={props.imgSrc} alt={props.imgSrc}></img>
        </div>
    )
}
export default CardBrand;