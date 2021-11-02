import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { getCompanyDetails } from "../../redux/actions";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import clienteAxios from "../../components/config/clienteAxios";

export default function CompanyDetail() {
  const { id } = useParams();

  const [companies, setCompanies] = useState({});
  const dispatch = useDispatch();

  useEffect(() => {
    detalles();
  }, []);

  const detalles = async () => {

    const data = await fetch(`http://localhost:3001/companies/${id}`);

    const companies = await data.json();

    setCompanies(companies);
    console.log('Details companies' + companies.name)
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
          <h1>{companies.name}</h1>
          <img src={companies.photograph} alt="Imagen no encontrada" width="100px" heigth="80px" ></img>
          <h3>{companies.webpage}</h3>
          <h3>{companies.gmail}</h3>
          <h3>{companies.country}</h3>
          <h3>{companies.state}</h3>
          <h3>{companies.city}</h3>
          <h3>{companies.description}</h3>
        </div>
      </div>

      <div>
        <Link to='/home'>
          <button className="btn btn-block btn-dark btn-outline-light">Volver</button>
        </Link>

      </div>
    </div>
  )
}