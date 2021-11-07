import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getJobDetails } from '../../redux/actions';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import s from './JobsDetails.module.css';

export default function JuniorsDetail() {
	const { id } = useParams();
	const dispatch = useDispatch();
	/* 	useEffect(() => {
		dispatch(getJobDetails(id));
	}, [dispatch]); */

	/* const jobDetails = useSelector((state) => state.jobDetails); */

	const jobsDetails = {
		id: 1,
		img: 'https://www.reportur.com/wp-content/uploads/2020/09/desp-e1599536919110.jpg',
		company: 'despegar',
		title: 'frontend',
		description:
			"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
		country: 'argentina',
		city: 'buenos aires',
		dollar: false,
		salary: 50000,
		tech: ['javascript', 'sql'],
		date: '10/31/2021',
		premium: 3,
	};

	return (
		<div className={s.container}>
			<div className={s.card}>
				<div className={s.cardHeader}>
					<div className={s.containerImg}>
						<img src={jobsDetails.img} alt={jobsDetails.title} />
					</div>

					<h1>{jobsDetails.title}</h1>
				</div>
				<div className={s.containerInfo}>
					<p className={s.description}>{jobsDetails.description}</p>
					<div className={s.info}>
						<div className={s.info_box}>
							<p className={s.info_title}>Pais:</p>
							<p>{jobsDetails.country}</p>
						</div>
						<div className={s.info_box}>
							<p className={s.info_title}>Ciudad:</p>
							<p>{jobsDetails.city}</p>
						</div>
					</div>
					<div className={s.containerTechs}>
						<h4>Tecnologias Requeridas:</h4>
						<div className={s.techs}>
							{jobsDetails.tech.map((t) => (
								<p className={s.tech}>{t}</p>
							))}
						</div>
					</div>
				</div>

				<button className={s.btnPostularse}>Postularse</button>
			</div>
		</div>
	);
}
