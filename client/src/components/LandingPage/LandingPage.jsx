import React from "react";
import { Link } from "react-router-dom";
import styles from "./LandingPage.module.css";
import LoginImage from "./loginImage.png"
export default function LandingPage() {
  return (
    <div className="">
      <div className="d-flex justify-content-around align-items-center">

        <div className="">
          <h1>Middleware</h1>
          <h5>Un puente entre empresas y programadores</h5>
          <Link className="btn btn-outline-dark me-2" to="/login/programador">Programador Js</Link>
          <Link className="btn btn-outline-dark " to="/login/empresa">Empresa</Link>
        </div>

        <div className="">
          <img src={LoginImage} alt="Login Image" className={styles.loginImage} />
        </div>


      </div>
    </div>
  );
}