import React, { useEffect } from 'react';
import s from './CardsJobs.module.css';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getJobs } from '../../redux/actions';
function CardsJobs() {
	function calculateDate(date) {
		const date1 = new Date().getTime();
		const date2 = new Date(date).getTime();
		const mili = 24 * 60 * 60 * 1000;
		const days = Math.floor(Math.abs(date2 - date1) / mili);
		if (days === 0) {
			return 'Publicado Hoy';
		} else if (days === 1) {
			return 'Publicado hace un día';
		} else if (days > 1 && days < 7) {
			return `Publicado hace ${days} días`;
		} else if (days === 7) {
			return `Publicado hace una semana`;
		} else if (days > 7 && days <= 14) {
			return `Publicado hace más de una semana`;
		} else if (days === 15) {
			return `Publicado hace 2 semanas`;
		} else if (days > 15 && days < 30) {
			return `Publicado hace más de 2 semanas`;
		} else {
			return 'Publicado hace más de un mes';
		}
	}
	function money(dollar, salary) {
		if (!salary) {
			return 'Sin especificar';
		} else if (dollar) {
			return `U$s${salary}`;
		} else {
			return `$${salary}`;
		}
	}
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getJobs());
	}, [dispatch]);
	const jobs = useSelector((state) => state.jobs.filterData);

	return (
		<div className={s.cards}>
			{jobs.map((j) => (
				<NavLink key={j._id} className={s.link} to={`/empleos/${j._id}`}>
					<div className={s.card}>
						{j.country.toLowerCase() !== 'remote' ? (
							<p className={s.country}>{j.country}</p>
						) : (
							<p className={s.country2}>{j.country}</p>
						)}
						<p className={s.date}>{calculateDate(j.date)}</p>
						<div className={s.card_container_logo}>
							<img className={s.card_logo} src={j.company.photograph} alt='' />
						</div>
						<div className={s.card_container_info}>
							<h3>{j.title}</h3>
							<p className={s.card_container_info_extra_company}>
								{j.company.name}
							</p>
							<div className={s.card_container_info_extra}>
								<div className={s.card_container_info_extra_general}>
									<div className={s.card_container_info_extra_city}>
										<svg
											xmlns='http://www.w3.org/2000/svg'
											class='h-5 w-5'
											viewBox='0 0 20 20'
											fill='currentColor'
										>
											<path
												fill-rule='evenodd'
												d='M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z'
												clip-rule='evenodd'
											/>
										</svg>
										<p>{j.city !== '' ? j.city : 'all world'}</p>
									</div>
									<div className={s.card_container_info_extra_salary}>
										<p className={s.salary}>salario:</p>
										<p className={s.textNone}>{money(j.dollar, j.salary)}</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</NavLink>
			))}
		</div>
	);
}

export default CardsJobs;
