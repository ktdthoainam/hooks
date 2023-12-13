import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import StudentDetail from "./StudentDetail";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { ToastContainer, toast } from "react-toastify";
import dayjs from "dayjs";
import StudentServices from "../services/studentServices";
import DepartmentServices from "../services/departmentServices";
import Spinner from "../component/Spinner";
import FileService from "../services/fileSevice";

const schema = yup.object({
  name: yup.string().required(),
  email: yup.string().required().email(),
  dob: yup.date().required().typeError("dob is a required field"),
  // avatar: yup.string().required().url(),
});

function ModifyStudent() {
  const { studentId } = useParams();
  const [StudentDetail, setStudentDetail] = useState({});
  const [departmentList, setDepartmentList] = useState([]);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const [temporaryAvatar, setTemporaryAvatar] = useState();
  const [newFileAvatar, setNewFileAvatar] = useState({});
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    setIsLoading(true);
    async function getStudent() {
      let studentRes = await StudentServices.getStudent(studentId);
      setStudentDetail(studentRes.data);
      setValue("name", studentRes.data.name);
      setValue("email", studentRes.data.email);
      setValue("dob", dayjs(studentRes.data.dob).format("YYYY-MM-DD"));
      setValue("gender", studentRes.data.gender);
      setValue("avatar", studentRes.data.avatar);
      setValue("department", JSON.stringify(studentRes.data.department));
      setIsLoading(false);
    }
    getStudent();
  }, [studentId]);

  useEffect(() => {
    setIsLoading(true);
    async function fetchDepartment() {
      let deparRes = await DepartmentServices.getDepartments();
      setDepartmentList(deparRes.data);
      setIsLoading(false);
    }
    fetchDepartment();
  }, []);
  const handleUpdateAvatar = async () => {
    if (newFileAvatar?.name) {
      setIsUploading(true);
      let uploadRes = await FileService.upload(newFileAvatar);
      if (uploadRes?.data?.secure_url) {
        await StudentServices.modifyStudent(
          {
            avatar: uploadRes.data.secure_url,
          },
          studentId
        );
        setTemporaryAvatar(uploadRes.data.secure_url);
        toast.success("Avatar đã được thay đổi");
      }
      setIsUploading(false);
    } else {
      toast.info("Bạn phải cung cấp ảnh avatar mới");
    }
  };
  const handleChangeAvatar = (e) => {
    const temporaryAvatar = URL.createObjectURL(e.target.files[0]);
    setTemporaryAvatar(temporaryAvatar);
    setNewFileAvatar(e.target.files[0]);
  };

  const handleUpdate = async (data) => {
    data.department = JSON.parse(data.department);
    setIsLoading(true);
    let editStudentRes = await StudentServices.modifyStudent(data, studentId);
    if (editStudentRes.data) {
      toast.success(`Cập nhật thành công`);
      setIsLoading(false);
      navigate("/student");
    }
  };

  return (
    <>
      <div>
        <h3>Chỉnh sửa danh sách sinh viên</h3>
        <Link to={"/student"}>Quay lại danh sách sinh viên</Link>
      </div>
      <div>
        {isLoading ? (
          <Spinner />
        ) : (
          <form onSubmit={handleSubmit(handleUpdate)}>
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
                  <span className="text-danger"> {errors.email?.message}</span>
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
                  <span className="text-danger"> {errors.email?.message}</span>
                </div>
              </div>
              <div className="col-md-4">
                {/* <div className="form-group mb-3"> */}
                {/* <label className="form-label">
                    {" "}
                    Avatar <span className="text-danger">(*)</span>
                  </label>
                  <input
                    type="text"
                    className="form-control "
                    {...register("avatar")}
                  /> */}
                {/* </div> */}
                <div className="form-group mb-4">
                  <label className="form-label mb-2"> Giới tính </label>
                  <div>
                    {StudentDetail.gender == "Nam" ? (
                      <>
                        <div className="form-check form-check-inline">
                          <input
                            className="form-check-input"
                            type="radio"
                            defaultValue="Nam"
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
                            defaultValue="Nữ"
                            name="gender"
                            {...register("gender")}
                          />
                          <label className="form-check-label">Nữ</label>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="form-check form-check-inline">
                          <input
                            className="form-check-input"
                            type="radio"
                            defaultValue="Nam"
                            name="gender"
                            {...register("gender")}
                          />
                          <label className="form-check-label">Nam</label>
                        </div>
                        <div className="form-check form-check-inline">
                          <input
                            className="form-check-input"
                            type="radio"
                            defaultValue="Nữ"
                            checked
                            name="gender"
                            {...register("gender")}
                          />
                          <label className="form-check-label">Nữ</label>
                        </div>
                      </>
                    )}
                  </div>
                </div>
                <div className="form-group mb-4">
                  <label className="form-label">
                    Chuyên ngành <span className="text-danger">(*)</span>
                  </label>
                  <select className="form-control" {...register("department")}>
                    {departmentList.map((department) => (
                      <option
                        key={department.id}
                        value={JSON.stringify(department)}
                      >
                        {department.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="col-md-4 d-flex flex-column align-items-center">
                <img
                  className="w-50 avatar-md"
                  src={temporaryAvatar || StudentDetail.avatar}
                  alt=""
                  {...register("avatar")}
                  onClick={() => document.getElementById("file-avatar").click()}
                />
                <input
                  type="file"
                  accept="image/*"
                  className="d-none"
                  id="file-avatar"
                  onChange={handleChangeAvatar}
                />
                {isUploading ? (
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
                    type="button "
                    className="btn tn-sm btn-warning mt-1"
                    onClick={handleUpdateAvatar}
                  >
                    Thay đổi Avatar
                  </button>
                )}
              </div>
              <div className="form-group mb-3">
                <button className="btn btn-sm btn-success me-3" type="submit">
                  {" "}
                  CẬP NHẬT
                </button>
                <Link
                  to={"/student"}
                  className="btn btn-sm btn-dark"
                  type="button"
                >
                  {" "}
                  HUỶ
                </Link>
              </div>
            </div>
          </form>
        )}
      </div>
    </>
  );
}
export default ModifyStudent;
