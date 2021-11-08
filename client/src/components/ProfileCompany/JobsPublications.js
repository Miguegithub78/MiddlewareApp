import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const JobsPublications = ({ infoUser, setInfoUser }) => {
  // const handleChange = (e) => {
  //   setInfoUser((info) => ({
  //     ...info,
  //     infoUserChanged: true,
  //     [e.target.name]: e.target.value,
  //   }));
  // };
  
  const [editValue, setEditValue] = useState(true);

  return (
    <div className="card">
      <h4 className="text-center">Tus Publicaciones de Trabajo</h4>
      <div className="card-body">
        <div className="row mb-3">
         
        </div>

        <div className="row">
          <div className="col-sm-3"></div>
          <div className="col-sm-9 text-secondary">
            <button
              className="btn btn-outline-dark px-4"
              onClick={() => setEditValue((d) => !d)}
            >
              {editValue ? "editar" : "aceptar"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobsPublications;
