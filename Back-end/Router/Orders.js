const express = require('express');
const router = express.Router();
const {ConnectDB , ConnectDB1} = require('../Config/Config');
const gateToken = require('../Middleware/Middleware');

// router.get("/", gateToken,  async (req,res)=>{
//     const {userId} = req;
//     const paramsString = `@userID = '${userId}'`;
//     const result = await ConnectDB1("Orders_getAll_userID",paramsString );

// })


router.get("/all",gateToken,async(req,res)=>{
    const {userId,role} = req;
    // console.log(userId,role);
    const checkString = `@accountId ='${userId}'`;
    const result = await ConnectDB1("Account_Check", checkString);
    if(!result[0] === true ){
        return res.json({code: 404, statusRes:false , message: "Không tìm thấy người dùng"});
    }
    if(role === 0 ){
        try{
            const resultGet = await ConnectDB("Orders_getAll_admin");
            return res.json({code: 200 , message : "Lấy danh sách hóa đơn", data: resultGet});
        }catch(error){
            return res.json({code: 500 , message: error.message});
        }
        // return res.json({code: 200 , message:"Người dùng là admin"});
    }
    return res.json({code : 500 , message: "Bạn không thể lấy danh sách đơn hàng"});
    
})


router.get("/User",gateToken , async(req,res)=>{
    const { userId } = req;
    // console.log(userId);
    const id = req.params.id;
    try{
        const getOrderString = `@userID = '${userId}'`;
        const result = await ConnectDB1("Orders_getAll_userID",getOrderString);
        if(result && result.length > 0) {
            return res.json({code: 200,statusRes:true , message:"Lấy dữ liệu order" ,data: result});
        }
        return res.json({code:500 ,statusRes:false ,message:'Lấy dữ liệu thất bại'});
        // console.log(result);
    }catch(error){
        return res.json({code : 500,statusRes:false , message : error.message});
    }
})

router.get("/:id",gateToken , async(req,res)=>{
    const { userId } = req;
    const id = req.params.id;
    try{
        const getOrderString = `@orderID ='${id}' , @userID = '${userId}'`;
        const result = await ConnectDB1("Orders_getAll_orderID",getOrderString);
        if(result && result.length > 0) {
            return res.json({code: 200,statusRes:true , message:"Lấy dữ liệu order" ,data: result});
        }
        return res.json({code:500,statusRes:false , message:'lỗi'});
        // console.log(result);
    }catch(error){
        return res.json({code : 500,statusRes:false , message : error.message});
    }
})


router.post("/",gateToken , async(req,res)=>{
    const { userId } = req;
    const checkString = `@accountId ='${userId}'`;
    const result = await ConnectDB1("Account_Check", checkString);
    if(!result[0] == true){
        return res.json({code: 404, statusRes:false , message: "Không tìm thấy người dùng"});
    }
    const {orderId , ProductID , countProduct, statusOrder} = req.body;
    try{
        const OrderString = `@orderID = '${orderId}' , @accountID ='${userId}' , @productID = '${ProductID}' , @countPro ='${countProduct}' ,@statusOrder='${statusOrder}' `;
        const resultAddOrder = await ConnectDB1("Orders_create", OrderString);
        if(resultAddOrder && resultAddOrder.length && resultAddOrder.length > 0 ){
            return res.json({code : 200,statusRes:true , message : "Thêm Sản Phẩm Vào Giỏ Hàng Thành Công"});
        }
        return res.json({code : 500,statusRes:false , message : "Thêm sản Phẩm Vào Giỏ Hàng Thất Bại"});
        // console.log(resultAddOrder.length);
    }
    catch(error){
        return res.json({code: 500,statusRes:false , message : error.message});
    }
})


// thay đổi trạng thái đơn hàng từ 1 - 5 chế độ của đơn hàng
router.post("/status/:orderId",gateToken , async(req,res)=>{
    const {userId , role} = req;
    const {statusOrder} = req.body;
    const id = req.params.orderId;
    if(role===1){
        try{
            const statusString = `@orderID = '${id}', @userID ='${userId}' , @statusOrder ='${statusOrder}'`;
            // DH = Đặt Hàng
            const resultDH = await ConnectDB1("Orders_change_status",statusString );
            if(!resultDH[0][""]){
                return res.json({code:500 , statusRes:false , message:"Thay đổi trạng thái đơn hàng không thành công"})
            }
            return res.json({code : 200 , statusRes:true , message:"Đặt hàng thành công và chờ xác nhận"});
            // console.log(resultDH);
        }catch(error){
            return res.json({code : 500 , message : error.message});
        }
    }else if(role === 0){
        // console.log("role = 0 nayf");
        try{
            const statusStringAdmin = `@orderID = '${id}', @statusOrder ='${statusOrder}'`;
            const resultDHadmin = await ConnectDB1("Orders_change_status_admin", statusStringAdmin);
            if(!resultDHadmin[0][""]){
                return res.json({code: 500,statusRes:false ,message : "Cập nhật trạng thái thất bại"});
            }
            return res.json({code: 200, statusRes:true , message:"Cập nhật đơn hàng thành công"});
        }catch(error){
            return res.json({code: 500, statusRes:false ,message:error.message});
        }
    }
    return res.json({code: 500 , statusRes:false ,message:"Bạn không thể sửa trạng thái đơn hàng"});
})



router.delete("/:id",gateToken, async(req,res)=>{
    const id = req.params.id;
    const { userId } = req;
    try{
        const OrderString = `@orderID = '${id}' , @userID ='${userId}'`;
        const resultDeleteOrder = await ConnectDB1("Orders_delete", OrderString);
        if (!resultDeleteOrder[0][""]) {
            return res.json({ code: 500,statusRes:false ,message: "Xóa hóa đơn không thành công"});
        }
        return res.json({code : 200,statusRes:true , message : "Xóa hóa đơn thành Công"});
    }catch(error){
        return res.json({code: 500,statusRes:false , message : error.message});
    }
})

router.delete("/:idOrder/Product/:idPro" ,gateToken,async(req,res)=>{
    const id = req.params.idOrder;
    const idPro = req.params.idPro;
    const { userId } = req;
    try{
        const OrderString = `@orderID = '${id}' , @userID ='${userId}' , @idPro ='${idPro}'`;
        const resultDeleteProductOrder = await ConnectDB1("Orders_delete_idPro",OrderString );
        if(!resultDeleteProductOrder[0][""]){
            return res.json({code:500 , statusRes:false, message:"Xóa sản phẩm không thành công"});
        }
        return res.json({code:200 , statusRes:true, message: "Xóa sản phẩm thành công" });
    }catch(error){
        return res.json({code:500 , statusRes:false, message:error.message});
    }
})





module.exports = router;