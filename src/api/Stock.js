import axiosClient from "./axiosClient";
const header = {
  headers: {
    token: localStorage.getItem("token"),
  },
};
const stockAPI = {
  getALL(page) {
    const url = `/api/v1/cms/stock/all/${page}`;
    return axiosClient.get(url, header);
  },
  insertStock(data) {
    const url = `/api/v1/cms/stock/insert`;
    return axiosClient.post(url, data, header);
  },
  deleteStock(id) {
    const url = `/api/v1/cms/stock/delete/${id}`;
    return axiosClient.delete(url, header);
  },
  getById(id) {
    const url = `/api/v1/cms/stock/detail/${id}`;
    return axiosClient.get(url, header);
  },
  updateStock(id, data) {
    const url = `/api/v1/cms/stock/update/${id}`;
    return axiosClient.put(url, data, header);
  },
};
export default stockAPI;
