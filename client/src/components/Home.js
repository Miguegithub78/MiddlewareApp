// import { useState } from "react";
import { auth } from "../firebaseConfig";
import {  signOut } from "firebase/auth";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

const Home = () => {
  const { user } = useSelector((state) => state);
  const history = useHistory();

 
   

  return (
    <div>
      hola {user?user.displayName:'Para Comenzar, porfavor Inicia Sesión '}
      {user ? (
        <button onClick={() => signOut(auth)}>singout</button>
      ) : (
        <button onClick={() => history.push("/login")}>login</button>
      )}
    </div>
  );
};

export default Home;
