import React from "react";
import ShowWorkExperience from "./ShowWorkExperience";

const CardShowExperience = ({infoUser}) => {
  return (
    <div className="card">
      <div className="card-body">
         {infoUser.jobsExperience.map(job=>(
            <ShowWorkExperience job={job}  />
         ))}
        {/* <Name workExperience={workExperience} handleChange={handleChange} />
          <Industry
            workExperience={workExperience}
            handleChange={handleChange}
          />

          <WorkPosition
            workExperience={workExperience}
            handleChange={handleChange}
          />
          <WorkingTime
            workExperience={workExperience}
            handleChange={handleChange}
          /> */}
        {/* <div className="row">
          <div className="col-sm-3"></div>
          <div className="col-sm-9 text-secondary">
            <button
              type="submit"
              className="btn btn-outline-dark px-4"

            >
               Experiencia
            </button>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default CardShowExperience;
