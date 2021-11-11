import React from "react";

const City = ({ infoJobs, editValue, handleChange }) => {
  return (
    <div className="row mb-3">
      <div className="col-sm-4">
        <h6 className="mb-0 text-secondary text-secondary">Ciudad</h6>
      </div>
      <div className="col-sm-8 ">
        {!editValue ? (
          <input
            className="form-control"
            type="text"
            name="city"
            onChange={handleChange}
            value={infoJobs.city}
          />
        ) : (
          <span>{infoJobs.city}</span>
        )}
      </div>
    </div>
  );
};

export default City;
