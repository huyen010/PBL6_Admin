import axiosClient from "./axiosClient";

const statisticalAPI = {
    getOrderByMonth(month) {
        const url = `/api/v1/cms/statistical/order/${month}`;
        return axiosClient.get(url);
    },
    getOrderStatus(){
        const url = `/api/v1/cms/statistical/number-status`;
        return axiosClient.get(url);
    },
    getBestSeller(){
        const url = `/api/v1/cms/statistical/top-product`;
        return axiosClient.get(url);
    }
}
export default statisticalAPI