import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function StudentList() {
  const [studentList, setStudentList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetch("https://6571b5ded61ba6fcc01353c3.mockapi.io/teacher")
      .then((response) => response.json())
      .then((data) => {
        setStudentList(data);
        setIsLoading(false);
      });
  }, []);
  console.log(studentList);
  return (
    <>
      <div>
        <h3>Quản lý sinh viên</h3>
      </div>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <table className="table table-striped">
          <thead>
            <tr>
              <th> #ID</th>
              <th>HỌ VÀ TÊN</th>
              <th>NGÀY SINH</th>
              <th>Email</th>
              <th>GIỚI TÍNH</th>
              <th>TUỲ CHỌN</th>
            </tr>
          </thead>
          <tbody>
            {studentList.map((student) => (
              <tr key={student.id}>
                <td>{student.id}</td>
                <td>
                  <div className="d-flex align-items-center">
                    <img
                      className="rounded-circle avatar-sm me-2"
                      src={student.avatar}
                      alt=""
                    />
                    {student.name}
                  </div>
                </td>
                <td>{student.dob}</td>
                <td>{student.email}</td>
                <td>{student.gender ? "Male" : "Famale"}</td>
                <td>
                  <Link
                    to={`/student/${student.id}`}
                    className="btn btn-sm btn-link"
                  >
                    Detail
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
}
export default StudentList;
