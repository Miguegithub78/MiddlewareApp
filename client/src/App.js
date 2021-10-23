import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from './components/login';
function App() {
	return (
		<Router>
		<Switch>
		  <Route exact path="/login" component={Login} />
		  {/* <Route exact path="/nueva-cuenta" component={NuevaCuenta} /> */}
		  {/* <RutaPrivada exact path="/proyectos" component={Proyectos} /> */}

		</Switch>
	 </Router>
	);
}

export default App;
