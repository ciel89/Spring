import axios from "axios";

const api = axios.create(
    {baseURL : "http://3.39.144.111:8082/api",
      headers:  {"Content-Type": "multipart/form-data"}  
    }
);

export default api;