const {
  Juniors,
  Languages,
  Technologies,
  Company,
  Publication,
  Admins,
} = require("../models/index");

require("dotenv").config();
const jwt = require("jsonwebtoken");

const { SECRET } = process.env;

const jwtgenerater =  (payload) => {
  const token =  jwt.sign({ id: payload }, SECRET, {
    expiresIn: 60 * 60 * 24,
  });
  return token;
};



const decoder = async (token, userType, id) => {
  
 try{
    const decoded = await jwt.verify(token, SECRET);
    if (userType === 'Company'){
      const user =  await Company.findOne({idFireBase : decoded.id});
      if (!user) {
        return {auth: false, message: "Usuario no encontrado"};
      }else{
        if (id){
          if (id !== decoded.id){
            return {auth: false, message: "Usuario no habilitado"};
          }
        }
      }
      return user; 
    }
    if (userType === 'Junior'){
      const user =  await Juniors.findOne({ idFireBase: decoded.id});
      if (!user) {
        return {auth: false, message: "Usuario no encontrado"};
      }else{
        if (id){
          if (id !== decoded.id){
            return {auth: false, message: "Usuario no habilitado"};
          }
        }
      }
      return user; 
    }
    return decoded;
  }catch(err){
    return {auth: false, message: "Token no válido"}
  }
};

module.exports = {
  jwtgenerater,
  decoder,
};

