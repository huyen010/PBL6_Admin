import axiosClient from "./axiosClient";
const header = {
  headers: {
    token: localStorage.getItem("token"),
  },
};
const cateAPI = {
  getALL() {
    const url = `/api/v1/cms/categories/all`;
    return axiosClient.get(url, header);
  },
  addCate(data) {
    const url = `/api/v1/cms/categories/insert`;
    return axiosClient.post(url, data, header);
  },
  getCate(slug) {
    const url = `/api/v1/cms/categories/detail/${slug}`;
    return axiosClient.get(url, header);
  },
  updateCate(data, slug) {
    const url = `/api/v1/cms/categories/update/${slug}`;
    return axiosClient.put(url, data, header);
  },
  deleteCate(id) {
    const url = `/api/v1/cms/categories/delete/${id}`;
    return axiosClient.delete(url, header);
  },
};
export default cateAPI;
