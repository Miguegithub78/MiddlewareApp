import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getJobDetails, getUserAction } from '../../redux/actions';
import { useEffect, useState, useRef } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import s from './JobsDetails.module.css';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../firebaseConfig';
import { postulation } from '../../redux/actions';
import NavBar from '../NavBar/NavBar';

export default function JobsDetails() {
	const { id } = useParams();
	const user = useSelector((state) => state.user);
	const jobsDetails = useSelector((state) => state.jobsDetails);
	const dispatch = useDispatch();
	const [post, setPost] = useState(false);

	useEffect(() => {
		dispatch(getJobDetails(id));
	}, [post]);
	const history = useHistory();

	onAuthStateChanged(auth, (userFirebase) => {
		if (userFirebase) {
			if (user) return;
			dispatch(getUserAction(userFirebase));
		} else {
			history.push('/');
		}
	});

	const [coverLetter, setCoverLetter] = useState('');

	function handlePostulation() {
		dispatch(postulation(id, user._id, coverLetter, user.idFireBase));
		setPost(true);
	}

	var modalWin = useRef(null);

	function handleArea() {
		console.log(modalWin.current.value);
		setCoverLetter(modalWin.current.value);
	}

	return user && jobsDetails ? (
		<div className={s.container}>
			<div
				className='modal fade'
				id='exampleModalCenter'
				aria-labelledby='exampleModalCenterTitle'
				aria-hidden='true'
			>
				<div className='modal-dialog modal-dialog-centered'>
					<div className='modal-content'>
						<div className='modal-header'>
							<h5 className='modal-title' id='exampleModalLongTitle'>
								Escribe una breve presentacion:
							</h5>
							<button
								type='button'
								className='btn-close'
								data-bs-dismiss='modal'
								aria-label='Close'
							></button>
						</div>
						<div className='modal-body'>
							<div>
								<textarea
									className='form-control'
									id='exampleFormControlTextarea1'
									rows='3'
									ref={modalWin}
									onChange={handleArea}
								></textarea>
							</div>
						</div>
						<div className='modal-footer'>
							<button
								type='button'
								className='btn btn-primary'
								data-bs-dismiss='modal'
								onClick={handlePostulation}
							>
								Agregar
							</button>
						</div>
					</div>
				</div>
			</div>
			<NavBar />
			<div className={s.card}>
				<div className={s.cardHeader}>
					{user.postulationsJobs.includes(id) || post ? (
						<p className={s.cartelito}>Ya estas postulado para este empleo</p>
					) : (
						''
					)}
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
						type='button'
						className={'btn btn-block btn-dark btn-outline-light'}
						data-bs-toggle='modal'
						data-bs-target='#exampleModalCenter'
						disabled
					>
						Postulate
					</button>
				) : (
					<button
						type='button'
						className={'btn btn-block btn-dark btn-outline-light'}
						data-bs-toggle='modal'
						data-bs-target='#exampleModalCenter'
					>
						Postulate
					</button>
				)}
			</div>
		</div>
	) : (
		<div>Cargando...</div>
	);
}
