import axios from "axios";
import { base_url, config } from "../../utils/axiosConfig";

const getUsers = async () => {
  const response = await axios.get(`${base_url}user/getUsers`, config);
  if (response) {
    return response.data;
  }
};

const customerService = {
  getUsers,
};

export default customerService;
