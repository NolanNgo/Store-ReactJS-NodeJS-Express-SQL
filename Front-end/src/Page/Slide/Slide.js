import './Slide.css';
import {useEffect} from "react";
function Slide()
{
    useEffect(() => {
        return () => {
          // This is the cleanup function
        }
      }, []);
    return(
        <div className="row-slide">
            <div className="col-2-slide">
                <h2>Bạn muốn sở hữu <br/> một bộ bàn phím, chuột, tai nghe chất lượng ? </h2>
                <p>Bàn phím chơi game, tai nghe, bộ điều khiển, phụ kiện… cũng là những thứ cần thiết để bạn giành chiến thắng nhanh nhất trong những trận đấu mà mình tham gia </p>
                <button className="btn-explore" >Khám Phá Ngay</button>
            </div>
            {/* <div className="col-2 col-2-slide">
                <img className="image-slide" src={slide_background}></img>
            </div> */}
        </div>
    )

}
export default Slide;