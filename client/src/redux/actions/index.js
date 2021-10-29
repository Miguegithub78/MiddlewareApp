import {
  LOGIN_OKEY,
  LOGOUT_OKEY,
  LOGIN_GUITHUB,
  LOGIN_GOOGLE,
  GET_JUNIORS,
  GET_JUNIORS_DETAILS,
  GET_COMPANIES,
  GET_LANGUAGES,
  GET_TECHNOLOGIES,
  GET_COMPANY_DETAILS,
  GET_PUBLICATIONS,
  GET_PUBLICATIONS_BY_ID,
} from "../types";
import clienteAxios from "../../components/config/clienteAxios";
import { auth } from "../../firebaseConfig";
import {
  signInWithPopup,
  GoogleAuthProvider,
  GithubAuthProvider,
  signOut,
} from "firebase/auth";
import tokenAuth from "../../components/config/token";
/*LOGIN*/
const googleProvider = new GoogleAuthProvider();
const guithubProvider = new GithubAuthProvider();
export const loginUserAction = (provider, userType) => {
  return async (dispatch) => {
    try {
      if (provider === "google")
        var userFirebase = await signInWithPopup(auth, googleProvider);
      if (provider === "guithub")
        var userFirebase = await signInWithPopup(auth, guithubProvider);
      const { uid, email, displayName, photoURL } = userFirebase.user;
      const user = {
        name: displayName,
        idUser: uid,
        gmail: email,
        photograph: photoURL,
        userType,
      };
      const rta = await clienteAxios.post("/login", user);
      dispatch(loginOkey(rta.data.user));
      localStorage.setItem("token", rta.data.token);
      localStorage.setItem("userType", "juniors");
      tokenAuth(rta.data.token);
    } catch (e) {
      if (
        e.message ===
        "Firebase: Error (auth/account-exists-with-different-credential)."
      ) {
        var userFirebase = await signInWithPopup(auth, googleProvider);
        const { uid, email, displayName, photoURL } = userFirebase.user;
        const user = {
          name: displayName,
          idUser: uid,
          gmail: email,
          photograph: photoURL,
          userType,
        };
        const rta = await clienteAxios.post("/login", user);
        dispatch(loginOkey(rta.data.user));
        localStorage.setItem("token", rta.data.token);
        localStorage.setItem("userType", "juniors");
        tokenAuth(rta.data.token);
      }
    }
  };
};

export const getUserAction = (userProvider) => {
  return async (dispatch) => {
    try {
      const userType = localStorage.getItem("userType");
      if (userType) {
        clienteAxios.get(`/${userType}/${userProvider.uid}`).then((rta) => {
          dispatch(loginOkey(rta.data));
        });
      }
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
      localStorage.removeItem("token");
      localStorage.removeItem("userType");
      dispatch(logOutOkey());
    } catch (e) {
      console.log(e);
    }
  };
};

export const logOutOkey = () => ({
  type: LOGOUT_OKEY,
});

/*LENGUAGES*/
export function getLanguages(payload) {
  return async function (dispatch) {
    try {
      const json = await clienteAxios.get("/languages");
      return dispatch({ type: GET_LANGUAGES, payload: json.data });
    } catch (error) {}
  };
}

/*TECNOLOGIES*/
export function getTechnologies(payload) {
  return async function (dispatch) {
    try {
      const json = await clienteAxios.get("/technologies");
      return dispatch({ type: GET_TECHNOLOGIES, payload: json.data });
    } catch (error) {}
  };
}

/*JUNIORS*/
export function getJuniors(payload) {
  return async function (dispatch) {
    try {
      const json = await clienteAxios.get("/juniors");
      return dispatch({ type: GET_JUNIORS, payload: json.data });
    } catch (e) {
      console.log(e);
    }
  };
}

export const getJuniorsDetails = (id) => {
  return async function (dispatch) {
    try {
      var json = await clienteAxios.get("/juniors/" + id);
      return dispatch({
        type: GET_JUNIORS_DETAILS,
        payload: json.data,
      });
    } catch (e) {
      console.log(e);
    }
  };
};
export function putJuniors(id) {
  return async function () {
    const response = await clienteAxios.put(
      `http://localhost:3001/juniors/${id}`
    );
    return response;
  };
}

export function deleteJuniors(id) {
  return async function () {
    const response = await clienteAxios.delete(
      `http://localhost:3001/juniors/${id}`
    );
    return response;
  };
}

/*COMPANIES*/
export function getCompanies(payload) {
  return async function (dispatch) {
    try {
      const json = await clienteAxios.get("/companies");
      return dispatch({ type: GET_COMPANIES, payload: json.data });
    } catch (error) {}
  };
}

export const getCompanyDetails = (id) => {
  return async function (dispatch) {
    try {
      var json = await clienteAxios.get("/companies/" + id);
      return dispatch({
        type: GET_COMPANY_DETAILS,
        payload: json.data,
      });
    } catch (e) {
      console.log(e);
    }
  };
};

/*PUBLICATIONS*/
export function getPublications() {
  return async function (dispatch) {
    try {
      const json = await clienteAxios.get("/publications");
      return dispatch({ type: GET_PUBLICATIONS, payload: json.data });
    } catch (error) {}
  };
}

export function getPublicationsById(id) {
  return async function (dispatch) {
    try {
      const json = await clienteAxios.get(`/publications/${id}`);
      return dispatch({ type: GET_PUBLICATIONS_BY_ID, payload: json.data });
    } catch (error) {}
  };
}

export function postPublications(payload) {
  return async function () {
    const response = await clienteAxios.post("/publications", payload);
    return response;
  };
}

export function putPublications(id) {
  return async function () {
    const response = await clienteAxios.put(`/publications/${id}`);
    return response;
  };
}

/*no existe en el back*/
export function deletePublications(id) {
  return async function () {
    const response = await clienteAxios.delete(`/publications${id}`);
    return response;
  };
}
