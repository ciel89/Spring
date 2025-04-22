import axios from "axios";

const api = axios.create(
        {baseURL : 'http://localhost:8082/api',
         withCredentials : true   
        }
    );

//회원관리 API
export const signup = (user) => api.post('/users/signup', user);
export const login = (user) => api.post('/users/login', user);
export const logout = () => api.post('/users/logout');
export const check = () => api.get('/users/check');

//상품관리 API
export const createProduct = (formData) =>
    api.post('/products', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  
  export const updateProduct = (id, formData) =>
    api.put(`/products/${id}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });

export const deleteProduct = (id) => api.delete(`/products/${id}`);
export const listProduct = () => api.get('/products');


//추가 API