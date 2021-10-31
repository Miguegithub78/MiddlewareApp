import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  getLanguages,
  getTechnologies,
  getUserAction,
  putJuniors
} from "../../redux/actions";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebaseConfig";
import { useHistory } from "react-router-dom";
import Languages from "./Languages";

const ProfileUser = () => {

  const history = useHistory();
  const dispatch = useDispatch();
  const { languages, technologies, user } = useSelector((state) => state);
  const [infoUser, setInfoUser] = useState({
    description: "",
    github: "",
    gender: "",
    phone: "",
    languages: [],
    technologies: [],
  });

  useEffect(() => {
    dispatch(getLanguages());
    dispatch(getTechnologies());
  }, []);

  onAuthStateChanged(auth, (userFirebase) => {
    if (userFirebase) {
      if (user) return;
      dispatch(getUserAction(userFirebase));
    } else {
      history.push("/");
    }
  });
  const handleChange = (e) => {
    setInfoUser((info) => ({
      ...info,
      [e.target.name]: e.target.value,
    }));
  };
  
  function handleSelectTechnologies(e) {
    setInfoUser((infoUser) => ({
      ...infoUser,
      technologies: [...infoUser.technologies, e.target.value],
    }));
  }
  function handleSubmit(e) {
    e.preventDefault();
    dispatch(infoUser(infoUser));
    setInfoUser({
      description: "",
      github: "",
      gender: "",
      phone: "",
      languages: [],
      technologies: [],
    });
  }

  return user ? (
    <div>
      <Link className="btn btn-outline-dark me-2" to="/home">
        Volver al inicio
      </Link>
      <h2>Tu Perfil</h2>
      <div className="container text-center">
        <img className="" src={user.photograph} alt="user-img" />
        <div className="">
          <h5 className="">Nombre: {user.name}</h5>
          <p className="">Sobre mi: {infoUser.description}</p>
          <p className="">Github: {infoUser.github}</p>
        </div>
        <div className=" ">
          <p className="">Email: {user.gmail}</p>
        </div>
        <div className="">
          <a href="#" className="">
            Linkedin
          </a>
          <a href="#" className="">
            Github
          </a>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="container text-center ">
        <div>
          <label>Sobre mi: </label>
          <textarea
            type="text"
            value={infoUser.description}
            name="description"
            onChange={handleChange}
            cols="31"
            rows="3"
            minLength="5"
            maxLength="500"
            placeholder="Introduce una descripción..."
          />
        </div>
        <div>
          <label>Github: </label>
          <input
            type="text"
            size="30"
            value={infoUser.github}
            name="github"
            onChange={handleChange}
            placeholder="Your Github"
          />
        </div>
        <div>
          <label>Género: </label>
          <input
            type="text"
            value={infoUser.gender}
            size="30"
            name="gender"
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Celular: </label>
          <input
            type="text"
            value={infoUser.phone}
            // placeholder="Your Github"
            size="30"
            name="phone"
            onChange={handleChange}
          />
        </div>
        <Languages  setInfoUser={setInfoUser} infoUser={infoUser}  />
        <div>
          <label>Tecnologías: </label>
          <select onChange={(e) => handleSelectTechnologies(e)}>
            {technologies.map((el) => {
              return (
                <option key={el._id} value={el.name}>
                  {el.name}
                </option>
              );
            })}
            ;
          </select>
          <ul>
            {infoUser.technologies.map((el, i) => (
              <li key={i}>{el}</li>
            ))}
          </ul>
        </div>
        <div>
          <button type="submit">Actualizar</button>
        </div>
      </form>
      {/* <button onClick={(e) => handleReset(e)}>Reiniciar</button> */}
    </div>
  ) : (
    "cargando...."
  );
};

export default ProfileUser;
