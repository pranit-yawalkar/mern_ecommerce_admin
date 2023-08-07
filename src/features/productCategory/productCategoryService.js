import axios from "axios";
import { base_url, config } from "../../utils/axiosConfig";

const getProductCategories = async () => {
  const response = await axios.get(`${base_url}product-category`, config);
  if (response) {
    return response.data;
  }
};

const createProductCategory = async (data) => {
  const response = await axios.post(
    `${base_url}product-category`,
    data,
    config
  );
  if (response) {
    return response.data;
  }
};

const updateCategory = async (id, data) => {
  const response = await axios.put(
    `${base_url}product-category/${id}`,
    data,
    config
  );
  if (response) {
    return response.data;
  }
};

const deleteCategory = async (id) => {
  const response = await axios.delete(
    `${base_url}product-category/${id}`,
    config
  );
  if (response) {
    return response.data;
  }
};

const getCategory = async (id) => {
  const response = await axios.get(`${base_url}product-category/${id}`, config);
  if (response) {
    return response.data;
  }
};

const productCategoryService = {
  getProductCategories,
  createProductCategory,
  deleteCategory,
  updateCategory,
  getCategory,
};

export default productCategoryService;
