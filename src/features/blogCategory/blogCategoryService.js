import axios from "axios";
import { base_url, config } from "../../utils/axiosConfig";

const getBlogCategories = async () => {
  const response = await axios.get(`${base_url}blog-category`, config);
  if (response) {
    return response.data;
  }
};

const blogCategoryService = {
  getBlogCategories,
};

export default blogCategoryService;
