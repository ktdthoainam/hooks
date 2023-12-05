import React, { useEffect } from "react";
function StudentList() {
  useEffect(() => {
    return () => {
      console.log("unmount student list");
    };
  }, []);
  return <h1> Student List</h1>;
}
export default StudentList;
