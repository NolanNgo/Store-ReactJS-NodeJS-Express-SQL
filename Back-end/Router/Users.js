const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const { createPassHash } = require("../Config/Config");
const { ConnectDB, ConnectDB1 } = require("../Config/Config");
const gateToken = require("../Middleware/Middleware");
const bcrypt = require("bcrypt");
// const { response } = require("express");
require("dotenv").config();

const formatObj = (result) => {
  let obj = {
    accountID: result[0].accountID,
    userName: result[0].userName,
    name: result[0].name,
    email: result[0].email,
    cost: result[0].cost,
    phone: result[0].phone,
    address: result[0].address,
    role: result[0].role,
  };
  return obj;
};

router.get("/", gateToken ,async (req, res) => {
  const {userId} = req;
  const CheckString = `@accountId ='${userId}'`;
  const result = await ConnectDB1("Account_Check", CheckString);
  if (!result[0] == true) {
    return res.json({ code: 404, message: "Không tìm thấy người dùng" });
  }
  if (result[0].role === 0) {
    const resultGetAll = await ConnectDB("Account_getall");
    return res.json({ code: 200, message: "Router User", data: resultGetAll });
  }
  return res.json({code : 500 , message : "Bạn không thể lấy danh sách người dùng"});
});

// router.post("/", async (req, res) => {
//   const { userName, password } = req.body;
//   // console.log(res);
//   return res.json({
//     code: 200,
//     message: "Router",
//     data: { userName: userName, password: password },
//   });
// });
router.post("/signUp", async (req, res) => {
  const { userName, password, name, email, cost, address, phone, role,isGmail } =
    req.body;
  const passHash = createPassHash(password);
  //const verified = bcrypt.compareSync('123456', passHash);
  const paramsString = `@userName = '${userName}' , @password = '${passHash}' , @name = '${name}' , @email = '${email}' , @cost = ${cost} , @phone='${phone}', @address = '${address}', @isGmail='${isGmail}' ,@role =${role} `;
  const result = await ConnectDB1("Account_createAccount", paramsString);
  if (result) {
    let obj = formatObj(result);
    return res.json({ code: 200, statusRes:true ,message: "Đăng ký thành công", data: obj });
  }
  return res.json({ code: 500, statusRes:false  ,message: "Đăng ký Thất bại" });
});


router.post("/signIn", async (req, res) => {
  const { userName, password } = req.body;
  const paramsString = `@userName = '${userName}'`;
  const result = await ConnectDB1("Account_Login1", paramsString);
  if (!result[0] == true) {
    return res.json({ code: 404, message: "Người dùng không tồn tại" });
  }
  const verified = bcrypt.compareSync(password, result[0].password);
  if (verified) {
    let obj = formatObj(result);
    const AccessToken = jwt.sign(
      { UserId: obj.accountID ,  role: obj.role },
      process.env.ACCESS_TOKEN
    );
    return res.json({
      code: 200,
      message: "Đăng Nhập Thành Công",
      statusRes:true,
      data: obj,
      AccessToken: AccessToken,
    });
  } else {
    return res.json({ code: 500, statusRes:false ,message: "Đăng Nhập Thất Bại" });
  }
});

router.post("/signInGoogle", async (req, res) => {
  const {name,email,isGmail,idGoogle,role} = req.body; 
  const CheckString = `@email ='${email}'`;
  // console.log(name,email,isGmail,idGoogle,role)
  const result = await ConnectDB1("Account_Check_Email", CheckString);
  let AccessToken = "";
  if(result[0] && result[0].isGmail === false ){
    return res.json({code : 500,statusRes:false , message: "Địa chỉ Email đã được sử dụng"});
  }
  if(result[0] && result[0].isGmail === true){
    AccessToken = jwt.sign(
      { UserId: result[0].accountID ,  role: result[0].role },
      process.env.ACCESS_TOKEN
    );
    return res.json({code: 200,statusRes:true, message : "Đăng Nhập với Google Thành Công", data: result ,AccessToken:AccessToken })
  }
  const paramsString = `@name ='${name}' , @email = '${email}', @isGmail = '${isGmail}',  @idGoogle='${idGoogle}' , @role='${role}' `;
  try{
    const resultLoginGoogle = await ConnectDB1("Account_createAccount_Google", paramsString);
    if(resultLoginGoogle[0])
    {
      AccessToken = jwt.sign(
        { UserId: result[0].accountID ,  role: result[0].role },
        process.env.ACCESS_TOKEN
      );
      return res.json({code: 200 ,statusRes:true ,message : "Đăng Nhập và lưu thông tin với Google", data:resultLoginGoogle ,AccessToken:AccessToken})
    }
    return res.json({code: 500 , statusRes:false ,message : "Đăng Nhập và lưu thông tin không thành công"});
  }catch(error){
    return res.json({code : 500, statusRes:false , message : error.message});
  }
})



router.put("/editProfile", gateToken, async (req, res) => {
  const { name, address, phone } = req.body;
  const { userId } = req;
  const paramsString = `@accountId ='${userId}' , @name = '${name}', @address = '${address}',  @phone='${phone}' `;
  const result = await ConnectDB1("Account_editProfile", paramsString);
  if (result) {
    let obj = formatObj(result);
    return res.json({ code: 200, statusRes:true ,message: "Cập nhật thành công", data: obj });
  }
  return res.json({ code: 500,statusRes:false ,message: "Cập Nhật Thất Bại" });
  // console.log(userId);
  // res.json({code: 200 , message: "test Put"});
});

router.put("/changePass", gateToken , async (req, res)=>{
  const {oldPassword , newPassword} = req.body;
  const { userId } = req;
  const paramsString = `@accountId ='${userId}'`;
  const result = await ConnectDB1("Account_Check", paramsString);
  if(!result[0] == true){
    return res.json({code: 404 , statusRes:false ,message: "Không tìm thấy người dùng"});
  }
  const verified = bcrypt.compareSync(oldPassword, result[0].password);
  if(!verified){
    return res.json({code: 500, statusRes:false , message : "Cập Nhật Mật Khẩu Không Thành Công"});
  }
  const passHash = createPassHash(newPassword);
  const paramsString2 = `@accountId ='${userId}' , @newPassword = '${passHash}'`;
  const ResultUpdatePass = await ConnectDB1("Account_changePass2", paramsString2);
  let obj = formatObj(ResultUpdatePass);
  return res.json({code : 200, statusRes:true , message : "Cập Nhật Mật Khẩu Thành Công", data: obj});
})


module.exports = router;
