import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

const JobsPublications = ({ infoUser, setInfoUser, job }) => {
  const [juniorsAplied, setJuniorsAplied] = useState([]);
  const [postulatiosTechnoliges, setPostulatiosTechnoliges] = useState([]);
  const { juniors, technologies } = useSelector((state) => state);

  useEffect(() => {
    const juniorsAplieded = job.juniors.map((junior) => {
      const juniorData = juniors.find((j) => j._id === junior);
      return juniorData;
    });
    console.log(juniorsAplieded,'juniorsAplieded');
    setJuniorsAplied(juniorsAplieded);
    const techUsed = job.technologies.map((tech) => {
      const techn = technologies.find((t) => t._id === tech);
      return techn;
    });
    setPostulatiosTechnoliges(techUsed);
  }, []);

  return (
    <div className="card">
      <h4 className="text-center">Publicacion: {job.title}</h4>
      <div className="card-body">
        <div className="row mb-3">
          <div className="col-sm-4">
            <h6 className="mb-0">Titulo</h6>
          </div>
          <div className="col-sm-8 text-secondary">
            <span>{job.title}</span>
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-sm-4">
            <h6 className="mb-0">Descripción</h6>
          </div>
          <div className="col-sm-8 text-secondary">
            <span>{job.description}</span>
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-sm-4">
            <h6 className="mb-0">Direccion</h6>
          </div>
          <div className="col-sm-8 text-secondary">
            <span>
              {job.city},{job.country}
            </span>
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-sm-4">
            <h6 className="mb-0">Salario</h6>
          </div>
          <div className="col-sm-8 text-secondary">
            <span>
              {job.salary}, {job.currency}
            </span>
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-sm-4">
            <h6 className="mb-0">Tecnologia</h6>
          </div>
          <div className="col-sm-8 text-secondary">
            {postulatiosTechnoliges.map((tech, i) => (
              <span key={i}>{tech.name} , </span>
            ))}
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-sm-4">
            <h6 className="mb-0">Postulados</h6>
          </div>
          <div className="col-sm-8 text-secondary">
            {juniorsAplied.map((jun, i) => (
              // getPostulators(jun)
              <span key={i}>
                <Link to={`/juniors/${jun._id}`}>{jun.name}</Link> ,</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobsPublications;
