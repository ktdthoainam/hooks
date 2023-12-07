import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function TeacherDetail() {
  const { teacherId } = useParams();
  const [teacherDetail, setTeacherDetail] = useState({});
  useEffect(() => {
    fetch(`https://6571b5ded61ba6fcc01353c3.mockapi.io/teacher/${teacherId}`)
    .then((res) => res.json())
    .then((data) => {
        setTeacherDetail(data)

    })
  }, [teacherId]);
  return (
    <div>
      <div>Fullname: {teacherDetail.name}</div>
      <div>Email: {teacherDetail.email} </div>
    </div>
  );
}
export default TeacherDetail;
