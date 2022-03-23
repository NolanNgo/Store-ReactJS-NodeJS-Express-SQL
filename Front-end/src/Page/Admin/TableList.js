import TableProduct from "./TableProduct";
import TableUser  from "./TableUser";
import TableOrder from "./TableOrder";
import AddProduct from "./formAddProduct/AddProduct";
const  TableList=(props)=>
{
    // console.log(result);
    return(
        <div className="content-2">
            <AddProduct/>
            <TableProduct/>
            <TableUser/>
            <TableOrder/>
            {/* {
                props.listOrder && props.listOrder.length > 0 &&
                props.listOrder.map((items,i)=>{
                    return <TableOrder key={i} titleOrder={items[0]} listOrder={items[1]}/>
                })
            } */}

        </div>
    )
}
export default TableList;