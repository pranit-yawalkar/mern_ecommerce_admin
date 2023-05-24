import axios from "axios";
import { base_url, config } from "../../utils/axiosConfig";

const getColors = async () => {
  const response = await axios.get(`${base_url}color`, config);
  if (response) {
    return response.data;
  }
};

const colorService = {
  getColors,
};

export default colorService;
