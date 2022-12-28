import UpdateSupply from "../components/Supply/UpdateSupply";
import axiosClient from "./axiosClient";
const header = {
  headers: {
    token: localStorage.getItem("token"),
  },
};
const supplyAPI = {
  getALL(page) {
    const url = `/api/v1/cms/supplies/all/${page}`;
    return axiosClient.get(url, header);
  },
  deleteSupply(id) {
    const url = `/api/v1/cms/supplies/delete/${id}`;
    return axiosClient.delete(url, header);
  },
  insertSupply(data) {
    const url = `/api/v1/cms/supplies/insert`;
    return axiosClient.post(url, data, header);
  },
  getRepresentative(id) {
    const url = `/api/v1/cms/supplies/representative/${id}`;
    return axiosClient.get(url, header);
  },
  getSupply(id) {
    const url = `/api/v1/cms/supplies/detail/${id}`;
    return axiosClient.get(url, header);
  },
  updateSupply(id, data) {
    const url = `/api/v1/cms/supplies/update/${id}`;
    return axiosClient.put(url, data, header);
  },
  getListProduct(id) {
    const url = `/api/v1/cms/supplies/product/${id}`;
    return axiosClient.get(url, header);
  },
};
export default supplyAPI;
