import axiosClient from "./axiosClient";
const UploadAPI = {
    uploadFile(file){
        const url = `http://188.166.245.252:3002/api/v1/web/upload-image`;
        return axiosClient.post(url,file,{
            headers: {
              'content-type': 'multipart/form-data'
            }});
    }
}

export default UploadAPI;