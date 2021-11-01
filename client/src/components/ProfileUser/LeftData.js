import { useState } from "react";
import CareerData from "./CareerData";
import SocialMedia from "./SocialMedia";

const Prueba2left = ({ user, setInfoUser, infoUser }) => {
  const [editValue, setEditValue] = useState(true);
  const handleChange = (e) => {
    setInfoUser((info) => ({
      ...info,
      description: e.target.value,
    }));
  };
  return user ? (
    <div className="col-lg-4">
      <div className="card">
        <div className="card-body">
          <div className="d-flex flex-column align-items-center text-center">
            <img
              src={user.photograph}
              alt="Admin"
              className="rounded-circle p-1 bg-primary"
              width="140"
            />
            <div className="mt-3">
              <h4>{user.name}</h4>
              <p className="text-secondary mb-1">
                {user.title !== "" ? "Full Stack Developer" : user.title}
              </p>
              <p className="text-muted font-size-sm">
                {user.city !== "" ? "Córdoba, Argentina" : user.city}
              </p>
            </div>
          </div>
          <hr className="my-4" />
          <div className="row mb-3">
            <div className="col-sm-12 text-secondary">
              <textarea
                className={`form-control ${!editValue && "green-shadow"}`}
                type="text"
                value={infoUser.description}
                placeholder="Quien eres? . . ."
                onChange={handleChange}
                name="description"
                disabled={editValue}
              />
            </div>
          </div>
          <button
            className="btn btn-outline-dark px-4"
            onClick={() => setEditValue((d) => !d)}
          >
            {editValue ? "editar" : "aceptar"}
          </button>
        </div>
      </div>
      <SocialMedia setInfoUser={setInfoUser} infoUser={infoUser} />
    </div>
  ) : (
    "Cargando...."
  );
};

export default Prueba2left;
