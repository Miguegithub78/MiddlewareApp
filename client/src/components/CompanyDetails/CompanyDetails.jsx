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
          <img src={companies.photograph} alt='Imagen no encontrada' width='200px' heigth='200px'></img>
          <h6 className="mb-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="feather feather-globe me-2 icon-inline"
            >
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="2" y1="12" x2="22" y2="12"></line>
            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
          </svg>
          Website: {companies.webpage}
        </h6>
        <h6 className="mb-0">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            stroke-width="2" 
            stroke-linecap="round" 
            stroke-linejoin="round" 
            class="feather feather-mail">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
              <polyline points="22,6 12,13 2,6"></polyline>
          </svg>
            Email: {companies.gmail}
        </h6>
        <h6 className="mb-0">País: {companies.country}</h6>
        <h6 className="mb-0">Provincia: {companies.state}</h6>
        <h6 className="mb-0">Ciudad: {companies.city}</h6>
        <h6 className="mb-0">Acerca de: {companies.description}</h6>
        </div>
      </div>
    </div>
  );
}