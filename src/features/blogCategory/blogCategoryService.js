import axios from "axios";
import { base_url, config } from "../../utils/axiosConfig";

const getBlogCategories = async () => {
  const response = await axios.get(`${base_url}blog-category`, config);
  if (response) {
    return response.data;
  }
};

const createBlogCategory = async (data) => {
  const response = await axios.post(`${base_url}blog-category`, data, config);
  if (response) {
    return response.data;
  }
};

const blogCategoryService = {
  getBlogCategories,
  createBlogCategory,
};

export default blogCategoryService;
