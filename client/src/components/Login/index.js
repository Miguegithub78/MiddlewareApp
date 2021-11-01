import { useEffect } from "react";

import { useHistory, useParams, useQuery } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  loginUserAction,
} from "../../redux/actions";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebaseConfig";

import "./Login.css";

const Login = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { type } = useParams();

  onAuthStateChanged(auth, (userFirebase) => {
    if (userFirebase) history.push("/home");
  });

  return (
    <div className="container-login">
      <div className="content">
        <h2>Para Ingresar por favor Inicia Sesión</h2>
        <button onClick={() => dispatch(loginUserAction("google", type))}>
          Google
        </button>

        <button onClick={() => dispatch(loginUserAction("guithub", type))}>
          Guithub
        </button>
      </div>
    </div>
  );
};

export default Login;
