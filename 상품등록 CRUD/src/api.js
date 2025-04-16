import axios from "axios";

const api = axios.create(
    {baseURL : "http://localhost:8082/api",
      headers:  {"Content-Type": "multipart/form-data"}  
    }
);

export default api;