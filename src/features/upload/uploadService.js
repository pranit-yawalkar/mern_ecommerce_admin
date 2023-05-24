import axios from "axios";
import { base_url, config } from "../../utils/axiosConfig";

const uploadImage = async (data) => {
  const response = await axios.post(`${base_url}image/upload`, data, config);
  if (response) {
    return response.data;
  }
};

const deleteImage = async (id) => {
  const response = await axios.delete(`${base_url}image/delete/${id}`, config);
  if (response) {
    return response.data;
  }
};

const uploadService = {
  uploadImage,
  deleteImage,
};

export default uploadService;
