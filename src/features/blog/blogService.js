import axios from "axios";
import { base_url, config } from "../../utils/axiosConfig";

const getBlogs = async () => {
  const response = await axios.get(`${base_url}blog`, config);
  if (response) {
    return response.data;
  }
};

const blogService = {
  getBlogs,
};

export default blogService;
