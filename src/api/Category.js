import axiosClient from "./axiosClient";

const cateAPI = {
    getALL() {
        const url = `/api/v1/cms/categories/all`;
        return axiosClient.get(url);
    },
    addCate(data){
        const url = `/api/v1/cms/categories/insert`;
        return axiosClient.post(url,data);
    },
    getCate(slug){
        const url = `/api/v1/cms/categories/detail/${slug}`;
        return axiosClient.get(url);
    },
    updateCate(data,slug){
        const url = `/api/v1/cms/categories/update/${slug}`;
        return axiosClient.put(url,data);
    },
    deleteCate(id){
        const url = `/api/v1/cms/categories/delete/${id}`;
        return axiosClient.delete(url);
    }
}
export default cateAPI;