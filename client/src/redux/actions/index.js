import {
  LOGIN_OKEY,
  LOGOUT_OKEY,
  GET_JUNIORS,
  GET_JUNIORS_DETAILS,
  GET_COMPANIES,
  GET_LANGUAGES,
  GET_TECHNOLOGIES,
  GET_COMPANY_DETAILS,
  GET_PUBLICATIONS,
  GET_PUBLICATIONS_BY_ID,
  SORT_JOBS_BY,
  FILTER_JOBS_BY_COUNTRIES,
  FILTER_JOBS_BY_CITIES,
  FILTER_JOBS_BY_SALARIES,
  FILTER_JOBS_BY_TECHS,
  SEARCH_JOBS_BY_TITLE,
  RESET_JOBS_FILTER,
  CHANGE_PROFILE_PICTURE,
  EMAIL_VERIFICATION,
  ERROR_LOGIN,
} from "../types";
import clienteAxios from "../../components/config/clienteAxios";
import { auth, firebase, actionCodeSettings } from "../../firebaseConfig";
import {
  signInWithPopup,
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithEmailAndPassword,
  sendEmailVerification,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import tokenAuth from "../../components/config/token";
/*LOGIN*/
const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();
const storage = getStorage(firebase);

const loginHelper = async (userFirebase, dispatch, userType) => {
  const { uid, email, displayName, photoURL } = userFirebase.user;
  const user = {
    name: displayName || "Sin Nombre",
    idUser: uid,
    gmail: email,
    photograph: photoURL || false,
    userType,
  };
  try {
    const rta = await clienteAxios.post("/login", user);
    //tengo que checkear si el que se loguea como program tiene una cuenta comom junior y asilo
    console.log("entra?????");
    console.log(rta.data.auth);
    if (!rta.data.auth) {
      await signOut(auth);
      console.log("deslogueado");
      dispatch(errorLoginAction(rta.data.msg))
    }
    dispatch(loginOkey(rta.data.user));

    localStorage.setItem("token", rta.data.token);
    localStorage.setItem("userType", userType);
    tokenAuth(rta.data.token); //firmar el token a header
  } catch (error) {
    console.log(error);
  }
};
export const loginUserAction = (provider, userType) => {
  return async (dispatch) => {
    try {
      if (provider === "google")
        var userFirebase = await signInWithPopup(auth, googleProvider);
      if (provider === "github")
        var userFirebase = await signInWithPopup(auth, githubProvider);
      loginHelper(userFirebase, dispatch, userType);
    } catch (e) {
      console.log(e);
      if (
        e.message ===
        "Firebase: Error (auth/account-exists-with-different-credential)."
      ) {
        var userFirebase = await signInWithPopup(auth, googleProvider);
        loginHelper(userFirebase, dispatch, userType);
      }
    }
  };
};
export const loginUserEmailPassAction = (email, pass, name) => {
  return async (dispatch) => {
    const userType = localStorage.getItem("userType");
    const gmail = email;

    if (name) {
      try {
        console.log("entro aca!");
        const userFirebase = await createUserWithEmailAndPassword(
          auth,
          gmail,
          pass
        );
        await sendEmailVerification(userFirebase.user, actionCodeSettings);
        //envio mail de verificacion
        const { uid, email } = userFirebase.user;
        const user = {
          name,
          idUser: uid,
          gmail: email,
          userType,
          emailAndPass: false,
        };
        //creo al usuario en la db
        console.log(user, "esto mando al post");
        const rta = await clienteAxios.post("/login", user);
        console.log(rta.data);
        dispatch(emailVerificationAction(false));
        await signOut(auth);
        console.log("deslogueado");
      } catch (error) {
        console.log(error, "create error");
      }
    } else {
      // si hay user
      try {
        console.log(" aca!");
        const userFirebase = await signInWithEmailAndPassword(
          auth,
          email,
          pass
        );
        loginHelper(userFirebase, dispatch, userType);
      } catch (error) {
        console.log(error.code, "asdasd");
        if (error.code === "auth/wrong-password") {
          dispatch(errorLoginAction("Usuario o Contraseña incorrecta"));
        } else if (error.code === "auth/too-many-requests") {
          dispatch(errorLoginAction("Usuario bloqueado, Resetea la clave"));
        } else if (error.code === "auth/user-not-found") {
          dispatch(errorLoginAction("Usuario No Registrado"));
        }
      }
    }
  };
};
export const errorLoginAction = (msg) => ({
  type: ERROR_LOGIN,
  payload: msg,
});
export const emailVerificationAction = (boolean) => ({
  type: EMAIL_VERIFICATION,
  payload: boolean,
});

export const getUserAction = (userProvider) => {
  return async (dispatch) => {
    try {
      const userType = localStorage.getItem("userType");
      const token = localStorage.getItem("token");
      if (!userProvider) console.log(auth.currentUser, "auth");
      if (userType && token) {
        clienteAxios.get(`/${userType}/${userProvider.uid}`).then((rta) => {
          console.log(rta.data, 'dato de cuando obtengo ');
          dispatch(loginOkey(rta.data));
        });
      }
    } catch (e) {
      console.log(e, "algo ");
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

const logOutOkey = () => ({
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
export function putJuniors(data, id) {
  return async function () {
    const response = await clienteAxios.put(`/juniors/${id}`, data);
    // llamar al dispatch
    console.log(response.data, "editar usuario ok");
  };
}

export function deleteJuniors(id) {
  return async function () {
    const response = await clienteAxios.delete(`/juniors/${id}`);
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

export function postPublications(payload, nameUser, idUser) {
  return async function () {
    const response = await clienteAxios.post(
      `/publications?nameUser=${nameUser}&idUser=${idUser}`,
      payload
    );
    return response;
  };
}

export function putPublications(id, data) {
  return async function () {
    const response = await clienteAxios.put(`/publications/${id}`, data);
    return response;
  };
}

export function putLike(idPublication, idUser) {
  return async function () {
    const response = await clienteAxios.put(
      `/addLike?idPublication=${idPublication}&idUser=${idUser}`
    );
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

/*JOBS*/
export function postJobs(payload) {
  return async function () {
    const response = await clienteAxios.post("/jobs", payload);
    return response;
  };
}

export function sortJobsBy(payload) {
  return async function (dispatch) {
    dispatch({
      type: SORT_JOBS_BY,
      payload,
    });
  };
}

export function filterJobsByCountries(payload) {
  return async function (dispatch) {
    dispatch({
      type: FILTER_JOBS_BY_COUNTRIES,
      payload,
    });
  };
}

export function filterJobsByCities(payload) {
  return async function (dispatch) {
    dispatch({
      type: FILTER_JOBS_BY_CITIES,
      payload,
    });
  };
}

export function filterJobsBySalaries(payload) {
  return async function (dispatch) {
    dispatch({
      type: FILTER_JOBS_BY_SALARIES,
      payload,
    });
  };
}

export function filterJobsByTechs(payload) {
  return async function (dispatch) {
    dispatch({
      type: FILTER_JOBS_BY_TECHS,
      payload,
    });
  };
}

export function searchJobsByTitle(payload) {
  return async function (dispatch) {
    dispatch({
      type: SEARCH_JOBS_BY_TITLE,
      payload,
    });
  };
}

export function resetFilterJobs(payload) {
  return async function (dispatch) {
    dispatch({
      type: RESET_JOBS_FILTER,
      payload,
    });
  };
}

export const changePictureProfileAction = (picture) => {
  return async function (dispatch) {
    try {
      const fileRef = ref(storage, `documents/${picture.name}`);
      await uploadBytes(fileRef, picture);
      const urlPicture = await getDownloadURL(fileRef);
      dispatch(urlProfilePic(urlPicture));
    } catch (error) {
      console.log(error);
    }
  };
};
const urlProfilePic = (urlPicture) => ({
  type: CHANGE_PROFILE_PICTURE,
  payload: urlPicture,
});

export const changePicturePublicationAction = (picture) => {
  return async function (dispatch) {
    try {
      const fileRef = ref(storage, `documents/${picture.name}`);
      await uploadBytes(fileRef, picture);
      const urlPicture = await getDownloadURL(fileRef);
      dispatch(urlUploadPic(urlPicture));
    } catch (error) {
      console.log(error);
    }
  };
};
const urlUploadPic = (urlPicture) => ({
  type: "UPLOAD_PICTURE",
  payload: urlPicture,
});
