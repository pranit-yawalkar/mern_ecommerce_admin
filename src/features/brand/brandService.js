import axios from "axios";
import { base_url, config } from "../../utils/axiosConfig";

const getBrands = async () => {
  const response = await axios.get(`${base_url}brand`, config);
  if (response) {
    return response.data;
  }
};

const createBrand = async (data) => {
  const response = await axios.post(`${base_url}brand`, data, config);
  if (response) {
    return response.data;
  }
};

const brandService = {
  getBrands,
  createBrand,
};

export default brandService;
