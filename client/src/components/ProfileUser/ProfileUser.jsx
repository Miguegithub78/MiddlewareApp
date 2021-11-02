import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./helper.css";
import {
  getLanguages,
  getTechnologies,
  getUserAction,
  putJuniors,
} from "../../redux/actions";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebaseConfig";
import { useHistory } from "react-router-dom";
import LeftData from "./LeftData";
import PersonalData from "./PersonalData";
// import Prueba2Skill from './Prueba2Skill';
import CareerData from "./CareerData";
// import Softskills from './SoftSkills';

const ProfileUser = () => {
  const { user } = useSelector((state) => state);
  const history = useHistory();
  const dispatch = useDispatch();
  const [infoUser, setInfoUser] = useState({
    name: "",
    gmail: "",
    // details: "",
    github: "",
    // linkedIn: "https://linkedin.com/",
    website: "",
    // facebook: "https://facebook.com/",
    phone: "",
    // city: "",
    photography: "",
    publications: [],
    languages: [],
    technologies: [],
    title: "",
    jobsExperience: [],
    softskills: [],
    idUser: "",
  });
  useEffect(() => {
    if (!user) return;
    dispatch(getLanguages());
    dispatch(getTechnologies());
    setInfoUser({
      name: user.name,
      phone: user.phone,
      gmail: user.gmail,
      github: user.github,
      website: user.website,
      title: user.title,
      photo: user.photo,
      photograph: user.photograph,
      publications: user.publications,
      languages: user.languages,
      technologies: user.technologies,
      jobsExperience: user.jobsExperience,
      softskills: user.softskills,
      idUser: user._id,
    });
  }, [user]);

  onAuthStateChanged(auth, (userFirebase) => {
    if (userFirebase) {
      if (user) return;
      dispatch(getUserAction(userFirebase));
    } else {
      history.push("/");
    }
  });
  const handleClick = () => {
    dispatch(putJuniors(infoUser, user._id));
  };

  return user ? (
    <div>
      <Link className="btn btn-outline-dark ml-2 mt-2" to="/home">
        Volver al inicio
      </Link>
      <div className="container mt-3">
        <div className="main-body">
          <div className="row">
            <LeftData
              setInfoUser={setInfoUser}
              infoUser={infoUser}
              user={user}
            />
            <div className="col-lg-8">
              <PersonalData setInfoUser={setInfoUser} infoUser={infoUser} />
              <CareerData setInfoUser={setInfoUser} infoUser={infoUser} />
              {/* <Prueba2Skill /> */}
            </div>
          </div>
        </div>
        <button
          className="btn btn-outline-dark"
          type="button"
          onClick={handleClick}
        >
          Guardar cambios{" "}
        </button>
      </div>
      <br />
    </div>
  ) : (
    "cargando...."
  );
};

export default ProfileUser;
