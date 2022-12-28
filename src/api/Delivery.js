import axiosClient from "./axiosClient";
const header = {
  headers: {
    token: localStorage.getItem("token"),
  },
};
const deliveryAPI = {
  getALL() {
    const url = `/api/v1/cms/deliveries`;
    return axiosClient.get(url, header);
  },
};
export default deliveryAPI;
