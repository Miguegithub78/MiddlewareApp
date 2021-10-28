import React from "react";
import { Link } from "react-router-dom";
import styles from "./LandingPage.module.css";

export default function LandingPage() {
  return (
    <div className={styles.body}>
      <div className={styles.conteiner}>
        <h1>Middleware</h1>
        <h5>Un puente entre empresas y programadores</h5>

        <Link to="/login/programador">Programador Js</Link>
        <Link to="/login/empresa">Empresa</Link>
      </div>
    </div>
  );
}
