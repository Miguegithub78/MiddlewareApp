import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import Industry from "./Industry";
import Name from "./Name";
import WorkingTime from "./WorkingTime";
import WorkPosition from "./WorkPosition";
import { v4 } from "uuid";
import { putJuniors } from "../../../redux/actions";
let a = true;

const JobsExperience = ({
  infoUser,
  setInfoUser,
  setWorkExperience,
  workExperience,
}) => {
  const dispatch = useDispatch();
  const handleChange = (e) => {
    setWorkExperience((info) => ({
      ...info,
      [e.target.name]: e.target.value,
    }));
  };
  const handleClick = (e) => {
    e.preventDefault();
    if (
      workExperience.companyName === "" ||
      workExperience.industry === "" ||
      workExperience.workPosition === "" ||
      workExperience.workingTime === ""
    )
      return;
    workExperience.id = v4();
    if (!workExperience.edit)  {
      console.log('entra aca');
      setInfoUser((info) => ({
        ...info,
        jobsExperience: [...info.jobsExperience, workExperience],
      }));
    } else {
      setInfoUser((info) => ({
        ...info,
        jobsExperience: info.jobsExperience.map((j) =>
          j._id === workExperience._id ? workExperience : j
        ),
      }));

      // editar el job de de dentro de info user
    }
    setWorkExperience({
      companyName: "",
      industry: "",
      workPosition: "",
      workingTime: "",
      id: "",
      edit: false,
    });
    a = false;
  };
  useEffect(() => {
    if (!a) {
      dispatch(putJuniors(infoUser, infoUser.idUser));
      a = true;
    }
  }, [a]);
  return (
    <div className="card">
      <h4 className="text-center text-secondary">
        Agregar experiencia de trabajo
      </h4>
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
                {workExperience.edit ? "Editar Experiencia" : "Agregar Experiencia"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default JobsExperience;
