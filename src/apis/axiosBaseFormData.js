import axios from "axios";

const BASE_URL = "https://ws.yektoman.ir/api/v1";


const baseUrlFormData = (token) =>{
   return axios.create({
        baseURL: BASE_URL,
        headers: {
          Authorization: "Bearer " + token,
        },
      });
}


export default baseUrlFormData