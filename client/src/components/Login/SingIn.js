import React from "react";

const SingIn2 = ({
  setEmail,
  setPassword,
  email,
  password,
  errorLogin
}) => {
  console.log(errorLogin);
  return (
    <>
      <div className="form-data">
        <label>Email</label>
        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          className={`form-control w-100 ${errorLogin&&'btn-danger'}`}
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
          className={`form-control w-100 ${errorLogin&&'btn-danger'}`}
          required
        />
      </div>
    </>
  );
};

export default SingIn2;
