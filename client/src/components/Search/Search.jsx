import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	searchJobsByTitle,
	filterJobsByCities,
	filterJobsBySalaries,
	filterJobsByTechs,
	resetFilterJobs,
	sortJobsBy,
} from '../../redux/actions';
import './Search.css';

export const Search = () => {
	const button = 'button';
	const dispatch = useDispatch();
	const options = useSelector((store) => store.technologies);

	const handleInputChange = (e) => {
		dispatch(searchJobsByTitle(e.target.value));
	};

	const byTypeSalary = (e) => {
		dispatch(filterJobsBySalaries(e.target.value));
	};

	const byTecnology = (e) => {
		let tech = e.target.value.toLowerCase();
		dispatch(filterJobsByTechs(tech));
	};
	const byUbication = (e) => {
		dispatch(filterJobsByCities(e.target.value));
	};

	const handleReset = (e) => {
		dispatch(resetFilterJobs());
	};

	const sortBy = (e) => {
		dispatch(sortJobsBy(e.target.value));
	};

	return (
		<div className='cont'>
			<form>
				<div className='field'>
					<input
						type='text'
						id='searchterm'
						onChange={handleInputChange}
						placeholder='Realiza tu busqueda...'
					/>
				</div>
			</form>
			<div className='field2'>
				<select className={button} name='typePublic' onChange={byTypeSalary}>
					<option disabled selected>
						Rango Salarial:
					</option>
					<option value='0'>Menor a $50.000</option>
					<option value='1'>Entre $50.000 y $100.000</option>
					<option value='2'>Entre $101.000 y $150.000</option>
					<option value='3'>Entre $151.000 y $200.000</option>
					<option value='4'>Mayor de $200.000</option>
				</select>

				<select className={button} name='Technologies' onChange={byTecnology}>
					<option value=''>Tipo de Tecnología:</option>
					{options?.map((p) => (
						<option value={p.name} key={p.id}>
							{p.name}
						</option>
					))}
				</select>
				<select name='ubicacion' className={button} onChange={byUbication}>
					<option disabled selected>
						Ubicación:
					</option>
					<option value=''>Remoto</option>
					<option value='cordoba'>Cordoba</option>
					<option value='buenos aires'>Buenos Aires</option>
					<option value='mendoza'>Mendoza</option>
					<option value='junin'>Junin</option>
				</select>
				<select className={button} name='sort' onChange={sortBy}>
					<option disabled selected>
						Ordenar por:
					</option>
					<option value='premium'>Premium</option>
					<option value='date'>Fecha</option>
				</select>
			</div>
			<p className='clear' onClick={handleReset}>
				Limpiar Filtros
			</p>
		</div>
	);
};
