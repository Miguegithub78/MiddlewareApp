import React from "react";
import { Link } from "react-router-dom";
import styles from "./LandingPage.module.css";
import LoginImage from "./image.png"
export default function LandingPage() {
  return (
    <div className="">
      <div className="d-flex justify-content-around align-items-center">

        <div className="">
          <h1>Middleware</h1>
          <h5>Un puente entre empresas y programadores</h5>
          <Link className="btn btn-block btn-dark btn-outline-light me-2" to="/login/juniors">Programador Js</Link>
          <Link className="btn btn-block btn-dark btn-outline-light" to="/login/company">Empresa</Link>
        </div>

        <div className="">
          <img src={LoginImage} alt="Login Image" className={styles.loginImage} />
        </div>


      </div>
    </div>
  );
}