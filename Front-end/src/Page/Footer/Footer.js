import logo1 from '../../Image/logo.png';
import logo2 from '../../Image/logo2.png';
import './Footer.css';
function Footer()
{
    return(
        <div className="footer">
            <div className="container">
                <div className="row row-footer">
                    <div className="col-1 footer">
                        {/* <h3>Bạn muốn trang trí góc làm việc</h3> */}
                        <div className="app-logo">
                            <img src={logo2} alt="logo2"></img>
                        </div>
                        <p>Hãy sở hữu cho mình một sản phẩm vừa trang trí vừa để sử dụng cho mục đích công nghệ của mình</p>
                    </div>
                    <div className="col-2 footer">
                        <img src={logo1} alt="logo1"/>
                        <p>Hình ảnh trong trang web chỉ mang tính chất minh họa và mượn của một số hãng máy tính và công nghệ</p>
                    </div>
                    <div className="col-3 footer">
                        <h3>Contact</h3>
                        <ul>
                            <li>Voucher</li>
                            <li>Phone</li>
                            <li>Return Policy</li>
                        </ul>
                    </div>
                    <div className="col-4 footer">
                        <h3>Follow Us</h3>
                        <ul>
                            <li>Facebook</li>
                            <li>Instagram</li>
                            <li>Email</li>
                        </ul>
                    </div>
                </div>
            </div>
            <hr/>
            <p className="footer-mess">Copyright 2021 - Chuyên Đề Công Nghệ Phần Mềm</p>
        </div>
    )
}
export default Footer;