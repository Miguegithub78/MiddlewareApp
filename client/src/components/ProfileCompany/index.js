import { useState, useEffect } from "react";
import LeftData from "./LeftData";
import PersonalData from "./PersonalData";
import JobsPublications from "./JobsPublications";
import CareerData from "./CareerData";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebaseConfig";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  getLanguages,
  getTechnologies,
  getUserAction,
  getJuniors
} from "../../redux/actions";

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
  const { user, languages, technologies } = useSelector((state) => state);
  console.log("aca estoy");
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
        //   city: "",
        publications: user.publications,
        jobs: user.jobs,
        technologies: user.technologies,
      });
    }
    if (languages.length > 0 && technologies.length > 0) return;
    dispatch(getLanguages());
    dispatch(getTechnologies());
    dispatch(getJuniors())
  }, [user]);

  return user ? (
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
          <LeftData setInfoUser={setInfoUser} infoUser={infoUser} user={user} />
          <div className="col-lg-8">
            <PersonalData setInfoUser={setInfoUser} infoUser={infoUser} />
            <CareerData setInfoUser={setInfoUser} infoUser={infoUser} />
            {infoUser.jobs.length>0&&infoUser.jobs.map((job) => (
              <div key={job._id}>
                <JobsPublications
                  job={job}
                  setInfoUser={setInfoUser}
                  infoUser={infoUser}
                />
              </div>
            ))}

            {/* <Prueba2Skill /> */}
          </div>
        </div>
      </div>
    </div>
  ) : (
    "cargando..."
  );
};

export default ProfileCompany;
