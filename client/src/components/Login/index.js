import { useState } from "react";

import { useHistory, useParams, useQuery } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  loginUserAction,
  /*loginUserEmailPassAction,
  emailVerificationAction,*/
} from "../../redux/actions";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebaseConfig";

import "./Login.css";

const Login = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { type } = useParams();
  if (type) {
    localStorage.setItem("userType", type);
  }
  //const { emailVerification } = useSelector((state) => state);
  const [email, setEmail] = useState("guilletempo1@gmail.com");
  const [password, setPassword] = useState("123456");

  onAuthStateChanged(auth, (userFirebase) => {
    if (!userFirebase) return;
    console.log(userFirebase, "el user devulto por firebase");
    if (userFirebase.emailVerified) {
      //dispatch(emailVerificationAction(true));
      history.push("/home/companies");
    } else {
      // if (emailVerification) dispatch(emailVerificationAction(false));
    }
  });
  const handleClick = () => {
    if (email !== "" && password !== "") {
      //dispatch(loginUserEmailPassAction(email, password));
      setPassword("");
      setEmail("");
    }
  };

  return (
    <div className="form-bg ">
      <div className="container">
        <div className="row">
          <div className="col-lg-10 col-lg-offset-2 col-md-10 col-md-offset-2 col-sm-10 col-sm-offset-1 mx-auto ">
            <h2 className="danger">
              {/*!emailVerification && "verifica tu cuenta "*/}
            </h2>
            <div className="form-container">
              <div className="form-img"></div>
              <form className="form-horizontal">
                <h2 className="title">Te damos la bienvenida a Middleware</h2>
                <h3 className="title ">Inicia sesión </h3>

                <div className="form-group">
                  <div className="form-group">
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <button
                    type="button"
                    className="btn btn-dark w-100"
                    onClick={handleClick}
                  >
                    Iniciar sesión
                  </button>
                </div>
                <div className="mt-2">
                  <h3 className="title">o ingresa con:</h3>
                  <button

                    type="button"
                    className="btn btn-dark   me-4 bi bi-google w-3 "
                    onClick={() => dispatch(loginUserAction("google", type))}
                  >
                    Google
                  </button>
                  <button
                    type="button"
                    className="btn btn-dark   bi bi-github w-"
                    onClick={() => dispatch(loginUserAction("github", type))}
                  >
                    GitHub
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;