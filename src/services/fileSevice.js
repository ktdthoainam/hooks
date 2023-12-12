import axios from "axios";
const CLOAU_API_UPLOAD ="https://api.cloudinary.com/v1_1/dh8babmcb/image/upload"
class FileService{
    static upload(image){
        const formData = new FormData();
        formData.append('file', image)
        formData.append('upload_preset','acsuyrcm')
        return axios.post(CLOAU_API_UPLOAD,formData)

    }


}
export default FileService;