import { LOGIN_OKEY, LOGOUT_OKEY, LOGIN_GUITHUB, LOGIN_GOOGLE, GET_JUNIORS, GET_COMPANIES } from '../types'

const inicialState ={
   loading:false, 
   user: null,
   details: {},
   languages: [],
   technologies: [],
   juniors: [],
   companies: [],
}
const rootReducer = (state = inicialState, action) => {
  
   switch (action.type) {
      case LOGIN_OKEY:
        
        return { ...state,  user: action.payload };
      case LOGOUT_OKEY:
        return { ...state,  user:null };
      case 'GET_LANGUAGES':
        return { ...state,  languages: action.payload };
      case 'GET_TECHNOLOGIES':
        return { ...state,  technologies: action.payload };
      case 'GET_COMPANY_DETAILS':
      return {
        ...state,
        details: action.payload,
      };
      case GET_JUNIORS:
        return {
          ...state,
          juniors: action.payload,
        };
      case GET_COMPANIES:
      return {
        ...state,
        companies: action.payload,
      };
    default:
      return state;
  }
};

export default rootReducer;
