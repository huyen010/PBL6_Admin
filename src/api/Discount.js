import axiosClient from "./axiosClient";
const header = {
  headers: {
    token: localStorage.getItem("token"),
  },
};
const discountAPI = {
  getALL() {
    const url = `/api/v1/cms/discount/all`;
    return axiosClient.get(url, header);
  },
  addDiscount(data) {
    const url = `/api/v1/cms/discount/insert`;
    return axiosClient.post(url, data, header);
  },
  deleteDiscount(id) {
    const url = `/api/v1/cms/discount/delete/${id}`;
    return axiosClient.delete(url, header);
  },
};
export default discountAPI;
