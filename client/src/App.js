import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
<<<<<<< HEAD
import Login from "./components/Login";
=======

import Login from "./components/Login/index";
>>>>>>> c72cd485376848b2e649e1a6685d97220114e22c
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
<<<<<<< HEAD
=======
        <Route path="/companies/:id" component={CompanyDetail} />
>>>>>>> c72cd485376848b2e649e1a6685d97220114e22c

        {/* <RutaPrivada exact path="/proyectos" component={Proyectos} /> */}
      </Switch>
    </Router>
  );
}

export default App;
