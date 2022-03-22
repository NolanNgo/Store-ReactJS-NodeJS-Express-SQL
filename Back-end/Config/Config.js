const sql = require("mssql");
const bcrypt = require("bcrypt");
const key = "NgoMinhHieu20031999";
const config = {
    user : 'sa1',
    password : '123456',
    server : 'localhost',
    database:'Project51702017',
    synchronize: true,
    trustServerCertificate: true,
}

const createPassHash = (password) => {
    const result = bcrypt.hashSync(password , 10);
    return result;
}

const ConnectDB = async (queryString)=>{
    const connect = sql.connect(config);
    await connect;
    const request = new sql.Request();
    result =  await request.execute(queryString);
    // return result[0];
    return result.recordset;

}
const ConnectDB1 = async (queryString  , parametersString )=>{
    const connect = sql.connect(config);
    await connect;
    const request = new sql.Request();
    result = await request.query(`exec ${queryString} ${parametersString}`);
    return result.recordset;
}
module.exports = {ConnectDB,ConnectDB1,createPassHash};