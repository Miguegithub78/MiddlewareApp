import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './components/Login';
import Home from './components/Home/Home';
import LandingPage from './components/LandingPage/LandingPage';
import tokenAuth from './components/config/token';
import CompanyDetail from './components/CompanyDetails/CompanyDetails';
import ProfileUser from './components/ProfileUser/ProfileUser';
import JobsDetails from './components/JobsDetails/JobsDetails';
//import Publications from './components/Publications/Publications';
import { useEffect } from 'react';
import JuniorsDetail from './components/JuniorsDetails/JuniorsDetails';
import CreatePublications from './components/CreatePublications/CreatePublications';
function App() {
	const token = localStorage.getItem('token');

	useEffect(() => {
		if (token) {
			tokenAuth(token);
		}
	}, [token]);

	return (
		<Router>
			<Switch>
				<Route exact path='/login/:type' component={Login} />
				<Route path='/home/:tipo' component={Home} />
				<Route exact path='/' component={LandingPage} />
				<Route exact path='/profileuser/:id' component={ProfileUser} />
				<Route exact path='/jobs/:id' component={JobsDetails} />
				<Route path='/companies/:id' component={CompanyDetail} />
				<Route path='/empleos/:id' component={JobsDetails} />
				<Route
					exact
					path='/createpublications'
					component={CreatePublications}
				/>

				<Route path='/juniors/:id' component={JuniorsDetail} />
				{/* <RutaPrivada exact path="/proyectos" component={Proyectos} /> */}
			</Switch>
		</Router>
	);
}

export default App;
