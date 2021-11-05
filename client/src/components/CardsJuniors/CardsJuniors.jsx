import React from "react";
import { Link } from "react-router-dom";
//import { useSelector } from 'react-redux';
import styles from "./card.css";

export const CardsJuniors = ({ arrayJuniors }) => {
  //const companies = useSelector((state) => state.companies);


  return (

    <div className="container">
      <div className="row">
        <div className="col-lg-12 text-center">
          <div className="row">
            {arrayJuniors?.map((p) => (
              <div className="col-lg-3 col-md 12 mb-4">
                <div className="card-section">
                  <div className={`card text-center  bg-ligth bg-opacity-100${styles.card}`} style={{ width: " 80% " }}  >
                    <Link to={`/juniors/${p._id}`} key={p.name}>
                      <img src={p.photograph} className="card-img-top mt-3" style={{ width: " 150px ", height: " 180px " }} alt="Card cap" />
                      <div className="card-body  text-dark">
                        <h6 className="card-title">{p.name}{p.lastname}</h6>
                      </div>
                    </Link>
                  </div >
                </div>
              </div>
            ))}
          </div >
        </div>

      </div>
    </div>

  );
};