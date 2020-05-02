import axios from "axios";

const apiClient = axios.create({
  baseURL: `https://m2e-api.herokuapp.com/products`,
  withCredentials: false,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json"
  }
});

export default {
  getProducts() {
    return apiClient.get("/");
  }
};
