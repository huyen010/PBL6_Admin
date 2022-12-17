import axiosClient from "./axiosClient";
const billAPI = {
    getALL(page) {
        const url = `/api/v1/cms/bill/all/${page}`;
        return axiosClient.get(url);
    },
    canCelBill(id,data){
        const url = `/api/v1/cms/bill/cancel/${id}`;
        return axiosClient.post(url,data);
    },
    upDateManyBill(data){
        const url = `/api/v1/cms/bill/update-many`;
        return axiosClient.post(url,data);
    },
    getById(id){
        const url = `/api/v1/cms/bill/detail/${id}`;
        return axiosClient.get(url);
    },
    updateBill(id,data){
        const url = `/api/v1/cms/bill/update/${id}`;
        return axiosClient.put(url,data);
    },
    getTypeBill(status,delivery,page){
        const url = `/api/v1/cms/bill/type/${status}/${delivery}/${page}`;
        return axiosClient.get(url);
    }
}
export default billAPI