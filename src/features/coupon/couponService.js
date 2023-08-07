import axios from "axios";
import { base_url, config } from "../../utils/axiosConfig";

const getCoupons = async () => {
  const response = await axios.get(`${base_url}coupon`, config);
  if (response) {
    return response.data;
  }
};

const createCoupon = async (data) => {
  const response = await axios.post(`${base_url}coupon`, data, config);
  if (response) {
    return response.data;
  }
};

const couponService = {
  getCoupons,
  createCoupon,
};

export default couponService;
