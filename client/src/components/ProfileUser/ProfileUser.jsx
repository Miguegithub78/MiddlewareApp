import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import './helper.css';
import {
	getLanguages,
	getTechnologies,
	getUserAction,
	putJuniors,
} from '../../redux/actions';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../firebaseConfig';
import { useHistory } from 'react-router-dom';
import LeftData from './LeftData';
import PersonalData from './PersonalData';
import Prueba2Skill from './Prueba2Skill';
import CareerData from './CareerData';

const ProfileUser = () => {
	const { user } = useSelector((state) => state);
	const history = useHistory();
	const dispatch = useDispatch();
	const [infoUser, setInfoUser] = useState({
		name: '',
		gmail: '',
		description: '',
		github: 'https://github.com/',
		website: '',
		facebook: 'https://facebook.com/',
		phone: '',
		city: '',
		languages: [],
		technologies: [],
		title: '',
	});

	useEffect(() => {
		dispatch(getLanguages());
		dispatch(getTechnologies());
		setInfoUser({
			name: user && user.name,
			gmail: user && user.gmail,
			description: user && user.description,
			city: user && user.city,
			github: user && user.github,
			phone: '',
			website: '',
			// facebook: user && user.github?"https://facebook.com/":user.github,
			languages: [],
			technologies: [],
			title: user && user.title,
		});
	}, [user]);

	onAuthStateChanged(auth, (userFirebase) => {
		if (userFirebase) {
			if (user) return;
			dispatch(getUserAction(userFirebase));
		} else {
			history.push('/');
		}
	});

	return user ? (
		<div>
			<Link
				className='btn btn-block btn-dark btn-outline-light'
				to='/home/companies'
			>
				Volver al inicio
			</Link>
			<div className='container mt-3'>
				<div className='main-body'>
					<div className='row'>
						<LeftData
							setInfoUser={setInfoUser}
							infoUser={infoUser}
							user={user}
						/>
						<div className='col-lg-8'>
							<PersonalData setInfoUser={setInfoUser} infoUser={infoUser} />
							<CareerData setInfoUser={setInfoUser} infoUser={infoUser} />
							<Prueba2Skill />
						</div>
					</div>
				</div>
			</div>
			<br />
		</div>
	) : (
		'cargando....'
	);
};

export default ProfileUser;
