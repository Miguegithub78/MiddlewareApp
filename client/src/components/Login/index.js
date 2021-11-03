import { useEffect } from 'react';

import { useHistory, useParams, useQuery } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginUserAction } from '../../redux/actions';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../firebaseConfig';

import './Login.css';

const Login = () => {
	const dispatch = useDispatch();
	const history = useHistory();
	const { type } = useParams();

	onAuthStateChanged(auth, (userFirebase) => {
		if (userFirebase) history.push('/home/companies');
	});

	return (
		<div className='form-bg'>
			<div className='container'>
				<div className='row'>
					<div className='col-lg-10 col-lg-offset-2 col-md-10 col-md-offset-2 col-sm-10 col-sm-offset-1 '>
						<div className='form-container '>
							<div className='form-img'></div>
							<div className='form-horizontal'>
								<h2 className='title'>Para Ingresar por favor Inicia Sesión</h2>
								<div className='form-group'>
									<button
										className='btn btn-block btn-dark btn-outline-light me-2'
										onClick={() => dispatch(loginUserAction('google', type))}
									>
										Google
									</button>
									<button
										className='btn btn-block btn-dark btn-outline-light '
										onClick={() => dispatch(loginUserAction('github', type))}
									>
										Github
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Login;