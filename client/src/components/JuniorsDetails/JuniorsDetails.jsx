import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getJuniorsDetails } from '../../redux/actions';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import clienteAxios from '../config/clienteAxios';

export default function JuniorsDetail() {
	const { id } = useParams();

	const [juniors, setCompanies] = useState({});
	const dispatch = useDispatch();

	useEffect(() => {
		detalles();
	}, []);

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
					<h1>
						{juniors.name || ''} {juniors.lastname || ''}{' '}
					</h1>
					<img
						src={juniors.photograph || ''}
						alt='Imagen no encontrada'
						width='100px'
						heigth='80px'
					></img>
					
				</div>
			</div>

			<div>
				<Link to='/home/juniors'>
					<button>Volver</button>
				</Link>
			</div>
		</div>
	);
}
