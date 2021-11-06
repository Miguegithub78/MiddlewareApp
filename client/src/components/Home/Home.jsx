import { useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebaseConfig";
import {
  getJuniors,
  getCompanies,
  getTechnologies,
  emailVerificationAction,
} from "../../redux/actions";
import tokenAuth from "../config/token";

import {
  loginOkey,
  logOutUserAction,
  getUserAction,
  sortJobsBy,
} from "../../redux/actions";

import { Search } from "../Search/Search";
import NavBar from "../NavBar/NavBar";
import { CardsCompanies } from "../CardsCompanies/CardsCompanies";
import { CardsJuniors } from "../CardsJuniors/CardsJuniors";
import CardsJobs from "../CardsJobs/CardsJobs";
import "./Home.css";
import { Publications } from "../Publications/Publications";

const Home = () => {
  const { user, emailVerification } = useSelector((state) => state);
  const dispatch = useDispatch();
  const history = useHistory();

  const token = localStorage.getItem("token");
  const userType = localStorage.getItem("userType");
  useEffect(() => {
    if (token && user) {
      console.log("dispatch el tokeeenn", token);
      tokenAuth(token);
      dispatch(getJuniors());
      dispatch(getCompanies());
      dispatch(getTechnologies());
    }
  }, [user]);

  onAuthStateChanged(auth, (userFirebase) => {
    if (userFirebase) {
      if (!user && userFirebase.emailVerified)
        dispatch(getUserAction(userFirebase));
    } else {
      history.push("/");
    }
  });
  useEffect(() => {
    if (!user) dispatch(getUserAction());
  }, []);
  useEffect(() => {
    if (userType===null) history.push("/");
  }, []);

	onAuthStateChanged(auth, (userFirebase) => {
		if (userFirebase) {
			if (user) return;
			dispatch(getUserAction(userFirebase));
		} else {
			history.push('/');
		}
	});
	const { tipo } = useParams();
	const companies = useSelector((state) => state.companies);
	const juniors = useSelector((state) => state.juniors);
	
	const jobs = useSelector((state) => state.jobs.filterData);

	return (
		<div className=''>
			<NavBar />
			<div className=''>
				<div className=''>{tipo && tipo === 'empleos' && <Search />}</div>
				<div className=''>
					<div className=''>
						<div className=''>
							{tipo && tipo === 'companies' && (
								<CardsCompanies arrayCompanies={companies} />
							)}
							{tipo && tipo === 'empleos' && <CardsJobs jobs={jobs} />}
							{tipo && tipo === 'juniors' && (
							 <CardsJuniors arrayJuniors={juniors} />
							 )}
							 {tipo && tipo === 'publications' && <Publications />}
							
							{/* 	<CardsJobs jobs={jobs} /> */}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Home;
