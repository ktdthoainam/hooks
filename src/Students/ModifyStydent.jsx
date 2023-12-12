import React, { useState, useEffect } from "react";
import { Link, Params, useParams } from "react-router-dom";
import StudentDetail from "./StudentDetail";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { ToastContainer, toast } from "react-toastify";
import dayjs from "dayjs";

const schema = yup.object({
  name: yup.string().required(),
  email: yup.string().required().email(),
  dob: yup.date().required().typeError("dob is a required field"),
  avatar: yup.string().required().url(),
});

function ModifyStudent() {
  const { studentId } = useParams();
  const [StudentDetail, setStudentDetail] = useState({});
  const [departmentList, setDepartmentList] = useState([]);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
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
    fetch(`https://6571b5ded61ba6fcc01353c3.mockapi.io/student/${studentId}`)
      .then((res) => res.json())
      .then((data) => {
        setStudentDetail(data);
        setValue("name", data.name);
        setValue("email", data.email);
        setValue("dob", dayjs(data.dob).format("YYYY-MM-DD"));
        setValue("gender", data.gender);
        setValue("avatar", data.avatar);
        setValue("department", JSON.stringify(data.department));

        setIsLoading(false);
      });
  }, [studentId]);

  useEffect(() => {
    setIsLoading(true);
    fetch("https://6571b5ded61ba6fcc01353c3.mockapi.io/department")
      .then((response) => response.json())
      .then((data) => {
        setDepartmentList(data);
        setIsLoading(false);
      });
  }, []);

  const handleUpdate = (data) => {
    data.department = JSON.parse(data.department);
    fetch(`https://6571b5ded61ba6fcc01353c3.mockapi.io/student/${studentId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((result) => {
        toast.success(`Cập nhật thành công`);
        navigate("/student");
        setIsLoading(true);
      });
  };

  return (
    <>
      <div>
        <h3>CHỉnh sửa danh sách sinh viên</h3>
        <Link to={"/student"}>Quay lại danh sách sinh viên</Link>
      </div>
      <div>
        {isLoading ? (
          <p>Loading...</p>
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
                <div className="form-group mb-3">
                  <label className="form-label"> Avatar</label>
                  <input
                    type="text"
                    className="form-control "
                    {...register("avatar")}
                  />
                </div>
                <div className="form-group mb-4">
                  <label className="form-label mb-2"> Giới tính </label>
                  <div>
                    {StudentDetail.gender =="Nam" ? (
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
              <div className="col-md-4">
                {" "}
                <img
                  className="w-50"
                  src={StudentDetail.avatar}
                  alt=""
                  {...register("avatar")}
                />
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
