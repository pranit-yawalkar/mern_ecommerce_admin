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

const updateBrand = async (id, data) => {
  console.log(data);
  const response = await axios.put(`${base_url}brand/${id}`, data, config);
  if (response) {
    return response.data;
  }
};

const deleteBrand = async (id) => {
  const response = await axios.delete(`${base_url}brand/${id}`, config);
  if (response) {
    return response.data;
  }
};

const getBrand = async (id) => {
  const response = await axios.get(`${base_url}brand/${id}`, config);
  if (response) {
    return response.data;
  }
};

const brandService = {
  getBrands,
  createBrand,
  getBrand,
  updateBrand,
  deleteBrand,
};

export default brandService;
