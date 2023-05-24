import axios from "axios";
import { base_url, config } from "../../utils/axiosConfig";

const getMessages = async () => {
  const response = await axios.get(`${base_url}contact`, config);
  console.log(response);
  if (response) {
    return response.data;
  }
};

const messageService = {
  getMessages,
};

export default messageService;
