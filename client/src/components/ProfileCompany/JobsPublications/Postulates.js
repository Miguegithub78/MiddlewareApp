import {useState, useEffect} from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Postulates = ({ infoJobs, editValue, handleChange, job, juniorsAplied, setJuniorsAplied }) => {
  const { juniors, technologies } = useSelector((state) => state);

  useEffect(() => {
    const juniorsAplieded = job.juniors.map((junior) => {
      const juniorData = juniors.find((j) => j._id === junior);
      return juniorData;
    });
    setJuniorsAplied(juniorsAplieded);
    
  }, []);
  return (
    <div className="row mb-3">
      <div className="col-sm-4">
        <h6 className="mb-0 text-secondary">Postulados</h6>
      </div>
      <div className="col-sm-8 ">
        {juniorsAplied.map((jun, i) => (
          // getPostulators(jun)
          <span key={i}>
            <Link to={`/juniors/${jun._id}`}>{jun.name}</Link> ,
          </span>
        ))}
      </div>
    </div>
  );
};

export default Postulates;
