import axios from "axios";
// const baseURL = "https://localhost:44359/api/";
const baseURL = "http://localhost:8080/";
const baseURL_cloudinary = "https://api.cloudinary.com/v1_1/dd1vmklog/image/upload";
async function myGet(stringUrl) {
    try {
        const response = await axios.get(baseURL+stringUrl);
        // console.log(response.data);
        return response.data
      } catch (error) {
        // console.error(error);
        return error;
      }
}

async function myGetWithToken(stringUrl,headers) {
  // console.log(baseURL+stringUrl);
  // console.log(headers);
  try {
      const response = await axios.get(baseURL+stringUrl, {headers: headers});
      // console.log(response.data);
      return response.data
    } catch (error) {
      // console.error(error);
      return error;
    }
}

async function myPost(stringUrl,headers , data) {
  //console.log(baseURL+stringUrl);
  try{
    const response = await axios.post(baseURL+stringUrl, data, {headers: headers});
    return response.data;
    // console.log(response.data);
  }catch (error) {
    console.log(error.message);
  }
}

async function myPut(stringUrl,headers , data) {
  //console.log(baseURL+stringUrl);
  try{
    const response = await axios.put(baseURL+stringUrl, data, {headers: headers});
    return response.data;
    // console.log(response.data);
  }catch (error) {
    console.log(error.message);
  }
}


async function myDelete(stringUrl,headers) {
  //console.log(baseURL+stringUrl);
  try{
    const response = await axios.delete(baseURL+stringUrl, {headers: headers});
    return response.data;
    // console.log(response.data);
  }catch (error) {
    console.log(error.message);
  }
}


async function PostUploadImg(formdata)
{
  try{
    const response = await axios.post(baseURL_cloudinary,formdata);
    return response.data
  }catch (error) {
    return error.message
  }
}


export { myGet, myPost , myGetWithToken,myPut,PostUploadImg,myDelete}

