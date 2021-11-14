import { useState } from "react";
import { useDispatch } from "react-redux";
import Industry from "./Industry";
import Name from "./Name";
import WorkingTime from "./WorkingTime";
import WorkPosition from "./WorkPosition";

const JobsExperience = ({ infoUser, setInfoUser }) => {
  const dispatch = useDispatch();
  // const handleChange = (e) => {
  //   setInfoUser((info) => ({
  //     ...info,
  //     infoUserChanged: true,
  //     [e.target.name]: e.target.value,
  //   }));
  // };
  const [workExperience, setWorkExperience] = useState({
    companyName: "",
    industry: "",
    workPosition: "",
    workingTime: "",
    id:''
  });
  const handleChange = (e) => {
    setWorkExperience((info) => ({
      ...info,
      [e.target.name]: e.target.value,
    }));
  };

  // const [editValue, setEditValue] = useState(true);

  const handleClick = (e) => {
    e.preventDefault()
    if (
      workExperience.companyName === "" ||
      workExperience.industry === "" ||
      workExperience.workPosition === "" ||
      workExperience.workingTime === ""
    )
      return;
      workExperience.id=1
    setInfoUser((info) => ({
      ...info,
      jobsExperience: [...info.jobsExperience, workExperience],
    }));
  };
  return (
    <div className="card">
      <div className="card-body">
        <form>
          <Name workExperience={workExperience} handleChange={handleChange} />
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
          />

          <div className="row">
            <div className="col-sm-3"></div>
            <div className="col-sm-9 text-secondary">
              <button
                type="submit"
                className="btn btn-outline-dark px-4"
                onClick={handleClick}
              >
                Agregar Experiencia
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default JobsExperience;
