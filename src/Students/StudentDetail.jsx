import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function StudentDetail() {
  const { studentId } = useParams();
  const [studentDetail, setStudentDetail] = useState({});
  useEffect(() => {
    fetch(`https://6571b5ded61ba6fcc01353c3.mockapi.io/teacher/${studentId}`)
    .then((res) => res.json())
    .then((data) => {
      setStudentDetail(data)

    })
  }, [teacherId]);
  return (
    <div>
      <div>Fullname: {studentDetail.name}</div>
      <div>Email: {studentDetail.email} </div>
    </div>
  );
}
export default StudentDetail;
