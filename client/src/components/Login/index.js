import { useState, useEffect } from "react";

import { useHistory, useParams, useQuery } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  loginUserAction,
  loginUserEmailPassAction,
  emailVerificationAction,
  errorLoginAction,
} from "../../redux/actions";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebaseConfig";

import "./Login.css";

import Error from "./Error";
import SingIn from "./SingIn";
import CreateAccount from "./CreateAccount";

import ModalLogin from "./ModalLogin";
import ModalCreateAccount from "./ModalCreateAccount";

const Login = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { type } = useParams();
  if (type === "null") history.push("/");
  if (type) {
    localStorage.setItem("userType", type);
  }
  const { emailVerification, errorLogin } = useSelector((state) => state);
  const [singOrCreate, setSingOrCreate] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("guilletempo1@gmail.com");
  const [password, setPassword] = useState("123456");

  onAuthStateChanged(auth, (userFirebase) => {
    if (!userFirebase) return;
    if (userFirebase.emailVerified) {
      history.push("/home/companies");
      if (!emailVerification) dispatch(emailVerificationAction(true));
    } else {
      // if (emailVerification) {
      //   dispatch(emailVerificationAction(false));
      //   dispatch(errorLoginAction("Cuenta NO Verificada"));
      // }
    }
  });
  //resetear errores automatico
  useEffect(() => {
    if (errorLogin) {
      setTimeout(() => {
        dispatch(errorLoginAction(null));
      }, 2000);
    }
  }, [errorLogin]);

  const handleClickSingin = () => {
    if (email !== "" && password !== "" && emailVerification) {
      dispatch(loginUserEmailPassAction(email, password, name));
      setPassword("");
      setEmail("");
    } else {
      if (!emailVerification)
        dispatch(errorLoginAction("Cuenta NO Verificada"));
      else dispatch(errorLoginAction("Todos los campos son obligatorios"));
    }
  };
  const handleClickCreate = () => {
    if (email !== "" && password !== "" && name) {
      dispatch(loginUserEmailPassAction(email, password, name));
      setPassword("");
      setEmail("");
    } else {
      dispatch(errorLoginAction("Todos los campos son obligatorios"));
    }
  };
  return (
    <div className="container ">
      <div className="row g-0 mt-5 mb-5 height-100">
        <div className="col-md-6">
          {/* <div className="bg-dark p-4 h-100 sidebar"> */}
          <div className="form-img"></div>
          {/* </div> */}
        </div>
        <div className="col-md-6 text-white">
          <div className="bg-dark  p-4 h-100">
            <div className="p-3 d-flex justify-content-center flex-column align-items-center">
              {" "}
              <span className=" main-heading">Ingresa a Middleware</span>
              <hr />
              <ul className="social-list ">
                <li>
                  <button
                    onClick={() => dispatch(loginUserAction("google", type))}
                    className="btn btn-block btn-outline-light  bi bi-google"
                  ></button>
                </li>
                <li>
                  <button
                    onClick={() => dispatch(loginUserAction("github", type))}
                    className="btn btn-block btn-outline-light  bi bi-github"
                  ></button>
                </li>
              </ul>
              <hr />
              {singOrCreate ? (
                <SingIn
                  errorLogin={errorLogin}
                  setEmail={setEmail}
                  setPassword={setPassword}
                  email={email}
                  password={password}
                  handleClickSingin={handleClickSingin}
                />
              ) : (
                <CreateAccount
                  errorLogin={errorLogin}
                  setEmail={setEmail}
                  setName={setName}
                  setPassword={setPassword}
                  name={name}
                  email={email}
                  password={password}
                  handleClickCreate={handleClickCreate}
                />
              )}
              <div className="d-flex mt-2 justify-content-between w-100 align-items-center">
                <span
                  onClick={() => setSingOrCreate((e) => !e)}
                  className="crea-cuenta"
                >
                  {!singOrCreate ? "Inicia Sesión" : "Crea una Cuenta"}
                </span>
                {singOrCreate && (
                  <ModalLogin email={email} setEmail={setEmail} />
                )}
              </div>
              <hr />
              <div className="signin-btn w-100 mt-2">
                {errorLogin && <Error msg={errorLogin} />}
                {singOrCreate ? (
                  <button
                    onClick={handleClickSingin}
                    className="btn btn-block btn-outline-light"
                  >
                    Inicia sesión
                  </button>
                ) : (
                  <ModalCreateAccount
                    name={name}
                    email={email}
                    password={password}
                    handleClickCreate={handleClickCreate}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
