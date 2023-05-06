import axios from "axios";

const token = localStorage.getItem('token');
export default axios.create({
  baseURL: "https://admin.sajerbela.com/api/",
  // withCredentials: true,
  headers: {
    "Content-type": "application/json",
    "Authorization": `Bearer ${token}`
  }
});