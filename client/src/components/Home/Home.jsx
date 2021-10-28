import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebaseConfig";
import { getJuniors, getCompanies } from "../../redux/actions";

import {
  loginOkey,
  logOutUserAction,
  getUserAction,
} from "../../redux/actions";

import { Search } from "../Search/Search";
import NavBar from "../NavBar/NavBar";
import { CardsCompanies } from "../CardsCompanies/CardsCompanies";
import "./Home.css";

const Home = () => {
  const { user } = useSelector((state) => state);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(getJuniors());
    dispatch(getCompanies());
  },[]);
  onAuthStateChanged(auth, (userFirebase) => {
    if (userFirebase) {
      if (user) return;
      dispatch(getUserAction(userFirebase, "programador"));
    } else {
      history.push('/')
    }
  });

  const companies = useSelector((state) => state.companies);

  return (
    <div className='containerhome'>
            <NavBar />
            <div className='searchcards'>
                <div className='search'>
                    <Search />
                </div>
                <div className='cards'>
                    <CardsCompanies arrayCompanies={companies} />
                </div>
            </div>
    </div>
  );
};

export default Home;
