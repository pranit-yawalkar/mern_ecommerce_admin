import axios from "axios";
import { base_url, config } from "../../utils/axiosConfig";

const getBlogs = async () => {
  const response = await axios.get(`${base_url}blog`, config);
  if (response) {
    return response.data;
  }
};

const createBlog = async (data) => {
  const response = await axios.post(`${base_url}blog`, data, config);
  if (response) {
    return response.data;
  }
};

const blogService = {
  getBlogs,
  createBlog,
};

export default blogService;
