import axiosClient from "./axiosClient";

const staffAPI = {
  getRole() {
    const url = `/api/v1/web/staff/check`;
    return axiosClient.get(url, {
      headers: {
        token: localStorage.getItem("token"),
      },
    });
  },
};
export default staffAPI;
