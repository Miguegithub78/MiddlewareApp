import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { getLanguages, getTechnologies, putJuniors } from "../../redux/actions";
import styles from "./ProfileUser.module.css";

const ProfileUser2 = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const languages = useSelector((state) => state.languages);
  const technologies = useSelector((state) => state.technologies);
  const users = useSelector((state) => state.user);
  const [input, setInput] = useState({
    lastname: "",
    description: "",
    github: "",
    gender: "",
    phone: "",
    languages: [],
    technologies: [],
  });
  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  }
  function handleReset(e) {
    setInput({
      ...input,
      languages: [],
      technologies: [],
    });
  }
  function handleSelectLanguages(e) {
    setInput({
      ...input,
      languages: [...input.languages, e.target.value],
    });
  }
  function handleSelectTechnologies(e) {
    setInput({
      ...input,
      technologies: [...input.technologies, e.target.value],
    });
  }
  function handleSubmit(e) {
    e.preventDefault();
    dispatch(putJuniors(input));
    setInput({
      lastname: "",
      description: "",
      github: "",
      gender: "",
      phone: "",
      languages: [],
      technologies: [],
    });
    history.push("/home");
    alert("Perfil Actualizado");
  }

  const user = {
    name: "Maximiliano",
    idUser: 1,
    email: "elquememandogoogle@gmail.com",
    photo:
      "https://dthezntil550i.cloudfront.net/f4/latest/f41908291942413280009640715/1280_960/1b2d9510-d66d-43a2-971a-cfcbb600e7fe.png",
    userType: "programadorJR",
  };

  useEffect(() => {
    dispatch(getLanguages());
    dispatch(getTechnologies());
  }, [dispatch]);

  return (
    <div>
      <Link className="btn btn-outline-dark me-2" to="/home">
        Volver al inicio
      </Link>
      <h1>Tu Perfil</h1>
      <div className="card">
        <img className={styles.user} src={users.photograph} alt="img" />
        <div className="card-body">
          <h5 className="card-title">Nombre: {users.name}</h5>
          <p className="card-text">Sobre mi: {input.description}</p>
          <p className="card-text">Github: {input.github}</p>
        </div>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">Email: {users.gmail}</li>
        </ul>
        <div className="card-body">
          <a href="#" className="card-link">
            Linkedin
          </a>
          <a href="#" className="card-link">
            Github
          </a>
        </div>
      </div>

      <form onSubmit={(e) => handleSubmit(e)}>
        <div>
          <label>Apellido:</label>
          <input
            type="text"
            value={input.lastname}
            name="lastname"
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Sobre mi:</label>
          <input
            type="text"
            value={input.description}
            name="description"
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Github:</label>
          <input
            type="text"
            value={input.github}
            name="github"
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Género:</label>
          <input
            type="text"
            value={input.gender}
            name="gender"
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Celular:</label>
          <input
            type="text"
            value={input.phone}
            name="phone"
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Idiomas:</label>
          <select onChange={(e) => handleSelectLanguages(e)}>
            {languages.map((el) => {
              return (
                <option key={el._id} value={el.name}>
                  {el.name}
                </option>
              );
            })}
            ;
          </select>
          <ul>
            <li>{input.languages.map((el) => el + ", ")}</li>
          </ul>
        </div>
        <div>
          <label>Tecnologías:</label>
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
            <li>{input.technologies.map((el) => el + ", ")}</li>
          </ul>
        </div>
        <div>
          <button type="submit">Actualizar</button>
        </div>
      </form>
      <button onClick={(e) => handleReset(e)}>Reiniciar</button>
    </div>
  );
};

export default ProfileUser2;
