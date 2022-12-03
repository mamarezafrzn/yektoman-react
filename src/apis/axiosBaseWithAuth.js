import axios from "axios";

const BASE_URL = "https://ws.yektoman.ir/api/v1";


const baseUrlWithAuthFunc = (token) =>{
   return axios.create({
        baseURL: BASE_URL,
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      });
}


export default baseUrlWithAuthFunc