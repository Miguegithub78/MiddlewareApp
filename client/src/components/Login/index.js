import React from "react";
import "./Login.css";

const Login = () => {
  return (
    <div className="container ">
      <div className="row g-0 mt-5 mb-5 height-100">
        <div className="col-md-6">
          {/* <div className="bg-dark p-4 h-100 sidebar"> */}
          <div className="form-img"></div>
          {/* </div> */}
        </div>
        <div className="col-md-6 text-white">
          <div className="bg-dark  p-4 h-100">
            <div className="p-3 d-flex justify-content-center flex-column align-items-center">
              {" "}
              <span className="main-heading">Ingresa a Middleware </span>
              <hr />
              <ul className="social-list ">
                <li>
                  <button className="btn btn-block btn-outline-light fa-3x bi bi-google"></button>
                </li>
                <li>
                  <button className="btn btn-block btn-outline-light  bi bi-github"></button>
                </li>
              </ul>
              <hr />
              {/* <div className="form-data">
                {" "}
                <label>nombre</label>{" "}
                <input type="text" className="form-control w-100" />{" "}
              </div> */}
              <div className="form-data">
                {" "}
                <label>Email</label>{" "}
                <input type="text" className="form-control w-100" />{" "}
              </div>
              <div className="form-data">
                {" "}
                <label>Password</label>{" "}
                <input type="text" className="form-control w-100" />{" "}
              </div>
              <div className="d-flex justify-content-between w-100 align-items-center">
                {/* <div className="form-check">
                  {" "}
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                    id="flexCheckDefault"
                  />{" "}
                  <label className="form-check-label" for="flexCheckDefault">

                    Remember me{" "}
                  </label>{" "}
                </div>{" "} */}
                <a className="text-decoration-none forgot-text" href="#">
                  Forgot password?
                </a>
                <a className="text-decoration-none forgot-text" href="#">
                  crea una cuenta
                </a>
              </div>
              <hr />
              <div className="signin-btn w-100 mt-2">
                {" "}
                <button className="btn btn-block btn-outline-light">
                  Signin
                </button>{" "}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div >
  );
};

export default Login;