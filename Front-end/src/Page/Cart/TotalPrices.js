import {useEffect} from "react";
function TotalPrices(props) {
  useEffect(() => {
    return () => {
      // This is the cleanup function
    }
  }, []);
  return (
    <div className="total-prices">
      <table className="table-total-prices">
        <tbody>
          <tr>
            <td>Thành Tiền</td>
            <td>{props.total}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
export default TotalPrices;
