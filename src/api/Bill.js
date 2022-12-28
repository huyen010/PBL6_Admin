import axiosClient from "./axiosClient";
const header = {
  headers: {
    token: localStorage.getItem("token"),
  },
};
const billAPI = {
  getALL(page) {
    const url = `/api/v1/cms/bill/all/${page}`;
    return axiosClient.get(url, header);
  },
  canCelBill(id, data) {
    const url = `/api/v1/cms/bill/cancel/${id}`;
    return axiosClient.post(url, data, header);
  },
  upDateManyBill(data) {
    const url = `/api/v1/cms/bill/update-many`;
    return axiosClient.post(url, data, header);
  },
  getById(id) {
    const url = `/api/v1/cms/bill/detail/${id}`;
    return axiosClient.get(url, header);
  },
  updateBill(id, data) {
    const url = `/api/v1/cms/bill/update/${id}`;
    return axiosClient.put(url, data, header);
  },
  getTypeBill(status, delivery, page) {
    const url = `/api/v1/cms/bill/type/${status}/${delivery}/${page}`;
    return axiosClient.get(url, header);
  },
};
export default billAPI;
