import axios from "axios";
import { base_url, config } from "../../utils/axiosConfig";

const getProductCategories = async () => {
  const response = await axios.get(`${base_url}product-category`, config);
  if (response) {
    return response.data;
  }
};

const productCategoryService = {
  getProductCategories,
};

export default productCategoryService;
