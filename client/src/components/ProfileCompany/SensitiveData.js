import React from "react";

const SensitiveData = ({ infoUser, setEditValue, editValue, setInfoUser  }) => {
  
  const handleChange = (e) => {
    setInfoUser((info) => ({
      ...info,
      infoUserChanged: true,
      [e.target.name]: e.target.value,
    }));
  };
  
  return (
    <>
      <div className="row mb-3 ">
        <div className="col-sm-3 ">
          <h6 className="mb-0">Nombre de la empresa</h6>
        </div>
        <div className="col-sm-9 text-secondary">
          <input
            className={`form-control ${!editValue && "green-shadow"}`}
            type="text"
            name="name"
            value={infoUser.name}
            onChange={handleChange}
            disabled={editValue}
          />
        </div>
      </div>
      <div className="row mb-3">
        <div className="col-sm-3">
          <h6 className="mb-0">Email</h6>
        </div>
        <div className="col-sm-9 text-secondary">
          <input
            className={`form-control ${!editValue && "green-shadow"}`}
            type="text"
            value={infoUser.gmail}
            onChange={handleChange}
            name="gmail"
            disabled={editValue}
          />
        </div>
      </div>

      {/* <div className="row mb-3">
        <div className="col-sm-3">
          <h6 className="mb-0">Celular</h6>
        </div>
        <div className="col-sm-9 text-secondary">
          <input
            type="number"
            className={`form-control ${!editValue && "green-shadow"}`}
            value={infoUser.phone}
            onChange={handleChange}
            name="phone"
            disabled={editValue}
          />
        </div>
      </div> */}
      <div className="row mb-3">
        <div className="col-sm-3">
          <h6 className="mb-0">Ciudad</h6>
        </div>
        <div className="col-sm-9 text-secondary">
          <input
            type="text"
            className={`form-control ${!editValue && "green-shadow"}`}
            value={infoUser.city}
            onChange={handleChange}
            name="city"
            disabled={editValue}
          />
        </div>
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
    </>
  );
};

export default SensitiveData;
