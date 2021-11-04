import React from "react";
import "./Login.css";

const LoginPrueba = () => {
  return (
    <div className="container mt-3">
      <div className="row no-gutter">
        <div className="col-md-6 d-none d-md-flex  bg-image"></div>
        <div className="col-md-6 bg-light">
          <div className="login d-flex align-items-center py-5">
            <div className="container">
              <div className="row">
                <div className="col-lg-7 col-xl-6 mx-auto">
                  <h3 className="display-4">LOGIN!!</h3> <br />
                  <form>
                    <div className="form-group mb-3">
                      {" "}
                      <input
                        id="inputEmail"
                        type="email"
                        placeholder="Email address"
                        required=""
                        autofocus=""
                        className="form-control rounded-pill border-0 shadow-sm px-4"
                      />{" "}
                    </div>
                    <div className="form-group mb-3">
                      {" "}
                      <input
                        id="inputPassword"
                        type="password"
                        placeholder="Password"
                        required=""
                        className="form-control rounded-pill border-0 shadow-sm px-4 text-danger"
                      />
                      <br />{" "}
                    </div>

                    <button
                      type="submit"
                      className="btn btn-danger btn-block text-uppercase mb-2 rounded-pill shadow-sm"
                    >
                      Sign in
                    </button>
                    <div className="text-center d-flex justify-content-between mt-4">
                      <p>
                        {" "}
                        OR &nbsp;
                        <a href=" " className="font-italic text-muted">
                          {" "}
                          <u>Create Account</u>
                        </a>
                      </p>
                    </div>
                    <div className="mt-2">
                      <button
                        type="button"
                        className="btn btn-ligth  btn-outline-warning me-2"
                        //   onClick={() => dispatch(loginUserAction("google", type))}
                      >
                        Google
                      </button>
                      <button
                        type="button"
                        className="btn btn-ligth  btn-outline-warning"
                        //   onClick={() => dispatch(loginUserAction("github", type))}
                      >
                        Github
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPrueba;
