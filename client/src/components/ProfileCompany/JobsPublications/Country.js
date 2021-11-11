import React from "react";

const Country = ({ infoJobs, editValue, handleChange }) => {
  return (
    <div className="row mb-3">
      <div className="col-sm-4">
        <h6 className="mb-0 text-secondary">País</h6>
      </div>
      <div className="col-sm-8 ">
        {!editValue ? (
          <input
            className="form-control"
            type="text"
            name="country"
            onChange={handleChange}
            value={infoJobs.country}
          />
        ) : (
          <span>{infoJobs.country}</span>
        )}
      </div>
    </div>
  );
};

export default Country;
