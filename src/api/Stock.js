import axiosClient from "./axiosClient";

const stockAPI = {
    getALL(page) {
        const url = `/api/v1/cms/stock/all/${page}`;
        return axiosClient.get(url);
    },
    insertStock(data){
        const url = `/api/v1/cms/stock/insert`;
        return axiosClient.post(url,data);
    },
    deleteStock(id){
        const url = `/api/v1/cms/stock/delete/${id}`;
        return axiosClient.delete(url);
    },
    getById(id){
        const url = `/api/v1/cms/stock/detail/${id}`;
        return axiosClient.get(url);
    },
    updateStock(id,data){
        const url = `/api/v1/cms/stock/update/${id}`;
        return axiosClient.put(url,data);
    }
}
export default stockAPI