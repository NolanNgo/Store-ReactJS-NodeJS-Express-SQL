const express = require('express');
const app = express();
const port = 8080 || process.env.PORT;
const cors = require('cors');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//------------------Router--------------------
const ProductRouter = require('./Router/Product');
const UserRouter = require('./Router/Users');
const OrdersRouter = require('./Router/Orders');
app.use('/Product',ProductRouter);
app.use('/User',UserRouter);
app.use('/Orders',OrdersRouter);


app.get("/",(req,res)=>{
    res.send("Welcome app");
})

app.listen(port, ()=>{
    console.log(`App running at localhost:${port}`);
})