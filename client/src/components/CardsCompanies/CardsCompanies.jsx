import React from "react";
import { Link } from "react-router-dom";
//import { useSelector } from 'react-redux';


export const CardsCompanies = ({ arrayCompanies }) => {
    //const companies = useSelector((state) => state.companies);
    
    return (
        <>
            <div className='container'>
                {arrayCompanies.map((p) => (
                    
                     <Link to={`/CompanyDetail/${p._id}`} key={p.name}>
                    <img src={p.photograph} alt="" />
                    <p>{p.name}</p>
                    <p>Empresa Premium: {p.premium}</p>
                    </Link>
                ))}
            </div>
        </>
    );
};
