// import { useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebaseConfig";
import { loginOkey, logOutUserAction } from "../../redux/actions";

import { Search } from "../Search/Search";
import NavBar from "../NavBar/NavBar";
import "./Home.css";

const Home = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  onAuthStateChanged(auth, (userFirebase) => {
    if (userFirebase) {
      dispatch(loginOkey(userFirebase));
    } else {
      history.push("/login");
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
