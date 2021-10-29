import React from "react";
import "./Search.css";

export const Search = () => {

  const button = "button";

  const handleInputChange = (e) => {


  };

  const byTypeuser = (e) => {

  }
  const byTypePublic = (e) => {

  }
  const submit = (e) => {

  };


  const byTecnology = (e) => {

  }
  const byUbication = (e) => {

  }
  return (
    <div className="cont">
      <form onSubmit={submit}>
        <div className="field">
          <input
            type="text"
            id="searchterm"

            onChange={handleInputChange}
            placeholder="Realiza tu busqueda..."
          />
          <input className={button} type="submit" value="Buscar" />
        </div>
      </form>
      <div className="field2">
        <select className={button} name="typeUser" onChange={byTypeuser}>
          <option value="">Tipo de usuario:</option>
          <option value="0">Programador</option>
          <option value="1">Empresa</option>
          <option value="2">Administrador</option>
        </select>

        <select className={button} name="typePublic" onChange={byTypePublic}>
          <option value="">Tipo de Publicación:</option>
          <option value="0">Empleo</option>
          <option value="1">Proyectos</option>
          <option value="2">Guias, Tutoriales</option>
        </select>
        <select name="tecnology" className={button} onChange={byTecnology}>
          <option value="">Tipo de Tecnología:</option>
          <option value="React">React</option>
          <option value="Redux">Redux</option>
          <option value="Css">Css</option>
          <option value="Node">Node</option>
          <option value="Express">Express</option>
          <option value="Postgres">Postgres</option>

        </select>
        <select name="ubicacion" className={button} onChange={byUbication}>
          <option value="">Ubicación:</option>
          <option value="Cordova">Cordoba</option>
          <option value="Buenos Aires">Buenos Aires</option>
          <option value="Mendoza">Mendoza</option>
          <option value="Junin">Junin</option>
        </select>

      </div>
    </div>
  );
};