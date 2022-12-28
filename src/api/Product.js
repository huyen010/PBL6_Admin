import axiosClient from "./axiosClient";
const header = {
  headers: {
    token: localStorage.getItem("token"),
  },
};
const productAPI = {
  getALL(slug, page) {
    const url = `/api/v1/cms/products/${slug}/${page}`;
    return axiosClient.get(url, header);
  },
  addProduct(data) {
    const url = `/api/v1/cms/products/insert`;
    return axiosClient.post(url, data, header);
  },
  deleteProduct(id) {
    const url = `/api/v1/cms/products/delete/${id}`;
    return axiosClient.delete(url, header);
  },
  getById(id) {
    const url = `/api/v1/cms/products/detail/${id}`;
    return axiosClient.get(url, header);
  },
  updateProduct(id, data) {
    const url = `/api/v1/cms/products/update/${id}`;
    return axiosClient.put(url, data, header);
  },
  getProperties() {
    const url = `/api/v1/cms/products/properties`;
    return axiosClient.get(url, header);
  },
  sellProduct(id, data) {
    const url = `/api/v1/cms/products/sell-product/${id}`;
    return axiosClient.post(url, data, header);
  },
  searchProduct(search, cate, page) {
    const url = `/api/v1/cms/products/${cate}/${search}/${page}`;
    return axiosClient.get(url, header);
  },
  getAllProducts() {
    const url = `/api/v1/cms/products/all-product`;
    return axiosClient.get(url, header);
  },
};
export default productAPI;
