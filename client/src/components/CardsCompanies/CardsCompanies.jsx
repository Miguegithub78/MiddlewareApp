import React from "react";
import { Link } from "react-router-dom";
import "./card.css";
//import { useSelector } from 'react-redux';


export const CardsCompanies = ({ arrayCompanies }) => {
    //const companies = useSelector((state) => state.companies);

    return (
        <div className="d-flex justify-content-around">

            {arrayCompanies.map((p) => (
                <div className="card text-center  mx-5  bg-dark " style={{ width: " 80% " }} >
                    <Link to={`/companies/${p._id}`} key={p.name}>

                        <img src={p.photograph} className="card-img-top" style={{ width: " 80% " }} alt="Card image cap" />

                        <div className="card-body  text-light">
                            <p className="card-title">{p.name}</p>
                            <p>Empresa Premium: {p.premium}</p>
                        </div>
                    </Link>
                </div >
            ))}
        </div >


    );
};
