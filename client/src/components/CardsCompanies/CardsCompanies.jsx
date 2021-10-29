import React from "react";
import { Link } from "react-router-dom";
import "./card.css";
//import { useSelector } from 'react-redux';


export const CardsCompanies = ({ arrayCompanies }) => {
    //const companies = useSelector((state) => state.companies);

    return (
        <div className="card-deck" >

            <div className="card text-center   bg-dark " style={{ width: " 70% " }} >
                {arrayCompanies.map((p) => (
                    <Link to={`/companies/${p._id}`} key={p.name}>

                        <img src={p.photograph} className="card-img-top" style={{ width: " 80% " }} alt="Card image cap" />

                        <div className="card-body  text-light">
                            <p className="card-title">{p.name}</p>
                            <p>Empresa Premium: {p.premium}</p>
                        </div>
                    </Link>
                ))
                }
            </div >
        </div >


    );
};
