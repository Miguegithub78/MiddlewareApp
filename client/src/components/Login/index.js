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
    <div class="form-bg">
      <div class="container">
        <div class="row">
          <div class="col-lg-10 col-lg-offset-2 col-md-10 col-md-offset-2 col-sm-10 col-sm-offset-1 ">
            <div class="form-container ">
              <div class="form-img"></div>
              <div class="form-horizontal">
                <h2 class="title">Para Ingresar por favor Inicia Sesión</h2>
                <div class="form-group">
                  <button className="btn btn-block btn-dark btn-outline-light me-2" onClick={() => dispatch(loginUserAction("google", type))}>
                    Google
                  </button>
                  <button className="btn btn-block btn-dark btn-outline-light " onClick={() => dispatch(loginUserAction("github", type))}>
                    Github
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
