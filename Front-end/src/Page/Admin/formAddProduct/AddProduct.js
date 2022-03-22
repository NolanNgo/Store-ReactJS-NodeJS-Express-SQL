import { Modal, Button, Row, Col } from "react-bootstrap";
import React, { useState } from "react";
import { PostUploadImg, myPost } from "../../../Global/myRequest";
import { toastSuccess, toastError } from "../../../Global/myToast";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

function AddProduct() {
  let navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [isDisabled, setDisable] = useState(false);
  // const [value, setValue] = useStateIfMounted('checking value...');
  // const [Temp, setTemp] = useState("");
  const [product, setProduct] = useState({
    ProductID: "",
    NameProduct: "",
    Prices: 0,
    Storage: 0,
    Image: "",
    description:"",
    ProductTypeID: 0,
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("jwtoken");
    const id = localStorage.getItem("productID");
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    product.ProductID = id.trim();
    const resultAddProduct = await myPost("Product",headers , product);
    if(resultAddProduct.statusRes === true){
      navigate("/admin");
      return toastSuccess(resultAddProduct.message);
    }
    return toastError(resultAddProduct.message);


    // myPost("Products", headers, product).then((response) => {
    //   if (response.statusRes === true) {
    //     toastSuccess(response.message);
    //     navigate("/admin");
    //   } else {
    //     toastError(response.message);
    //   }
    // });
  };
  
  const UploadImage = (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "dev_setup");
    setDisable(true);
    PostUploadImg(formData).then((response) => {
      if (response) {
        setProduct({ ...product, Image: response.url });
        setDisable(false);
      }
    });
  };
  return (
    <>
      <Button
        className="btn-add-product "
        variant="primary"
        onClick={() => setShow(true)}
      >
        Thêm Sản Phẩm
      </Button>

      <Modal
        show={show}
        onHide={() => setShow(false)}
        // dialogClassName="modal-90w"
        aria-labelledby="example-modal-sizes-title-lg"
        aria-hidden="true"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">
            Thêm Sản Phẩm
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="form-add-product" onSubmit={handleSubmit}>
            <Row>
              <Col xs={12} md={7}>
                <div className="form-group">
                  <label htmlFor="recipient-name" className="col-form-label">
                    Name:
                  </label>
                  <input
                    type="text"
                    value={product.NameProduct}
                    onChange={(e) =>
                      setProduct({ ...product, NameProduct: e.target.value })
                    }
                    className="form-control"
                    id="recipient-name"
                  />
                </div>
              </Col>
              <Col xs={6} md={5}>
                <div className="form-group">
                  <label htmlFor="recipient-name" className="col-form-label">
                    Price:
                  </label>
                  <select
                    className="form-control"
                    value={product.ProductTypeID}
                    onChange={(e) => {
                      setProduct({
                        ...product,
                        ProductTypeID: parseInt(e.target.value),
                      });
                    }}
                    id="cars"
                  >
                    <option value="1">Tai Nghe</option>
                    <option value="2">Lót Chuột</option>
                    <option value="3">Bàn Phím</option>
                    <option value="4">Chuột Máy Tính</option>
                  </select>
                </div>
              </Col>
            </Row>
            <Row>
              <Col xs={12} md={8}>
                <div className="form-group">
                  <label htmlFor="recipient-name" className="col-form-label">
                    Price:
                  </label>
                  <input
                    type="number"
                    className="form-control input-prices"
                    id="recipient-name"
                    value={product.Prices}
                    onChange={(e) =>
                      setProduct({
                        ...product,
                        Prices: parseInt(e.target.value),
                      })
                    }
                  />
                </div>
              </Col>
              <Col xs={6} md={4}>
                <div className="form-group">
                  <label htmlFor="recipient-name" className="col-form-label">
                    Storage:
                  </label>
                  <input
                    type="number"
                    value={product.Storage}
                    onChange={(e) =>
                      setProduct({
                        ...product,
                        Storage: parseInt(e.target.value),
                      })
                    }
                    className="form-control input-storage"
                    id="recipient-name"
                  />
                </div>
              </Col>
            </Row>

            {/* <div className="form-group">
              <label htmlFor="message-text" className="col-form-label">
                Description:
              </label>
              <textarea
                className="form-control area-dis"
                id="message-text"
                cols="10"
                rows="5"
              ></textarea>
            </div> */}
            <div className="form-group">
              <label htmlFor="message-text" className="col-form-label">
                Ảnh Sản Phẩm
              </label>
              <input
                onChange={(event) => {
                  UploadImage(event.target.files[0]);
                }}
                type="file"
                className="form-control area-dis"
                id="message-text"
                cols="10"
                rows="5"
              />
            </div>
            <div className="form-group">
              <label htmlFor="exampleFormControlTextarea1">Mô Tả Sản Phẩm</label>
              <textarea
                className="form-control"
                id="exampleFormControlTextarea1"
                rows="8"
                value={product.description}
                onChange={(e) =>
                  setProduct({
                    ...product,
                    description: e.target.value,
                  })
                }
              ></textarea>
            </div>
            <input
              type="submit"
              className="btn btn-primary "
              value="Thêm Sản Phẩm"
              disabled={isDisabled}
            />
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
}
export default AddProduct;
