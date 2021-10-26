import { auth } from "../../firebaseConfig";
import { signInWithPopup, GoogleAuthProvider, GithubAuthProvider } from "firebase/auth";
import { onAuthStateChanged } from "firebase/auth";
import { useHistory } from "react-router-dom"; 
import { useDispatch } from "react-redux";
import { loginUserAction, logOutUserAction } from "../../redux/actions";

const googleProvider = new GoogleAuthProvider();
const guithubProvider = new GithubAuthProvider() 

const Login = () => {
const dispatch = useDispatch()
  const history = useHistory();
  onAuthStateChanged(auth, (userFirebase) => {
    if (userFirebase) {
      console.log(userFirebase);
      dispatch(loginUserAction(userFirebase))
      history.push("/");
    } else {
      dispatch(logOutUserAction())
      console.log('chau');
    }
  });

  return (
    <div>
      Logueate con google
      <button onClick={() => signInWithPopup(auth, googleProvider)}>
        Google
      </button>
      o
      <button onClick={() => signInWithPopup(auth, guithubProvider)}>
        Guithub
      </button>
    </div>
  );
};

export default Login;
