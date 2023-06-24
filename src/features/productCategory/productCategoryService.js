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

const productCategoryService = {
  getProductCategories,
  createProductCategory,
};

export default productCategoryService;
