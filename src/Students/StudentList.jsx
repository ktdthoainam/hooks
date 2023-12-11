import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { ToastContainer, toast } from "react-toastify";

const schema = yup.object({
  name: yup.string().required(),
  email: yup.string().required().email(),
  dob: yup.date().required().typeError("dob is a required field"),
  avatar: yup.string().required().url(),
});

function StudentList() {
  const [studentList, setStudentList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [toggleForm, setToggleForm] = useState(false);
  const [departmentList, setDepartmentList] = useState([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });
  useEffect(() => {
    setIsLoading(true);
    fetch("https://6571b5ded61ba6fcc01353c3.mockapi.io/student")
      .then((response) => response.json())
      .then((data) => {
        setStudentList(data);
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    setIsLoading(true);
    fetch("https://6571b5ded61ba6fcc01353c3.mockapi.io/department")
      .then((response) => response.json())
      .then((data) => {
        setDepartmentList(data);
        setIsLoading(false);
      });
  }, []);
  // console.log(departmentList);

  const handleAddStudent = (data) => {
    data.gender = Boolean(data.gender);
    data.department = JSON.parse(data.department);
    // setIsLoading(true);
    fetch("https://6571b5ded61ba6fcc01353c3.mockapi.io/student", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((result) => {
        toast.success(`Sinh viên ${result.name} được thêm thành công}`);
        fetch("https://6571b5ded61ba6fcc01353c3.mockapi.io/student")
          .then((response) => response.json())
          .then((data) => {
            setStudentList(data);
            setIsLoading(false);
          });
      });
  };
  return (
    <>
      <div>
        <h3>Quản lý sinh viên</h3>
      </div>
      <section>
        <div>
          <button
            className="btn btn-sm btn-warning"
            onClick={() => setToggleForm(!toggleForm)}
          >
            {" "}
            THÊM SINH VIÊN
          </button>
        </div>
        <div>
          {toggleForm && (
            <form onSubmit={handleSubmit(handleAddStudent)}>
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group mb-3">
                    <label className="form-label">
                      {" "}
                      Họ và tên <span className="text-danger">(*)</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Fullname"
                      {...register("name")}
                    />
                    <span className="text-danger"> {errors.name?.message}</span>
                  </div>
                  <div className="form-group mb-3">
                    <label className="form-label">
                      {" "}
                      Ngày sinh <span className="text-danger">(*)</span>
                    </label>
                    <input
                      type="date"
                      className="form-control"
                      {...register("dob")}
                    />
                    <span className="text-danger"> {errors.dob?.message}</span>
                  </div>
                  <div className="form-group mb-3">
                    <label className="form-label">
                      Email <span className="text-danger">(*)</span>
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Email"
                      {...register("email")}
                    />
                    <span className="text-danger">
                      {" "}
                      {errors.email?.message}
                    </span>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group mb-3">
                    <label className="form-label"> Avatar</label>
                    <input
                      type="text"
                      className="form-control"
                      {...register("avatar")}
                    />
                  </div>
                  <div className="form-group mb-3">
                    <label className="form-label"> Giới tính </label>
                    <div>
                      <div className="form-check form-check-inline">
                        <input
                          className="form-check-input"
                          type="radio"
                          defaultValue="true"
                          checked
                          name="gender"
                          {...register("gender")}
                        />
                        <label className="form-check-label">Nam</label>
                      </div>
                      <div className="form-check form-check-inline">
                        <input
                          className="form-check-input"
                          type="radio"
                          defaultValue="false"
                          name="gender"
                          {...register("gender")}
                        />
                        <label className="form-check-label">Nữ</label>
                      </div>
                    </div>
                  </div>
                  <div className="form-group mb-3">
                    <label className="form-label">
                      Chuyên ngành <span className="text-danger">(*)</span>
                    </label>
                    <select
                      className="form-control"
                      {...register("department")}
                    >
                      {departmentList.map((department) => (
                        <option value={JSON.stringify(department)}>
                          {department.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="form-group mb-3">
                  <button className="btn btn-sm btn-success me-3" type="submit">
                    {" "}
                    TẠO MỚI
                  </button>
                  <button
                    className="btn btn-sm btn-dark"
                    type="button"
                    onClick={() => reset()}
                  >
                    {" "}
                    HUỶ
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>
      </section>
      <section>
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
                <th>CHUYÊN NGÀNH</th>
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
                  <td>{dayjs(student.dob).format("DD/MM/YYYY")}</td>
                  <td>{student.email}</td>
                  <td>{student.gender ? "Male" : "Famale"}</td>
                  <td>{student.department.name}</td>
                  <td>
                    <Link
                      to={`/student/${student.id}`}
                      className="btn btn-sm btn-primary me-2"
                    >
                      Detail
                    </Link>
                    <Link
                      to={`/student/modify/${student.id}`}
                      className="btn btn-sm btn-success"
                    >
                      Modify
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
    </>
  );
}
export default StudentList;
