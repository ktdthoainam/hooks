import axios from "axios";
const STUDENT_API_URL = `https://6571b5ded61ba6fcc01353c3.mockapi.io/student`;
class StudentServices {
  static getStudents() {
    return axios.get(STUDENT_API_URL);
  }
  static getStudent(id) {
    return axios.get(`${STUDENT_API_URL}/${id}`);
  }
  static deleteStudent(id) {
    return axios.delete(`${STUDENT_API_URL}/${id}`);
  }
  static createStudent(newStudent) {
    return axios.post(STUDENT_API_URL, newStudent);
  }
  static modifyStudent(editStudent, studentId) {
    return axios.put(`${STUDENT_API_URL}/${studentId}`, editStudent);
  }
}
export default StudentServices;
