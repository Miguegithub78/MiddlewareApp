import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./components/login";
import Home from "./components/Home";
import LandingPage from './components/LandingPage';
import NavBar from "./components/NavBar/NavBar"
function App() {
  return (
    <Router>
      <NavBar />
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route exact path="/home" component={Home} />
        <Route exact path="/" component={LandingPage} />
        {/* <RutaPrivada exact path="/proyectos" component={Proyectos} /> */}
      </Switch>
    </Router>
  );
}

export default App;
