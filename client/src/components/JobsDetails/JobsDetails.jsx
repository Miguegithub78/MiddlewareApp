import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getJobDetails } from '../../redux/actions';
import { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import s from './JobsDetails.module.css';
import { postulation } from '../../redux/actions';

export default function JuniorsDetail() {
	const { id } = useParams();
	const user = useSelector((state) => state.user);
	const jobsDetails = useSelector((state) => state.jobsDetails);
	const dispatch = useDispatch();
	const [post, setPost] = useState(false);
	useEffect(() => {
		dispatch(getJobDetails(id));
	}, [post]);
	const history = useHistory();

	function handlePostulation() {
		dispatch(postulation(id, user._id));
		setPost(true);
	}

	return jobsDetails ? (
		<div className={s.container}>
			<Link to='/home/empleos'>
				<button
					className={`btn btn-block btn-dark btn-outline-light ${s.btnVolver}`}
				>
					Volver
				</button>
			</Link>
			<div className={s.card}>
				<div className={s.cardHeader}>
					{user.postulationsJobs.includes(id) || post ? (
						<p className={s.cartelito}>Ya estas postulado para este empleo</p>
					) : (
						''
					)}

					<div className={s.containerImg}>
						<img src={jobsDetails.company.photograph} alt={jobsDetails.title} />
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
							<p>{jobsDetails.city !== '' ? jobsDetails.city : 'all world'}</p>
						</div>
					</div>
					<div className={s.containerTechs}>
						<h4>Tecnologias Requeridas:</h4>
						<div className={s.techs}>
							{jobsDetails.technologies?.map((t) => (
								<p key={t.id} className={s.tech}>
									{t.name}
								</p>
							))}
						</div>
					</div>
				</div>
				{user.postulationsJobs.includes(id) || post ? (
					<button
						disabled
						onClick={handlePostulation}
						className={` ${s.btnDisabled}`}
					>
						Postularse
					</button>
				) : (
					<button onClick={handlePostulation} className={`${s.btnPostularse} `}>
						Postularse
					</button>
				)}
			</div>
		</div>
	) : (
		<div>Cargando...</div>
	);
}
