import React from "react";
import Title from "../../ProfileCompany/JobsPublications/Title";

const ShowWorkExperience = ({ job }) => {
  return (
    <div className="accordion">
      <div className="accordion-item">
        <h2 className="accordion-header" id="panelsStayOpen-headingOne">
          <button
            className="accordion-button "
            type="button"
            data-bs-toggle="collapse"
            data-bs-target={`#panelsStayOpen-collapseOne-${job.companyName}`}
            aria-expanded="false"
            aria-controls={`panelsStayOpen-collapseOne-${job.companyName}`}
          >
            <div className="col-sm-6">{job.companyName}</div>
          </button>
        </h2>
        <div
           id={`panelsStayOpen-collapseOne-${job.companyName}`}
          className="accordion-collapse collapse show"
          aria-labelledby="panelsStayOpen-headingOne"
        >
          <div className="accordion-body">
            <div className="container">
               <p>{job.companyName}</p>
               <p>{job.industry}</p>
               <p>{job.workPosition}</p>
               <p>{job.workingTime}</p>
            </div>
           
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowWorkExperience;
