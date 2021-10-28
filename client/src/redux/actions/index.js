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


//export const loginUserAction = (provider) => {
 // return async (dispatch) => {
 //   try {
 ////     if (provider === "google") {
  //      await signInWithPopup(auth, googleProvider).then((user) =>
   //     await clienteAxios.post('/')
  //      );
  //      dispatch(loginOkey(user))
  //    } else if (provider === "guithub") {
  //      await signInWithPopup(auth, guithubProvider).then((user) =>
  //        dispatch(loginOkey(user))
  //      );
 //     }
 //   } catch (e) {
 //     console.log(e);
 //   }
 // };
//};
//

export const loginUserAction = (provider) => {
  return async (dispatch) => {
    try {
      if (provider === "google") {
        await signInWithPopup(auth, googleProvider).then((user) =>
        dispatch(loginOkey(user)))
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

export const loginOkey = (user) => ({
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

// export const getRecipeAction = () => {
//    return async (dispatch) => {
//      dispatch(getRecipes());
//      try {
//        const recipes = await clienteAxios.get(`/recipes`);
//        // console.log(recipes.data, 'dataaa');
//        dispatch(getRecipesOKEY(recipes.data));
//      } catch (error) {
//        dispatch(getRecipesError(error.data));
//      }
//    };
//  };
//  const getRecipes = () => ({
//    type: GET_RECIPES,
//    payload: true,
//  });
//  const getRecipesOKEY = (recipes) => ({
//    type: GET_RECIPES_OKEY,
//    payload: recipes,
//  });
//  const getRecipesError = (error) => ({
//    type: GET_RECIPES_ERROR,
//    payload: error,
//  });

export function postUser(payload) {
  return async function (dispatch) {
    const response = await clienteAxios.post("/juniors", payload);
    console.log(response);
    return response;
  }
};

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
