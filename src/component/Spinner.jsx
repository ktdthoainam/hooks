import React from "react";

function Spinner() {
  return (
    <div className="spinner">
      <div className="spinner-border text-primary  me-2" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
      <div className="spinner-border text-secondary me-2" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
      <div className="spinner-border text-success me-2" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
      <div className="spinner-border text-danger" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
}
export default Spinner;
