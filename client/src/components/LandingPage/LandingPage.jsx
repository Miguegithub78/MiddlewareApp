import React from "react";
import { Link } from "react-router-dom";
import styles from "./LandingPage.module.css";
import LoginImage from "./image.png";
import { useSelector, useDispatch } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebaseConfig";
import { getUserAction } from "../../redux/actions";
import Error from "../Login/Error";

export default function LandingPage() {
  const { user, errorLogin } = useSelector((state) => state);
  const dispatch = useDispatch();
  onAuthStateChanged(auth, (userFirebase) => {
    if (userFirebase) {
      if (!user && userFirebase.emailVerified)
        dispatch(getUserAction(userFirebase));
    }
  });

  return (
    <div className="container">
      <div className="row g-5">
        <div className="col-md-5">
          <div className="d-flex flex-column justify-content-center h-100">
            <h1>Middleware</h1>
            <h5>Un puente entre empresas y programadores</h5>
            {user ? (
              user.userType === "juniors" ? (
                <Link
                  className="btn btn-block btn-dark btn-outline-light me-2"
                  to="/login/juniors"
                >
                  Programador Jr
                </Link>
              ) : (
                <Link
                  className="btn btn-block btn-dark btn-outline-light"
                  to="/login/companies"
                >
                  Empresa
                </Link>
              )
            ) : (
              <div>
                <Link
                  className="btn btn-block btn-dark btn-outline-light me-2"
                  to="/login/juniors"
                >
                  Programador Jr
                </Link>
                <Link
                  className="btn btn-block btn-dark btn-outline-light"
                  to="/login/companies"
                >
                  Empresa
                </Link>
              </div>
            )}
            {errorLogin && (
              <div className="mt-3">
                <Error msg={errorLogin} />
              </div>
            )}
          </div>
        </div>
        <div className="col-md-7 d-flex justify-items-center">
          <img
            src={LoginImage}
            alt="Login Image"
            className={` ${styles.loginImage}`}
          />
        </div>
      </div>
    </div>
  );
}
