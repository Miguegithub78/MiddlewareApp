import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { getJuniorsDetails } from "../../redux/actions";
import { useEffect } from "react";
import { useParams } from "react-router-dom";


export default function JuniorsDetail() {
  const { id } = useParams(); 
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getJuniorsDetails(id))
  }, [dispatch]);
  
  const juniors = useSelector(state => state.juniorsdetails)
	return (
		<div className='container-fluid '>
		<div>
		  <Link to='/home/juniors'>
			<button className='btn btn-block btn-dark btn-outline-light'>
			  Volver
			</button>
		  </Link>
		</div>
		<div className='row align-items-center justify-content-center'>
		  <div className='col-5 text-center'>
        <h1>{juniors.name}</h1>
        <img src={juniors.photograph} alt='Imagen no encontrada' width='200px' heigth='200px'></img>
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
          Website: {juniors.website}
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
            Email:{juniors.gmail}
        </h6>
			
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
            className="feather feather-github me-2 icon-inline"
            >
            <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
          </svg>
          Github: {juniors.github}
        </h6>
        
        <h6 className="mb-0">
        <svg xmlns="http://www.w3.org/2000/svg" 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            stroke-width="2" 
            stroke-linecap="round" 
            stroke-linejoin="round" 
            class="feather feather-phone">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
          </svg>  
          Teléfono:{juniors.phone}
        </h6>
        <h6 className="mb-0">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="24" height="24" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            stroke-width="2" 
            stroke-linecap="round" 
            stroke-linejoin="round" 
            class="feather feather-user">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
          </svg>
          Titular:{juniors.title}
        </h6>
        <h6 className="mb-0">Tecnologías</h6>
          {juniors.technologies?.map((tec) => (    
            <label
              className="btn btn-outline-dark m-1"
            >
              {tec.name}
            </label>
          ))}
        <h6 className="mb-0">Idiomas</h6>
          {juniors.languages?.map((lan) => (    
            <label
              className="btn btn-outline-dark m-1"
            >
              {lan.name}
            </label>
          ))}
         <h6 className="mb-0">Habilidades</h6>
          {juniors.softskills?.map((soft) => (    
            <label
              className="btn btn-outline-dark m-1"
            >
              {soft.name}
            </label>
          ))}
		  </div>
		</div>
	  </div>
	);
  }