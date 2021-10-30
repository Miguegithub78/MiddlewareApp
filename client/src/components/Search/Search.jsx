import React from "react";
import { useSelector } from 'react-redux';

import "./Search.css";

export const Search = () => {

  const button = "button";
  
  const options = useSelector((store) => store.technologies);

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
        
        <select className={button} name="Technologies" onChange={byTecnology}>
          <option value="">Tipo de Tecnología:</option>
          {options?.map((p) => (
            <option value={p.name} key={p.id}>
              {p.name}
            </option>
          ))}
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