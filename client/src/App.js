import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
<<<<<<< HEAD
import Login from "./components/Login";
=======

import Login from "./components/login";
>>>>>>> 3452f200faa89d4899f089cc9353b57df47c0e5d
import Home from "./components/Home/Home";
import LandingPage from './components/LandingPage/LandingPage';
import CreateUsers from "./components/CreateUsers/CreateUsers";
import CompanyDetail from "./components/CompanyDetails/CompanyDetails";
function App() {
  return (
    <Router>

      <Switch>
        <Route exact path="/login/:type" component={Login} />
        <Route exact path="/home" component={Home} />
        <Route exact path="/" component={LandingPage} />
        <Route exact path="/createuser" component={CreateUsers} />
        <Route path="/companies/:id" component={CompanyDetail} />

        {/* <RutaPrivada exact path="/proyectos" component={Proyectos} /> */}
      </Switch>
    </Router>
  );
}

export default App;
