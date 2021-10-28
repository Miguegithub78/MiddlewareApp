import { LOGIN_OKEY, LOGOUT_OKEY, LOGIN_GUITHUB, LOGIN_GOOGLE } from '../types'

const inicialState = {
  loading: false,
  user: null,
  details: {},

}
const rootReducer = (state = inicialState, action) => {
  switch (action.type) {
    case LOGIN_OKEY:
      const { uuid, email, displayName, photoURL } = action.payload
      const user = {
        name: displayName,
        idUser: uuid,
        email,
        photo: photoURL
      }
      return { ...state, user };
    case LOGOUT_OKEY:
      return { ...state, user: null };


    case 'GET_COMPANY_DETAILS':
      return {
        ...state,
        details: action.payload,
      };

    default:
      return state;
  }
}

export default rootReducer;