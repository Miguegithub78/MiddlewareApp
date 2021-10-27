import { useEffect } from "react";

import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  loginUserAction,
  loginOkey,
  logOutUserAction,
} from "../../redux/actions";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebaseConfig";

import "./Login.css";

const Login = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  //   const { user } = useSelector((state) => state);

  onAuthStateChanged(auth, (userFirebase) => {
    if (userFirebase) {
      dispatch(loginOkey(userFirebase));
      history.push("/home");
    } else {
      console.log("chau");
    }
  });
  return (
    <div className="container-login">
      <h2>Para Ingresar por favor Inicia Sesión</h2>
      <button onClick={() => dispatch(loginUserAction("google"))}>
        Google
      </button>
      <br />
      <button onClick={() => dispatch(loginUserAction("guithub"))}>
        Guithub
      </button>
    </div>
  );
};

export default Login;
