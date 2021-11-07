import React from "react";

const CreateAccount2 = ({
  setEmail,
  setPassword,
  email,
  password,
  handleClickCreate,
  name,
  setName,
}) => {
  return (
    <>
      <div className="form-data">
        <label>Nombre</label>{" "}
        <input
          placeholder="Nombre completo"
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
          className="form-control w-100"
          required
        />
      </div>
      <div className="form-data">
        <label>Email</label>{" "}
        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          className="form-control w-100"
          required
        />
      </div>
      <div className="form-data">
        <label>Password</label>
        <input
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          className="form-control w-100"
          required
        />
      </div>
    </>
  );
};

export default CreateAccount2;
