import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

function StudentDetail() {
  const { studentId } = useParams();
  const [studentDetail, setStudentDetail] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setIsLoading(true);
    fetch(`https://6571b5ded61ba6fcc01353c3.mockapi.io/teacher/${studentId}`)
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
        <Link to={"/student"}>Back to list</Link>
      </div>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          {/* <div>Fullname: {studentDetail.name}</div>
          <div>Email: {studentDetail.email} </div> */}
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
              <li className="list-group-item">DOB: {studentDetail.dob}</li>
              <li className="list-group-item">
                Gender: {studentDetail.gender}
              </li>
            </ul>
          </div>
        </>
      )}
    </>
  );
}
export default StudentDetail;
