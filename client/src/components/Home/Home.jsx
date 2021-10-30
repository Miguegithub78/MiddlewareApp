import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebaseConfig";
import { getJuniors, getCompanies, getTechnologies } from "../../redux/actions";
import tokenAuth from "../config/token";

import {
  loginOkey,
  logOutUserAction,
  getUserAction,
} from "../../redux/actions";

import { Search } from "../Search/Search";
import NavBar from "../NavBar/NavBar";
import { CardsCompanies } from "../CardsCompanies/CardsCompanies";
import { CardsJuniors } from "../CardsJuniors/CardsJuniors";
import "./Home.css";

const Home = () => {
  const { user } = useSelector((state) => state);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {

    const token = localStorage.getItem("token");
    if (token) {
      console.log("dispatch el tokeeenn", token);
      tokenAuth(token);
      dispatch(getJuniors());
      dispatch(getCompanies());
      dispatch(getTechnologies());
    }
  }, [user]);

  onAuthStateChanged(auth, (userFirebase) => {
    if (userFirebase) {
      if (user) return;
      dispatch(getUserAction(userFirebase));
    } else {
      history.push("/");
    }
  });

  const companies = useSelector((state) => state.companies);
  const juniors = useSelector((state) => state.juniors);

  return (
    <div className="">
      <NavBar />
      <div className=''>
        <div className=''>
          <div className="">
            <Search />
          </div>
        </div>
        <div className="">
          <div className="">
            <div className="">

              <CardsCompanies arrayCompanies={companies} />
              {/*<CardsJuniors arrayJuniors={juniors} / >*/}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;