import axiosClient from "./axiosClient";

const AddressAPI = {
    getALLProvine() {
        const url = `/api/v1/web/address/province`;
        return axiosClient.get(url);
    },
    getALLDistrict(id) {
        const url = `/api/v1/web/address/district/${id}`;
        return axiosClient.get(url);
    },
    getALLCommune(id) {
        const url = `/api/v1/web/address/commune/${id}`;
        return axiosClient.get(url);
    }  
}
export default AddressAPI;