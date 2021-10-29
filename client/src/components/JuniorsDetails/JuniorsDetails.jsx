import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { getJuniorsDetails } from "../../redux/actions";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import clienteAxios from "../config/clienteAxios";

export default function JuniorsDetail() {
    const { id } = useParams();

  const [juniors, setCompanies] = useState({});
  const dispatch = useDispatch();
  
  useEffect(() => {
    detalles();
  },[]);

  const detalles = async () => {
    
    const data = await fetch(`http://localhost:3001/juniors/${id}`);
   
    const juniors = await data.json();
 
    setCompanies(juniors);
    
  };
  
  /*const detalles = async () => {
    
      try {
        const data = await clienteAxios.get(`/companies/${id}`);
        const companies = await data.json();
        console.log('companies' + companies.name)
        setCompanies(companies);
      } catch (error) {
        
      }
    
  };*/

    return (
        <div>
            <div>
                <div>
                    <h1>{juniors.name} {juniors.lastname}</h1>
                    <img src={juniors.photograph} alt="Imagen no encontrada" width="100px" heigth="80px" ></img>
                    <h3>{juniors.webpage}</h3>
                    <h3>{juniors.gmail}</h3>
                    <h3>{juniors.country}</h3>
                    <h3>{juniors.state}</h3>
                    <h3>{juniors.city}</h3>
                    <h3>{juniors.description}</h3>
                </div>
            </div>
            
            <div>
                <Link to='/home'>
                    <button>Volver</button>
                </Link>

            </div>
        </div>
    )
}
