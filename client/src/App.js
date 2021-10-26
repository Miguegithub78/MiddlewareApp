import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./components/login";
import Home from "./components/Home";
import LandingPage from './components/LandingPage';
import NavBar from "./components/NavBar/NavBar"
import CreateUsers from "./components/CreateUsers/CreateUsers";
function App() {
  return (
    <Router>
      <NavBar />
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route exact path="/home" component={Home} />
        <Route exact path="/" component={LandingPage} />
        <Route exact path="/createuser" component={CreateUsers} />
        {/* <RutaPrivada exact path="/proyectos" component={Proyectos} /> */}
      </Switch>
    </Router>
  );
}

export default App;
