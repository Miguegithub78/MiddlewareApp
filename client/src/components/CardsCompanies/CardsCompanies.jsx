import React from "react";
import { Link } from "react-router-dom";
//import { useSelector } from 'react-redux';


export const CardsCompanies = ({ arrayCompanies }) => {
    //const companies = useSelector((state) => state.companies);
    
    
    return (
        <>
            <div className='container'>
            {arrayCompanies.length ? (
                arrayCompanies.map((p) => (
                    
                    <Link to={`/companies/${p._id}`} key={p.name}>
                        <div>
                            <img src={p.photograph} alt="" />
                        </div>
                        <div>
                            <p>{p.name}</p>
                            
                        </div>
                    </Link>
                ))
            ) : (    <p>Loading...</p>
            )}
            </div>
        </>
    );
};
