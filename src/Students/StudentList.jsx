import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import StudentServices from "./../services/studentServices";
import DepartmentServices from "../services/departmentServices";
import NoAvatar from "../asset/image/noAvatar.png";
import FileService from "../services/fileSevice";

const schema = yup.object({
  name: yup.string().required(),
  email: yup.string().required().email(),
  dob: yup.date().required().typeError("dob is a required field"),
  // avatar: yup.string().required().url(),
  gender: yup.string().required(),
});

function StudentList() {
  const [studentList, setStudentList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [toggleForm, setToggleForm] = useState(false);
  const [departmentList, setDepartmentList] = useState([]);
  const [removeStudent, setRemoveStudent] = useState({});
  const [temporaryAvatar, setTemporaryAvatar] = useState();
  const [fileAvatar, setFileAvatar] = useState({});
  const [isUpload, setIsUpload] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  async function fetchData() {
    let studentRes = await StudentServices.getStudents();
    setStudentList(studentRes.data);
    setIsLoading(false);
  }

  useEffect(() => {
    setIsLoading(true);
    fetchData();
  }, [removeStudent]);

  useEffect(() => {
    setIsLoading(true);

    async function fetchDepartment() {
      let deparRes = await DepartmentServices.getDepartments();
      setDepartmentList(deparRes.data);
      setIsLoading(false);
    }
    fetchDepartment();
  }, []);

  const handleAddStudent = async (data) => {
    data.department = JSON.parse(data.department);
    data.avatar = temporaryAvatar;
    setIsLoading(true);
    let createStudentRes = await StudentServices.createStudent(data);
    if (createStudentRes.data) {
      toast.success(
        `Sinh viên ${createStudentRes.data.name} được thêm thành công}`
      );
      fetchData();
      reset();
      setTemporaryAvatar();
      setFileAvatar();
    }
    setIsLoading(false);
  };
  const handleSelectAvatar = (e) => {
    // console.log(e.target.files[0]);
    const temporaryAvatar = URL.createObjectURL(e.target.files[0]);
    setTemporaryAvatar(temporaryAvatar);
    setFileAvatar(e.target.files[0]);
  };
  const handleUploadAvatar = async () => {
    setIsUpload(true);
    let uploadRes = await FileService.upload(fileAvatar);
    setTemporaryAvatar(uploadRes.data.secure_url);
    toast.success("Avatar cập nhật thành công");
    setIsUpload(false);
  };
  const handleRemoveStudent = (student) => {
    Swal.fire({
      title: "Bạn chắc chắn muốn xoá?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Xoá",
      cancelButtonText: "Huỷ",
    }).then(async (result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Đã xoá!",
          icon: "success",
        });
        let delStudentRes = await StudentServices.deleteStudent(student.id);
        if (delStudentRes.data) {
          setRemoveStudent(delStudentRes.data);
        } else {
          toast.error("Lỗi");
        }
      }
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
                <div className="col-md-4">
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
                <div className="col-md-4">
                  {/* <div className="form-group mb-3">
                    <label className="form-label"> Avatar</label>
                    <input
                      type="text"
                      className="form-control"
                      {...register("avatar")}
                    />
                     <span className="text-danger">
                      {" "}
                      {errors.avatar?.message}
                    </span>
                  </div> */}
                  <div className="form-group mb-3">
                    <label className="form-label"> Giới tính </label>
                    <div>
                      <div className="form-check form-check-inline">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="gender"
                          defaultValue="Nam"
                          {...register("gender")}
                        />
                        <label className="form-check-label">Nam</label>
                      </div>
                      <div className="form-check form-check-inline">
                        <input
                          className="form-check-input"
                          type="radio"
                          defaultValue="Nữ"
                          name="gender"
                          {...register("gender")}
                        />
                        <label className="form-check-label">Nữ</label>
                      </div>
                    </div>
                    <span className="text-danger">
                      {" "}
                      {errors.gender?.message}
                    </span>
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
                <div className="col-md-4">
                  <div className="form-group d-flex flex-column align-items-center">
                    <img
                      className="avatar-md"
                      src={temporaryAvatar || NoAvatar}
                      alt=""
                      onClick={() =>
                        document.getElementById("fileAvatar").click()
                      }
                    />
                    <input
                      type="file"
                      className="d-none"
                      id="fileAvatar"
                      accept="image/*"
                      onChange={handleSelectAvatar}
                    />
                    {isUpload ? (
                      <button
                        class="btn  btn-sm btn-warning"
                        type="button"
                        disabled
                      >
                        <span
                          className="spinner-border spinner-border-sm"
                          role="status"
                          aria-hidden="true"
                        ></span>
                        Uploading...
                      </button>
                    ) : (
                      <button
                        className="btn btn-sm btn-warning mt-1"
                        onClick={handleUploadAvatar}
                        type="button"
                      >
                        {" "}
                        Upload
                      </button>
                    )}
                  </div>
                </div>
                <div className="form-group mb-3">
                  <button className="btn btn-sm btn-success me-3" type="submit">
                    TẠO MỚI
                  </button>
                  <button
                    className="btn btn-sm btn-dark me-3"
                    type="button"
                    onClick={() => reset()}
                  >
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
                  <td>{student.gender}</td>
                  <td>{student.department.name}</td>
                  <td>
                    <Link
                      to={`/student/${student.id}`}
                      className="btn btn-sm btn-primary me-2"
                    >
                      Chi tiết
                    </Link>
                    <Link
                      to={`/student/modify/${student.id}`}
                      className="btn btn-sm btn-success me-2"
                    >
                      Sửa
                    </Link>
                    <button
                      className="btn btn-sm btn-danger"
                      type="button"
                      onClick={() => handleRemoveStudent(student)}
                    >
                      Xoá
                    </button>
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
