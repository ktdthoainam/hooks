import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import dayjs from "dayjs";

function StudentDetail() {
  const { studentId } = useParams();
  const [studentDetail, setStudentDetail] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setIsLoading(true);
    fetch(`https://6571b5ded61ba6fcc01353c3.mockapi.io/student/${studentId}`)
      .then((res) => res.json())
      .then((data) => {
        setStudentDetail(data);
        setIsLoading(false);
      });
  }, [studentId]);
  return (
    <>
      <div>
        <h3>Student Detail</h3>
        <Link to={"/student"}>Quay lại danh sách sinh viên</Link>
      </div>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          <div className="card" style={{ width: "18rem" }}>
            <img
              src={studentDetail.avatar}
              className="card-img-top"
              alt="..."
            />
            <div className="card-body">
              <h5 className="card-title">{studentDetail.name}</h5>
            </div>
            <ul className="list-group list-group-flush">
              <li className="list-group-item">Email: {studentDetail.email}</li>
              <li className="list-group-item">
                Ngày sinh: {dayjs(studentDetail.dob).format("DD/MM/YYYY")}
              </li>
              <li className="list-group-item">
                Chuyên ngành: {studentDetail.department?.name}
              </li>

              <li className="list-group-item">
                Giới tính: {studentDetail.gender}
              </li>
            </ul>
          </div>
        </>
      )}
    </>
  );
}
export default StudentDetail;
