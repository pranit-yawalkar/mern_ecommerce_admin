import axios from "axios";
import { base_url, config } from "../../utils/axiosConfig";

const getOrders = async () => {
  const response = await axios.get(`${base_url}user/orders/all`, config);
  if (response) {
    return response.data;
  }
};

const orderService = {
  getOrders,
};

export default orderService;
