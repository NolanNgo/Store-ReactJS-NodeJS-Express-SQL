const e = require("express");
const express = require("express");
const router = express.Router();
const { ConnectDB, ConnectDB1 } = require("../Config/Config");
const gateToken = require("../Middleware/Middleware");

router.get("/", async (req, res) => {
  const result = await ConnectDB("Product_getall");
  res.json({ code: 200, message: "Welcome to Product router", data: result });
});
router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const paramsString = `@id = ${id}`;
  const result = await ConnectDB1("Products_getDetail", paramsString);
  res.json({ code: 200, message: "Success", data: result });
});


router.get("/type/:id", async (req, res) => {
  const id = req.params.id;
  const paramsString = `@ProductTypeID = ${id}`;
  const result = await ConnectDB1("Product_getall_type", paramsString);
  return res.json({code: 200 , data: result});
})

router.post("/", gateToken, async (req, res) => {
  const { userId } = req;
  const {
    ProductID,
    NameProduct,
    Prices,
    Storage,
    Image,
    ProductTypeID,
    description,
  } = req.body;
  const CheckString = `@accountId ='${userId}'`;
  const result = await ConnectDB1("Account_Check", CheckString);
  if (!result[0] == true) {
    return res.json({ code: 404,  statusRes:false ,message: "Không tìm thấy người dùng" });
  }
  if (result[0].role === 0) {
    const addProductString = `@ProductID ='${ProductID}', @NameProduct ='${NameProduct}', @Prices = '${Prices}' , @Storage = '${Storage}', @Image ='${Image}', @ProductTypeID='${ProductTypeID}', @description='${description}'`;
    try {
      const resultAddProduct = await ConnectDB1(
        "Products_createProducts",
        addProductString
      );
      if (!resultAddProduct[0] === true) {
        return res.json({ code: 500, statusRes:false ,message: "Thêm Sản Phẩm Thất Bại" });
      }
      return res.json({
        code: 200,
        statusRes:true,
        message: "Thêm Sản Phẩm Thành Công",
        data: resultAddProduct,
      });
    } catch (e) {
      return res.json({ code: 500, statusRes:false ,message: e.message });
    }
  }
  return res.json({ code: 500, statusRes:false ,message: "Bạn Không thể thêm sản phẩm" });
});

router.put("/:id", gateToken, async (req, res) => {
  const { userId } = req;
  const id = req.params.id;
  const { NameProduct, Prices, Storage, Image, ProductTypeID, description } =
    req.body;
  const CheckString = `@accountId ='${userId}'`;
  const result = await ConnectDB1("Account_Check", CheckString);
  if (!result[0] === true) {
    return res.json({ code: 404, statusRes:false ,message: "Không tìm người dùng" });
  }
  if (result[0].role === 0) {
    const updateProductString = `@ProductID ='${id}', @NameProduct ='${NameProduct}', @Prices = '${Prices}' , @Storage = '${Storage}', @Image ='${Image}', @ProductTypeID='${ProductTypeID}', @description='${description}'`;
    try {
      const resultUpdatePro = await ConnectDB1(
        "Products_editProducts",
        updateProductString
      );
      if (!resultUpdatePro) {
        return res.json({ code: 500, message: "Cập nhật Sản Phẩm Thất Bại" });
      }
      return res.json({
        code: 200,
        statusRes:true,
        message: "Cập Nhật Sản Phẩm Thành Công",
        data: resultUpdatePro,
      });
    } catch (error) {
      return res.json({ code: 500, statusRes:false,message: error.message });
    }
  }
  return res.json({ code: 500, statusRes:false ,messsage: "Bạn Không thể cập nhật sản phẩm" });
});

router.delete("/:id", gateToken, async (req, res) => {
  const { userId } = req;
  const id = req.params.id;
  const CheckString = `@accountId ='${userId}'`;
  const result = await ConnectDB1("Account_Check", CheckString);
  if (!result[0] === true) {
    return res.json({ code: 404, message: "Không tìm người dùng" });
  }
  if (result[0].role === 0) {
    const DeleteProductString = `@ProductID ='${id}'`;
    try {
      const resultDeletePro = await ConnectDB1(
        "Products_deleteProducts",
        DeleteProductString
      );
      if (!resultDeletePro[0][""]) {
        return res.json({
          code: 500,
          statusRes:false,
          message: "Xóa sản phẩm không thành công",
        });
      }
      return res.json({ code: 200,statusRes:true, message: "Xóa sản phẩm thành công" });
    } catch (error) {
      return res.json({ code: 500,statusRes:false ,message: error.message });
    }
  }
  return res.json({ code: 500, statusRes:false ,message: "Bạn Không thể xóa sản phẩm" });
});

module.exports = router;
