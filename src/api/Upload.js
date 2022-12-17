import axiosClient from "./axiosClient";
const UploadAPI = {
    uploadFile(file){
        const url = `/api/v1/web/upload-image`;
        return axiosClient.post(url,file,{
            headers: {
              'content-type': 'multipart/form-data'
            }});
    }
}

export default UploadAPI;