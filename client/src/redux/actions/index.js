import { LOGIN_OKEY, LOGOUT_OKEY, LOGIN_GOOGLE, LOGIN_GUITHUB, GET_JUNIORS, GET_COMPANIES } from "../types";
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
          const { uid, email, displayName, photoURL } = userProvider.user;
          const user = {
            name: displayName,
            idUser: uid,
            gmail: email,
            photograph: photoURL,
            userType,
          };
          try {
            console.log(user, 'ser');
            clienteAxios.post('/login', user).then((rta) => {
              console.log('rta', rta);
              dispatch(loginOkey(rta.data.user));
              localStorage.setItem('token', rta.data.token)
            });
          } catch (error) {
            console.log(error,'error');
          }
           
        });
      } else if (provider === "guithub") {
        await signInWithPopup(auth, guithubProvider).then((userProvider) => {
          const { uuid, email, displayName, photoURL } = userProvider.user;
          const user = {
            name: displayName,
            idUser: uuid,
            gmail: email,
            photo: photoURL,
            userType,
          };
          // clienteAxios.post("/login", user).then((rta) => {
          dispatch(loginOkey(user));
          // })
        });
      }
    } catch (e) {
      console.log(e.message);
      if (
        e.message ===
        "Firebase: Error (auth/account-exists-with-different-credential)."
      ) {
        await signInWithPopup(auth, googleProvider).then((userProvider) => {
          const { uuid, email, displayName, photoURL } = userProvider.user;
          const user = {
            name: displayName,
            idUser: uuid,
            gmail: email,
            photo: photoURL,
            userType,
          };
          // clienteAxios.post("/login", user).then((rta) => {
          dispatch(loginOkey(user));
          // });
        });
      }
    }
  };
};

export const getUserAction = (userProvider, type) => {
  return async (dispatch) => {
    try {
      // const { uid, email, displayName, photoURL } = userProvider;
      // const user = {
      //   name: displayName,
      //   idUser: uid,
      //   email,
      //   photo: photoURL,
      //   userType: type,
      // };
      //  obtengo token de local storage

      // clienteAxios.get("/getUser/" + id).then((rta) => {
      // dispatch(loginOkey(user));
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
      await signOut(auth);
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
    const response = await clienteAxios.post(
      "http://localhost:3001/juniors",
      payload
    );
    console.log(response);
    return response;
  };
}

export function getLanguages(payload){
  return async function(dispatch) {
    try {
      const json = await clienteAxios.get('/languages');
      return dispatch( {type: 'GET_LANGUAGES', payload: json.data})
    } catch (error) {
      
    }
  }
};

export function getTechnologies(payload){
  return async function(dispatch) {
    try {
      const json = await clienteAxios.get('/technologies');
      return dispatch( {type: 'GET_TECHNOLOGIES', payload: json.data})
    } catch (error) {
      
    }
  }
};

export const getCompanyDetails = (id) => {
  return async function (dispatch) {
    try {
      var json = await clienteAxios.get("/companies/" + id);
      return dispatch({
        type: "GET_COMPANY_DETAILS",
        payload: json.data,
      });
    } catch (e) {
      console.log(e);
    }
  }
};

export function getJuniors(payload){
  return async function(dispatch) {
    try {
      const json = await clienteAxios.get('/juniors');
      return dispatch( {type: 'GET_JUNIORS', payload: json.data})
    } catch (error) {
      
    }
  }
};

export function getCompanies(payload){
  return async function(dispatch) {
    try {
      const json = await clienteAxios.get('/companies');
      return dispatch( {type: 'GET_COMPANIES', payload: json.data})
    } catch (error) {
      
    }
  }
};