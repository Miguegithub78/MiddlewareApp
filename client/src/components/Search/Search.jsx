import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	searchJobsByTitle,
	filterJobsByCountries,
	filterJobsByCities,
	filterJobsBySalaries,
	filterJobsByTechs,
	resetFilterJobs,
	filterJobsRemote,
	filterJobsFullTime,
	filterJobsRelocate,
	sortJobsBy,
} from '../../redux/actions';
import './Search.css';
import CountryState from './CountryState';
import State from './State';

export const Search = () => {
	const button = 'button';
	const dispatch = useDispatch();
	const options = useSelector((store) => store.technologies);

	const handleInputChange = (e) => {
		dispatch(searchJobsByTitle(e.target.value.toLowerCase().trim()));
	};

	const byTypeSalary = (e) => {
		dispatch(filterJobsBySalaries(e.target.value));
	};

	const byTecnology = (e) => {
		let tech = e.target.value.toLowerCase();
		dispatch(filterJobsByTechs(tech));
	};
	const byCity = (e) => {
		dispatch(filterJobsByCities(e.target.value));
	};
	const byCountry = (e) => {
		dispatch(filterJobsByCountries(e.target.value));
	};

	const handleReset = (e) => {
		dispatch(resetFilterJobs());
	};

	const sortBy = (e) => {
		dispatch(sortJobsBy(e.target.value));
	};

	const [relocate, setRelocate] = useState(false);
	const [remote, setRemote] = useState(false);
	const [fullTime, setFullTime] = useState(false);

	const handleRelocate = () => {
		setRelocate((relocate) => {
			dispatch(filterJobsRelocate(!relocate));
			return !relocate;
		});
	};

	const handleFullTime = () => {
		setFullTime((fullTime) => {
			dispatch(filterJobsFullTime(!fullTime));
			return !fullTime;
		});
	};

	const handleRemote = () => {
		setRemote((remote) => {
			dispatch(filterJobsRemote(!remote));
			return !remote;
		});
	};

	const [state, setState] = useState(null);

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
					<option value='' disabled selected>
						Tipo de Tecnología:
					</option>
					{options?.map((p) => (
						<option value={p.name} key={p._id}>
							{p.name}
						</option>
					))}
				</select>
				<CountryState setState={setState} handleChange={byCountry} />
				<State state={state} handleChange={byCity} />
				<select className={button} name='sort' onChange={sortBy}>
					<option value='premium' selected>
						Más Relevantes
					</option>
					<option value='date'>Más Reciente</option>
				</select>
			</div>
			<div>
				<div>
					<input
						className='form-check-input'
						type='checkbox'
						id='Relocate'
						value={relocate}
						onChange={handleRelocate}
					/>
					<label className='form-check-label' htmlFor='Relocate'>
						Relocación
					</label>
				</div>
				<div>
					<input
						className='form-check-input'
						type='checkbox'
						id='Remote'
						value={remote}
						onChange={handleRemote}
					/>
					<label className='form-check-label' htmlFor='Remote'>
						Remoto
					</label>
				</div>
				<div>
					<input
						className='form-check-input'
						type='checkbox'
						id='FullTime'
						value={fullTime}
						onChange={handleFullTime}
					/>
					<label className='form-check-label' htmlFor='FullTime'>
						Tiempo Completo
					</label>
				</div>
			</div>
			<p className='clear' onClick={handleReset}>
				Limpiar Filtros
			</p>
		</div>
	);
};
