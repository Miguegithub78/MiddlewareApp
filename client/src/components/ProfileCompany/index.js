import { useState, useEffect } from "react";
import LeftData from "./LeftData";
import PersonalData from "./PersonalData";
import JobsPublications from "./JobsPublications/JobsPublications";
import CareerData from "./CareerData";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebaseConfig";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  getLanguages,
  getTechnologies,
  getUserAction,
  getJuniors,
} from "../../redux/actions";
import NavBar from '../NavBar/NavBar'
import Mapa from "../Mapa/Mapa";
const ProfileCompany = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  onAuthStateChanged(auth, (userFirebase) => {
    if (userFirebase) {
      if (user) return;
      dispatch(getUserAction(userFirebase));
    } else {
      history.push("/");
    }
  });
  const [markers, setMarkers] = useState([]); //mapa

  const { user, languages, technologies } = useSelector((state) => state);
  const [infoUser, setInfoUser] = useState({
    idUser: "",
    name: "",
    gmail: "",
    linkedin: "https://linkedin.com/",
    website: "",
    city: "",
    photograph: "",
    publications: [],
    jobs: [],
    technologies: [],
    // latitude:'',
    // longitude:''
    //  details: "",
    //  github: "",
    //  phone: "",
    //  title: "",
    //  jobsExperience: [],
    //  softskills: [],
    //  infoUserChanged: false,
    //  openToRelocate: null,
    //  openToRemote: null,
    //  openToFullTime: null,
    //  academicHistory: [],
  });
  useEffect(() => {
    if (user) {
      setInfoUser({
        idUser: user.idFireBase,
        name: user.name,
        gmail: user.gmail,
        photograph: user.photograph,
        linkedin: "https://linkedin.com/",
        //   website: "",
          city: user.city || '',
        publications: user.publications,
        jobs: user.jobs,
        technologies: user.technologies,
        // latitude:user.latitude,
        // longitude:user.longitude,
      });
    }
    if (languages.length > 0 && technologies.length > 0) return;
    dispatch(getLanguages());
    dispatch(getTechnologies());
  }, [user]);

  return user ? (
    <>
      <NavBar />
      <div className="container mt-3">
        <div className="main-body">
          <div className="row">
            {infoUser.infoUserChanged && (
              <button
                className="btn btn-block btn-dark btn-outline-light"
                type="button"
                //   onClick={handleClick}
              >
                Guardar cambios
              </button>
            )}
            {/* <LeftData
              setInfoUser={setInfoUser}
              infoUser={infoUser}
              user={user}
            /> */}

            <PersonalData  user={user}setInfoUser={setInfoUser} infoUser={infoUser} />
            {/* <CareerData setInfoUser={setInfoUser} infoUser={infoUser} /> */}
            <div className="card">
              <h5 className="text-center">Selecciona tu ubicación </h5>
              <div className="card-body">
                <div className="accordion">
                  <Mapa markers={markers} setMarkers={setMarkers} />
                </div>
              </div>
            </div>
            <div className="card">
              <h5 className="text-center">Tus publicaciones de trabajo </h5>
              <div className="card-body">
                <div className="accordion">
                  {infoUser.jobs.length > 0 &&
                    infoUser.jobs.map((job, i) => (
                      <div key={i}>
                        <JobsPublications
                          job={job}
                          setInfoUser={setInfoUser}
                          infoUser={infoUser}
                        />
                      </div>
                    ))}
                </div>
              </div>
            </div>

           
          </div>
        </div>
      </div>
    </>
  ) : (
    "cargando..."
  );
};

export default ProfileCompany;
