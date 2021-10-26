import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './components/login';
import Home from './components/Home';
import NavBar from './components/NavBar/NavBar';
function App() {
	return (
		<Router>
			<Switch>
				<Route exact path='/login' component={Login} />
				<Route exact path='/home' component={Home} />
				{/* <RutaPrivada exact path="/proyectos" component={Proyectos} /> */}
			</Switch>
		</Router>
	);
}

export default App;
