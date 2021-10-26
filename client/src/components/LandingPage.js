import React from "react";
import { Link } from "react-router-dom";
import styles from "./LandingPage.module.css"


export default function LandingPage() {
    return (
        <div className={styles.body}>
            <div>
                <h1>Middleware</h1>
                <h4>Un puente entre empresas y programadores</h4>

                <Link to="/home">
                    <button>Programador Js</button>
                    <button>Empresa</button>
                    <button>Administrador</button>
                </Link>
            </div>
        </div >

    )
}