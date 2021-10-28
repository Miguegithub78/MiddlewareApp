import { LOGIN_OKEY, LOGOUT_OKEY, LOGIN_GOOGLE, LOGIN_GUITHUB } from "../types";
import clienteAxios from "../../components/config/clienteAxios";
import { auth } from "../../firebaseConfig";
import {
  signInWithPopup,
  GoogleAuthProvider,
  GithubAuthProvider,
  signOut,
} from "firebase/auth";

const googleProvider = new GoogleAuthProvider();
const guithubProvider = new GithubAuthProvider();

export const loginUserAction = (provider, userType) => {
  return async (dispatch) => {
    try {
      if (provider === "google") {
        await signInWithPopup(auth, googleProvider).then((userProvider) => {
          const { uuid, email, displayName, photoURL } = userProvider.user;
          const user = {
            name: displayName,
            idUser: uuid,
            email,
            photo: photoURL,
            userType,
          };
          // clienteAxios.post("/login", user).then((rta) => {
          dispatch(loginOkey(user));
          // });
        });
      } else if (provider === "guithub") {
        await signInWithPopup(auth, guithubProvider).then((user) =>
          dispatch(loginOkey(user))
        );
      }
    } catch (e) {
      console.log(e);
    }
  };
};

export const getUserAction = (userProvider, type) => {
  return async (dispatch) => {
    try {
      const { uid, email, displayName, photoURL } = userProvider;
      const user = {
        name: displayName,
        idUser: uid,
        email,
        photo: photoURL,
        userType: type,
      };
      // clienteAxios.get("/user" + id).then((rta) => {
      dispatch(loginOkey(user));
      // });
    } catch (e) {
      console.log(e);
    }
  };
};

const loginOkey = (user) => ({
  type: LOGIN_OKEY,
  payload: user,
});
export const logOutUserAction = () => {
  return async (dispatch) => {
    try {
      await signOut().then(() => dispatch(logOutOkey()));
      dispatch(logOutOkey());
    } catch (e) {
      console.log(e);
    }
  };
};
export const logOutOkey = () => ({
  type: LOGOUT_OKEY,
});


export function postUser(payload) {
  return async function (dispatch) {
    const response = await clienteAxios.post("/juniors", payload);
    console.log(response);
    return response;
  };
}
