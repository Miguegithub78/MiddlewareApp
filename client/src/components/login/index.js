// import * as firebaseui from 'firebaseui'
// import 'firebaseui/dist/firebaseui.css'
import { auth } from "../../firebaseConfig";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";

const googleProvider = new GoogleAuthProvider();

const Login = () => {
  return (
    <div>
      Logueate con google
      <button onClick={() => signInWithPopup(auth, googleProvider)}>
        login
      </button>
    </div>
  );
};

export default Login;
