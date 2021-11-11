import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Country from "./Country";
import Description from "./Description";
import Title from "./Title";
import City from "./City";
import Salary from "./Salary";
import Postulates from "./Postulates";
import Technologies from "./Technologies";
import Status from "./Status";

const JobsPublications = ({ infoUser, setInfoUser, job }) => {
  const [editValue, setEditValue] = useState(true);
  const { juniors, technologies } = useSelector((state) => state);
  const [postulatiosTechnoliges, setPostulatiosTechnoliges] = useState([]);
  const [juniorsAplied, setJuniorsAplied] = useState([]);

  const [infoJobs, setInfoJobs] = useState({
    title: "",
    description: "",
    photograph: "",
    country: "",
    city: "",
    currency: "",
    technologies: [],
    salary: 0,
    date: "",
    companyId: "",
    premium: "",
    status: "",
    _id:''
  });
  const handleChange = (e) => {
    console.log('entrando', e.target.name, e.target.value);
    setInfoJobs((info) => ({
      ...info,
      [e.target.name]: e.target.value,
    }));
  };
  const handleClick = () => {
    setEditValue((d) => !d)
    if(!editValue)console.log('truer');
  }

  useEffect(() => {
    let techUsed = job.technologies.map((tech) => {
      const techn = technologies.find((t) => t._id === tech);
      return techn;
    });
    setPostulatiosTechnoliges(techUsed);
    setInfoJobs({
      title: job.title,
      description: job.description,
      photograph: job.photograph,
      country: job.country,
      city: job.city,
      currency: job.currency,
      technologies: [...techUsed],
      salary: job.salary,
      date: job.date,
      companyId: job.companyId,
      premium: job.premium,
      status: job.status,
    });
  }, []);

  return (
    <div className="accordion">
      <div className="accordion-item">
        <h2 className="accordion-header" id="panelsStayOpen-headingOne">
          <button
            className="accordion-button "
            type="button"
            data-bs-toggle="collapse"
            data-bs-target={`#panelsStayOpen-collapseOne-${job._id}`}
            aria-expanded="false"
            aria-controls={`panelsStayOpen-collapseOne-${job._id}`}
          >
            <div className="col-sm-6">{infoJobs.title}</div>
            <div className="col-sm-6">Postulados {juniorsAplied.length}</div>
          </button>
        </h2>
        <div
          id={`panelsStayOpen-collapseOne-${job._id}`}
          className="accordion-collapse collapse show"
          aria-labelledby="panelsStayOpen-headingOne"
        >
          <div className="accordion-body">
            <Title
              infoJobs={infoJobs}
              editValue={editValue}
              handleChange={handleChange}
            />
            <Description
              infoJobs={infoJobs}
              editValue={editValue}
              handleChange={handleChange}
            />
            <Country
              infoJobs={infoJobs}
              editValue={editValue}
              handleChange={handleChange}
            />
            <City
              infoJobs={infoJobs}
              editValue={editValue}
              handleChange={handleChange}
            />
            <Salary
              infoJobs={infoJobs}
              editValue={editValue}
              handleChange={handleChange}
            />
            <Technologies
              infoJobs={infoJobs}
              editValue={editValue}
              setInfoJobs={setInfoJobs}
              postulatiosTechnoliges={postulatiosTechnoliges}
            />
            <Postulates
              infoJobs={infoJobs}
              editValue={editValue}
              handleChange={handleChange}
              job={job}
              juniorsAplied={juniorsAplied}
              setJuniorsAplied={setJuniorsAplied}
            />
            <Status
              infoJobs={infoJobs}
              editValue={editValue}
              setInfoJobs={setInfoJobs}
              handleChange={handleChange}
            />
            <div className="row mb-3">
              <div className="col-sm-4"></div>
              <div className="col-sm-8 ">
                <button
                  className="btn btn-outline-dark px-4"
                  onClick={handleClick}
                >
                  {editValue ? "Editar" : "Guardar"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobsPublications;
