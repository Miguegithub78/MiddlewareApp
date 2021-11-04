import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { getCompanyDetails } from "../../redux/actions";
import { useEffect } from "react";
import { useParams } from "react-router-dom";


export default function CompanyDetail() {
  const { id } = useParams(); 
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCompanyDetails(id))
  }, [dispatch]);
  
  const companies = useSelector(state => state.details)

  return (
    <div className='container-fluid '>
      <div>
        <Link to='/home/companies'>
          <button className='btn btn-block btn-dark btn-outline-light'>
            Volver
          </button>
        </Link>
      </div>
      <div className='row align-items-center justify-content-center'>
        <div className='col-5 text-center'>
          <h1>{companies.name}</h1>
          <img
            src={companies.photograph}
            alt='Imagen no encontrada'
            width='200px'
            heigth='200px'
          ></img>
          <h3>{companies.webpage}</h3>
          <h3>{companies.gmail}</h3>
          <h3>{companies.country}</h3>
          <h3>{companies.state}</h3>
          <h3>{companies.city}</h3>
          <h3>{companies.description}</h3>
        </div>
      </div>
    </div>
  );
}