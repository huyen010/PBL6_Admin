import UpdateSupply from "../components/Supply/UpdateSupply";
import axiosClient from "./axiosClient";

const supplyAPI = {
    getALL(page) {
        const url = `/api/v1/cms/supplies/all/${page}`;
        return axiosClient.get(url);
    },
    deleteSupply(id) {
        const url = `/api/v1/cms/supplies/delete/${id}`;
        return axiosClient.delete(url);
    },
    insertSupply(data){
        const url = `/api/v1/cms/supplies/insert`;
        return axiosClient.post(url,data)
    },
    getRepresentative(id){
        const url = `/api/v1/cms/supplies/representative/${id}`;
        return axiosClient.get(url)
    },
    getSupply(id){
        const url = `/api/v1/cms/supplies/detail/${id}`;
        return axiosClient.get(url)
    },
    updateSupply(id,data){
        const url = `/api/v1/cms/supplies/update/${id}`;
        return axiosClient.put(url,data)
    },
    getListProduct(id){
        const url = `/api/v1/cms/supplies/product/${id}`;
        return axiosClient.get(url)
    }
}
export default supplyAPI