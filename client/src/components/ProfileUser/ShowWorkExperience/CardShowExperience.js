import React from "react";
import ShowWorkExperience from "./ShowWorkExperience";

const CardShowExperience = ({infoUser, setWorkExperience, setInfoUser}) => {
  return (
    <div className="card">
       <h5 className='text-center'>Tus experiencias laborales</h5>
      <div className="card-body">
         {infoUser.jobsExperience.map(job=>(
            <div key={job._id?job._id:job.id}>
               <ShowWorkExperience setInfoUser={setInfoUser} infoUser={infoUser} setWorkExperience={setWorkExperience} job={job}  />
            </div>
         ))}
      </div>
    </div>
  );
};

export default CardShowExperience;
