function Cell(props)
{
    return(
        <div className="col-3-cate">
            <img className="img-theme" src={props.imgSrc} alt="img-pro"></img>
        </div>
    )
}
export default Cell;