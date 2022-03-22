import { Modal, Button, Row, Col } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import { PostUploadImg, myPut } from "../../../Global/myRequest";
import { toastSuccess, toastError } from "../../../Global/myToast";
// import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons'
function EditProduct(props) {
  // let navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [isDisabled, setDisable] = useState(false);
  // const [value, setValue] = useStateIfMounted('checking value...');
  // const [Temp, setTemp] = useState("");
  const [product, setProduct] = useState({
      ProductID: props.product.productID,
      NameProduct: props.product.nameProduct,
      Prices: props.product.prices,
      Storage: props.product.storage,
      Image: props.product.image,
      description: props.product.description,
      ProductTypeID: props.product.productTypeID,
  });
  // console.log(props.product);
  useEffect(() => {
    return () => {
      // This is the cleanup function
    }
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("jwtoken");
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    // console.log(product);
    myPut(`Products/${product.ProductID}`, headers, product).then((response) => {
      if (response.statusRes === true) {
        toastSuccess(response.message);
      } else {
        toastError(response.message);
      }
    });
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

  // console.log(props);
  return (
    <>
      <Button
        className="btn "
        onClick={() => setShow(true)}
      >
        <FontAwesomeIcon icon={faEdit} />
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
            Thay Đổi Sản Phẩm
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
                accept=".jpg,.jpeg,.png,"
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
              className="btn btn-primary"
              value="Sửa Sản Phẩm"
              disabled={isDisabled}
            />
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
}
export default EditProduct;
