import axios from "axios";
import { base_url, config } from "../../utils/axiosConfig";

const getProducts = async () => {
  const response = await axios.get(`${base_url}product`, config);
  if (response) {
    return response.data;
  }
};

const createProduct = async (data) => {
  const response = await axios.post(`${base_url}product`, data, config);
  if (response) {
    return response.data;
  }
};

const productService = {
  getProducts,
  createProduct,
};

export default productService;
