import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Login from "./components/login";
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
