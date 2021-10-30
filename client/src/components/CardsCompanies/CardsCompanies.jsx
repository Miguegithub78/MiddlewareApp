import React from "react";
import { Link } from "react-router-dom";
import styles from "./card.css";
//import { useSelector } from 'react-redux';


export const CardsCompanies = ({ arrayCompanies }) => {
    //const companies = useSelector((state) => state.companies);

    return (
        <div className="d-flex mt-5">

            {arrayCompanies.map((p) => (
                <div className={`card text-center  mx-4  bg-ligth bg-opacity-100${styles.card}`} style={{ width: " 80% " }}  >
                    <Link to={`/companies/${p._id}`} key={p.name}>

                        <img src={p.photograph} className="card-img-top mt-3" style={{ width: " 80% " }} alt="Card image cap" />

                        <div className="card-body  text-dark">
                            <h6 className="card-title">{p.name}</h6>
                        </div>
                    </Link>
                </div >
            ))}
        </div >


    );
};