import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function TeacherList() {
  const [teacherList, setTeacherList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetch("https://6571b5ded61ba6fcc01353c3.mockapi.io/teacher")
      .then((response) => response.json())
      .then((data) => {
        setTeacherList(data);
        setIsLoading(false);
      });
  }, []);
  console.log(teacherList);
  return (
    <>
      <div>
        <h3>Teacher List</h3>
      </div>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th> #ID</th>
              <th>Full Name</th>
              <th>DOD</th>
              <th>Email</th>
              <th>Gender</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {teacherList.map((teacher) => (
              <tr key={teacher.id}>
                <td>{teacher.id}</td>
                <td>{teacher.name}</td>
                <td>{teacher.dod}</td>
                <td>{teacher.email}</td>
                <td>{teacher.gender ? "Male" : "Famale"}</td>
                <td>
                  <Link
                    to={`/teacher/${teacher.id}`}
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
export default TeacherList;
