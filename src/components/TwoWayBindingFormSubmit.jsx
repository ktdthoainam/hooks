import React, { useState } from "react";

function TwoWayBindingFormSubmit() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [isSuccess, setIsSuccess] = useState();
  const [showAlert, setShowAlert] = useState();

  const handleSubmitLogin = (e) => {
    e.preventDefault();
    if (email === "ktdthoainam@gmail.com" && password === "ktdt1234") {
      setIsSuccess(true);
    } else {
      setIsSuccess(false);
    }
    setShowAlert(true);
    // console.log({
    //   email: email,
    //   password: password,
    // });
  };
  //   console.log(email,password);
  const handleGetAccount = () => {
    setEmail("ktdthoainam@gmail.com");
    setPassword("passwordktdt");
  };

 
  
 
  return (
    <div>
      <h1>Login Form</h1> 
      {
        isSuccess && showAlert && (
      <div className="alert alert-success" role="alert">
        Login success
      </div>
    )||
    showAlert && !isSuccess && (
      <div className="alert alert-danger" role="alert">
        Login fail
      </div>
    )
  }
      
      <form onSubmit={handleSubmitLogin}>
        <div className="form-group">
          <label className="form-label">Email</label>
          <input
            type="email"
            value={email}
            className="form-control"
            required
            onInput={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor=""> Password</label>
          <input
            minLength={8}
            maxLength={15}
            type="password"
            value={password}
            className="form-control"
            required
            onInput={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="form-group">
          <button type="submit" className="btn btn-dark me-3">
            Login
          </button>
          <button
            type="button"
            className="btn btn-warning"
            onClick={handleGetAccount}
          >
            Get Account
          </button>
        </div>
      </form>
    </div>
  );
}
export default TwoWayBindingFormSubmit;
