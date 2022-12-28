import axiosClient from "./axiosClient";
const header = {
  headers: {
    token: localStorage.getItem("token"),
  },
};
const statisticalAPI = {
  getOrderByMonth(month) {
    const url = `/api/v1/cms/statistical/order/${month}`;
    return axiosClient.get(url, header);
  },
  getOrderStatus() {
    const url = `/api/v1/cms/statistical/number-status`;
    return axiosClient.get(url, header);
  },
  getBestSeller() {
    const url = `/api/v1/cms/statistical/top-product`;
    return axiosClient.get(url, header);
  },
};
export default statisticalAPI;
