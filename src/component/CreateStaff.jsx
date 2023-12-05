import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object({
  fullname: yup.string().required("Bạn cần cung cấp cả họ và tên"),
  age: yup.number().required().typeError("Bạn cần cung cấp tuổi"),
});

function CreateStaff() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleCreateStaff = (data) => {
    console.log(data);
  };
  return (
    <div>
      <form onSubmit={handleSubmit(handleCreateStaff)}>
        <div className="form-group mb-3">
          <label className="form-label"> Fullname</label>
          <input
            type="text"
            className="form-control"
            {...register("fullname")}
          />
          <span className="text-danger">{errors?.fullname?.message}</span>
        </div>
        <div className="form-group mb-3">
          <label className="form-label"> Age</label>
          <input type="number" className="form-control" {...register("age")} />
          <span className="text-danger">{errors?.age?.message}</span>
        </div>
        <div className="form-group mb-3">
          <button type="submit" className="btn btn-dark ">
            {" "}
            Create
          </button>
        </div>
      </form>
    </div>
  );
}
export default CreateStaff;
