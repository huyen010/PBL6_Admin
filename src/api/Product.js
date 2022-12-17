import axiosClient from "./axiosClient";

const productAPI = {
    getALL(slug,page) {
        const url = `/api/v1/cms/products/${slug}/${page}`;
        return axiosClient.get(url);
    },
    addProduct(data){
        const url = `/api/v1/cms/products/insert`;
        return axiosClient.post(url,data);
    },
    deleteProduct(id){
        const url = `/api/v1/cms/products/delete/${id}`;
        return axiosClient.delete(url);
    },
    getById(id){
        const url = `/api/v1/cms/products/detail/${id}`;
        return axiosClient.get(url);
    },
    updateProduct(id,data){
        const url = `/api/v1/cms/products/update/${id}`;
        return axiosClient.put(url,data);
    },
    getProperties(){
        const url = `/api/v1/cms/products/properties`;
        return axiosClient.get(url);
    },
    sellProduct(id,data){
        const url = `/api/v1/cms/products/sell-product/${id}`;
        return axiosClient.post(url,data);
    },
    searchProduct(search,cate,page){
        const url = `/api/v1/cms/products/${cate}/${search}/${page}`;
        return axiosClient.get(url);
    }
}
export default productAPI