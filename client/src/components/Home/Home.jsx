// import { useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebaseConfig";
import {
  loginOkey,
  logOutUserAction,
  getUserAction,
} from "../../redux/actions";

import { Search } from "../Search/Search";
import NavBar from "../NavBar/NavBar";
import "./Home.css";

const Home = () => {
  const { user } = useSelector((state) => state);
  const dispatch = useDispatch();
  const history = useHistory();

  onAuthStateChanged(auth, (userFirebase) => {
    if (userFirebase) {
      if (user) return;
      dispatch(getUserAction(userFirebase, "programador"));
    } else {
      history.push('/')
    }
  });

  return (
    <div className="containerhome">
      <NavBar />
      <Search />
    </div>
  );
};

export default Home;
