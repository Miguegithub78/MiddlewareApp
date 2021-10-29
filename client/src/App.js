import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './components/Login/index';
import Home from './components/Home/Home';
import LandingPage from './components/LandingPage/LandingPage';
import tokenAuth from './components/config/token';
import CompanyDetail from './components/CompanyDetails/CompanyDetails';
import ProfileUser from './components/ProfileUser/ProfileUser';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getJuniors, getCompanies } from './redux/actions/index.js';

function App() {
	const token = localStorage.getItem('token');

	useEffect(() => {
		if (token) {
			tokenAuth(token);
		}
	}, [token]);

	// const dispatch = useDispatch();
	//   useEffect(() => {
	//     dispatch(getJuniors());
	//     dispatch(getCompanies());
	//   });

	return (
		<Router>
			<Switch>
				<Route exact path='/login/:type' component={Login} />
				<Route exact path='/home' component={Home} />
				<Route exact path='/' component={LandingPage} />
				<Route exact path='/profileuser/:id' component={ProfileUser} />
				<Route path='/companies/:id' component={CompanyDetail} />

				{/* <RutaPrivada exact path="/proyectos" component={Proyectos} /> */}
			</Switch>
		</Router>
	);
}

export default App;
