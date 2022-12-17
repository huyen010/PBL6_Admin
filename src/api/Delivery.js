import axiosClient from "./axiosClient";

const deliveryAPI = {
    getALL() {
        const url = `/api/v1/cms/deliveries`;
        return axiosClient.get(url);
    }
}
export default deliveryAPI;