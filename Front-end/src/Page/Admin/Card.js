function Card(props)
{
    return(
        <div className="content col">
            <div className="card-admin">
                <div className="card-admin-child">
                    <div className="box">
                        <h2>{props.nametag}</h2>
                        <h3>{props.count}</h3>
                    </div>
                <div className="icon">
                    <img src={props.src} alt=""/>
                </div>
                </div>
            </div>
        </div>
    )
}
export default Card