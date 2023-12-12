import axios from "axios";
const DEPARTMENT_API_URL = `https://6571b5ded61ba6fcc01353c3.mockapi.io/department`
class DepartmentServices{
    static getDepartments(){
        return axios.get(DEPARTMENT_API_URL)
    }

}
export default DepartmentServices;